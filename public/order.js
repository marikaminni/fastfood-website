//create product items
document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".order-product .row");
  const cartList = document.querySelector(".offcanvas-body .list-group");
  const cartTotal = document.querySelector(".total-price");
  const cartButton = document.querySelector(".cart-button");
  const badge = cartButton.querySelector(".badge");
  var cart = new Map();

  if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify(Array.from(cart.entries())));
  } else {
    cart = new Map(JSON.parse(localStorage.getItem("cart")));
  }
  // Funzione per ottenere i prodotti da una categoria
  async function loadProducts(category) {
    try {
      const response = await fetch(`/products?category=${category}`);
      if (!response.ok) {
        throw new Error(`Errore HTTP! Status: ${response.status}`);
      }
      const products = await response.json();
      console.log("Prodotti caricati:", products);
      displayProducts(products);
      renderCart();
      updateTotal();
      updateBadge();
    } catch (error) {
      console.error("Errore nel caricamento dei prodotti:", error);
    }
  }
  //update cart badge
  function updateBadge() {
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });
    badge.textContent = totalQuantity;
  }
  function removeItem(product) {
    var quantity = cart.get(product.id).quantity;
    if (quantity > 1) {
      cart.get(product.id).quantity = quantity - 1;
    } else {
      cart.delete(product.id);
    }
    localStorage.setItem("cart", JSON.stringify(Array.from(cart.entries())));
  }
  //Cart logic
  function updateCart(product) {
    if (cart.has(product.id)) {
      const quantity = cart.get(product.id).quantity + 1;
      cart.set(product.id, { quantity, ...product });
    } else {
      cart.set(product.id, { quantity: 1, ...product });
    }
    renderCart();
    updateTotal();
    localStorage.setItem("cart", JSON.stringify(Array.from(cart.entries())));
  }

  function renderCart() {
    cartList.innerHTML = "";
    console.log(cart);
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );
      const itemDiv = document.createElement("div");
      itemDiv.classList.add(
        "d-flex",
        "flex-column",
        "justify-content-center",
        "flex-grow-1"
      );
      const itemImg = document.createElement("img");
      itemImg.classList.add(
        "img-fluid",
        "rounded",
        "object-fit-cover",
        "me-3",
        "w-25",
        "h-25"
      );

      const minus = document.createElement("button");
      minus.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
      minus.textContent = "X";
      minus.addEventListener("click", (e) => {
        e.stopPropagation();
        removeItem(item);
        renderCart();
        updateTotal();
        updateBadge();
      });

      itemImg.src = item.image;
      const namequantity = document.createElement("span");
      namequantity.textContent = `${item.name} x ${item.quantity}`;
      const itemPrice = document.createElement("span");
      itemPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

      itemDiv.appendChild(namequantity);
      itemDiv.appendChild(itemImg);

      li.appendChild(itemDiv);
      li.appendChild(itemPrice);
      li.appendChild(minus);
      cartList.appendChild(li);
    });
  }

  function updateTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  function addQuantityEvent(product, plus) {
    plus.addEventListener("click", (e) => {
      e.stopPropagation();
      updateCart(product);
      updateBadge();
    });
  }

  // Visualizza i prodotti nel container
  function displayProducts(products) {
    productContainer.innerHTML = "";

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add(
        "col-12",
        "col-lg-3",
        "col-md-4",
        "col-sm-6",
        "mb-4"
      );
      const cardDiv = document.createElement("div");
      cardDiv.classList.add(
        "card",
        "h-100",
        "d-flex",
        "flex-column",
        "border-0",
        "shadow-sm"
      );

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-image", "card-image-top");
      img.addEventListener("click", () => showDetails(product));

      const cardBody = document.createElement("div");
      cardBody.classList.add(
        "card-body",
        "d-flex",
        "flex-column",
        "justify-content-between"
      );

      const productName = document.createElement("h5");
      productName.classList.add("card-title");
      productName.textContent = product.name;

      const productPrice = document.createElement("p");
      productPrice.classList.add("card-text");
      productPrice.textContent = `$${product.price}`;

      const plus = document.createElement("button");
      plus.classList.add("btn", "btn-danger", "mt-auto");
      plus.textContent = "Add to cart";

      addQuantityEvent(product, plus);

      cardBody.appendChild(productName);
      cardBody.appendChild(productPrice);
      cardBody.appendChild(plus);
      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBody);
      productDiv.appendChild(cardDiv);
      productContainer.appendChild(productDiv);
    });
  }

  function showDetails(product) {
    const modal = document.getElementById("productModal");
    modal.querySelector(".modal-title").textContent = product.name;
    modal.querySelector(".modal-body img").src = product.image;
    modal.querySelector(".modal-body .description-title").textContent =
      product.name;
    modal.querySelector(".modal-body .description").textContent =
      product.description;
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  }

  document
    .querySelectorAll(".slider-container div[data-category]")
    .forEach((categoryDiv) => {
      categoryDiv.addEventListener("click", () => {
        const selectedCategory = categoryDiv.getAttribute("data-category");
        //evidenzia la categoria selezionata
        updateActiveCategory(categoryDiv);
        // Carica i prodotti della categoria selezionata
        loadProducts(selectedCategory);
      });
    });

  function updateActiveCategory(activeCategory) {
    document
      .querySelectorAll(".slider-container .nav-link")
      .forEach((navLink) => {
        navLink.classList.remove("active", "text-black");
        navLink.classList.add("text-muted");
      });

    const activeLink = activeCategory.querySelector(".nav-link");
    activeLink.classList.add("active", "text-black");
    activeLink.classList.remove("text-muted");
  }

  //send order
  document.getElementById("checkout").addEventListener("click", () => {
    var dataToSend = {
      productlist: new Map(),
      total: 0,
    };
    cart.forEach((item) => {
      dataToSend.total += item.price * item.quantity;
      if (dataToSend.productlist.has(item.id)) {
        const exist = dataToSend.productlist.get(item.id);
        exist.quantity += item.quantity;
        dataToSend.productlist.set(item.id, exist);
      } else {
        dataToSend.productlist.set(item.id, {
          id: item.id,
          name: item.name,
          quantity: item.quantity,
        });
      }
    });

    // Convert Map to an array for serialization
    dataToSend.productlist = Array.from(dataToSend.productlist.values());
    try {
      fetch("/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          cart.clear();
          localStorage.setItem(
            "cart",
            JSON.stringify(Array.from(cart.entries()))
          );
          renderCart();
          updateTotal();
          updateBadge();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  });
  // Carica i prodotti della categoria predefinita al caricamento della pagina
  loadProducts("Beef");
});
