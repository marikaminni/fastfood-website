//create product items
document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".order-product .row");

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
    } catch (error) {
      console.error("Errore nel caricamento dei prodotti:", error);
    }
  }

  // Visualizza i prodotti nel container
  function displayProducts(products) {
    productContainer.innerHTML = "";

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("col", "col-lg-3", "col-md-6", "mb-5");
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "h-100");

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-image", "card-image-top", "d-block", "w-100");
      img.addEventListener("click", () => showDetails(product));

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const productName = document.createElement("h5");
      productName.classList.add("card-title");
      productName.textContent = product.name;

      const productPrice = document.createElement("p");
      productPrice.classList.add("card-text");
      productPrice.textContent = `$${product.price}`;

      const productQuantity = document.createElement("div");
      productQuantity.classList.add("d-flex", "justify-content-center");

      const minus = document.createElement("button");
      minus.classList.add("btn", "btn-danger", "btn-sm", "me-2");
      minus.textContent = "-";
      minus.disabled = true;

      const quantityDisplay = document.createElement("span");
      quantityDisplay.classList.add("badge", "bg-secondary", "rounded-pill");
      quantityDisplay.textContent = "0";

      const plus = document.createElement("button");
      plus.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
      plus.textContent = "+";

      plus.addEventListener("click", () => {
        let quantity = parseInt(quantityDisplay.textContent, 10);
        quantity++;
        quantityDisplay.textContent = quantity;
        minus.disabled = false;
      });

      minus.addEventListener("click", () => {
        let quantity = parseInt(quantityDisplay.textContent, 10);
        if (quantity > 0) {
          quantity--;
          quantityDisplay.textContent = quantity;
        }
        minus.disabled = quantity === 0;
      });

      productQuantity.appendChild(minus);
      productQuantity.appendChild(quantityDisplay);
      productQuantity.appendChild(plus);

      cardBody.appendChild(productName);
      cardBody.appendChild(productPrice);
      cardBody.appendChild(productQuantity);
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
        // Carica i prodotti della categoria selezionata
        loadProducts(selectedCategory);
      });
    });

  // Carica i prodotti della categoria predefinita al caricamento della pagina
  loadProducts("Beef");
});
