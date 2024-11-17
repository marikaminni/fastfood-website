//create menu items
document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");

  // Funzione per ottenere i prodotti da una categoria
  async function loadProducts(category) {
    try {
      const response = await fetch(`/products?category=${category}`);
      console.log("Stato della risposta:", response.status);
      console.log("Risposta del server:", response);

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

//Form validation
(() => {
  "use strict";

  const nameCheck = document.querySelector("#name");
  const phoneCheck = document.querySelector("#phone");
  const dateCheck = document.querySelector("#datetime-local");
  const guestsCheck = document.querySelector("#guests");
  const message = document.querySelector("#message");

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  //Validate fields
  const checkName = () => {
    const nameValue = nameCheck.value.trim();
    const nameRegex = /^[a-zA-Z\s]{3,25}$/;

    if (!nameRegex.test(nameValue)) {
      nameCheck.setCustomValidity(
        "Name must be only letters and <= 25 characters."
      );
      return false;
    } else {
      nameCheck.setCustomValidity("");
      return true;
    }
  };

  const checkPhone = () => {
    const phoneValue = phoneCheck.value.trim();
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneValue)) {
      phoneCheck.setCustomValidity(
        "Phone number must be 10-15 digits and may contain a + at the beginning"
      );
      return false;
    } else {
      phoneCheck.setCustomValidity("");
      return true;
    }
  };

  const checkDate = () => {
    const dateValue = new Date(dateCheck.value);
    const currentDate = new Date();
    if (dateValue < currentDate) {
      dateCheck.setCustomValidity("Date must be in the future");
      return false;
    } else {
      dateCheck.setCustomValidity("");
      return true;
    }
  };

  const checkGuests = () => {
    if (guestsCheck.value < 1) {
      guestsCheck.setCustomValidity("Guests must be at least 1");
      return false;
    } else {
      guestsCheck.setCustomValidity("");
      return true;
    }
  };

  const checkMessage = () => {
    const messageValue = message.value.trim();
    const wordCount = messageValue.split(/\s+/).length;
    if (wordCount > 100) {
      message.setCustomValidity("Message must be less than 100 words");
      return false;
    } else {
      message.setCustomValidity("");
      return true;
    }
  };

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      async (event) => {
        const nameValid = checkName();
        const phoneValid = checkPhone();
        const dateValid = checkDate();
        const guestsValid = checkGuests();
        const messageValid = checkMessage();

        const isFormValid =
          nameValid && phoneValid && dateValid && guestsValid && messageValid;

        if (!isFormValid || !form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
          return;
        }

        event.preventDefault();
        const formData = {
          name: nameCheck.value,
          phone: phoneCheck.value,
          date: dateCheck.value,
          guests: guestsCheck.value,
          message: message.value,
        };

        try {
          // Send form data to the server
          const response = await fetch("/book-table", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const data = await response.json();
          console.log(data);

          if (!response.ok) {
            throw new Error("Errore HTTP! Status: " + response.status);
          } else {
            showToast(data.message);
          }
        } catch (error) {
          console.error("Errore nell'invio della prenotazione:", error);
        }
      },
      false
    );
  });
  //show toast message
  const showToast = (message) => {
    const toast = document.querySelector("#form-toast .toast-body");
    toast.textContent = message;
    const toastElement = new bootstrap.Toast(
      document.querySelector("#form-toast")
    );
    toastElement.show();
  };
})();

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
