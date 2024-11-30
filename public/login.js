const signinNav = document.getElementById("signinNav");
const signupNav = document.getElementById("signupNav");
const signinForm = document.getElementById("signinForm");
const signupForm = document.getElementById("signupForm");

signinNav.addEventListener("click", () => {
  signinNav.classList.add("active");
  signinNav.classList.remove("text-muted");
  signupNav.classList.remove("active", "text-dark");
  signupNav.classList.add("text-muted");
  signinForm.classList.remove("d-none");
  signupForm.classList.add("d-none");
});

signupNav.addEventListener("click", () => {
  signupNav.classList.add("active", "text-dark");
  signupNav.classList.remove("text-muted");
  signinNav.classList.remove("active");
  signinNav.classList.add("text-muted");
  signupForm.classList.remove("d-none");
  signinForm.classList.add("d-none");
});

//Form validation
(() => {
  "use strict";

  const signinUser = document.getElementById("signinUsername");
  const signinPassword = document.getElementById("signinPassword");
  const signupUser = document.getElementById("signupUsername");
  const signupPassword = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  //Validate signin fields
  function validateSignin() {
    if (signinUser.value === "" || signinPassword.value === "") {
      return false;
    } else {
      return true;
    }
  }

  //Validate signup fields
  function checkUsername() {
    const usernameValue = signupUser.value.trim();
    const usernameRegex = /^[a-zA-Z0-9]{3,10}$/;

    if (!usernameRegex.test(usernameValue)) {
      return false;
    } else {
      return true;
    }
  }

  function checkPassword() {
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
    );
    if (passwordRegex.test(signupPassword.value.trim())) {
      return true;
    } else {
      return false;
    }
  }

  function checkConfirmPassword() {
    if (signupPassword.value === confirmPassword.value) {
      return true;
    } else {
      return false;
    }
  }

  //handle signin
  async function handleSignin(username, password) {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
        }),
      });
      if (!response.ok) {
        console.log("HTTP Error: ", response);
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      if (data.accessToken) {
        sessionStorage.setItem("accessToken", data.accessToken);
        console.log("JWT saved in sessionStorage");
        location.href = "/dashboard";
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Errore durante l'invio della signin form:", error);
    }
  }

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const signinValid = validateSignin();
        const signupValid =
          checkUsername() && checkPassword() && checkConfirmPassword();
        if (
          !form.checkValidity() ||
          (!signinValid && form.id === "signinForm") ||
          (!signupValid && form.id === "signupForm")
        ) {
          alert("Invalid form data");
        }

        form.classList.add("was-validated");

        //Sign in
        if (form.id === "signinForm") {
          event.preventDefault();
          handleSignin(signinUser.value, signinPassword.value);
        } else if (form.id === "signupForm") {
          //Sign up
          try {
            event.preventDefault();
            const response = await fetch("/api/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: signupUser.value,
                password: signupPassword.value,
              }),
            });
            const data = await response.json();
            if (data.message) {
              alert(data.message);
              //Automatic login after signup
              handleSignin(signupUser.value, signupPassword.value);
            }
          } catch (error) {
            console.error(
              "Errore durante signup o il login automatico:",
              error
            );
          }
        }
      },
      false
    );
  });
})();
