//create menu items
document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");

  // Funzione per ottenere i prodotti da una categoria
  async function loadProducts(category) {
    try {
      const response = await fetch(`/products?category=${category}`);
      console.log("Stato della risposta:", response.status); // Log dello stato della risposta
      console.log("Risposta del server:", response); // Log dell'intera risposta

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

  // Funzione per visualizzare i prodotti nel container
  function displayProducts(products) {
    productContainer.innerHTML = ""; // Svuota il contenitore

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("col");
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "h-100");

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-image", "card-image-top", "d-block", "w-100");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const productName = document.createElement("h5");
      productName.classList.add("card-title");
      productName.textContent = product.name;

      const productPrice = document.createElement("p");
      productPrice.classList.add("card-text");
      productPrice.textContent = `$${product.price}`;

      cardBody.appendChild(productName);
      cardBody.appendChild(productPrice);
      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBody);
      productDiv.appendChild(cardDiv);
      productContainer.appendChild(productDiv);
    });
  }

  document.querySelectorAll(".category-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedCategory = e.target.getAttribute("data-category");

      // Aggiorna i bottoni attivi
      document.querySelectorAll(".category-button").forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");

      // Carica i prodotti della categoria selezionata
      loadProducts(selectedCategory);
    });
  });

  // Carica i prodotti della categoria predefinita al caricamento della pagina
  loadProducts("Beef");
});

// Initialize and add the map
let map;

async function initMap() {
  const position = { lat: 43.08066203429418, lng: 12.365781254219645 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 18,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Burger Bros",
  });
}

initMap();
