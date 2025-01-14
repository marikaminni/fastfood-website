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

(() => {
  "use strict";

  const signinUser = document.getElementById("signinUsername");
  const signinPassword = document.getElementById("signinPassword");
  const signupUser = document.getElementById("signupUsername");
  const signupPassword = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  function showError(input, message) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    const feedback = input.nextElementSibling; //.invalid-feedback
    if (feedback) {
      feedback.innerHTML = message;
    }
  }

  function clearError(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }

  //Validate signin fields
  function validateSignin() {
    let isValid = true;
    if (signinUser.value.trim() === "") {
      showError(signinUser, "Please enter username");
      isValid = false;
    } else {
      clearError(signinUser);
    }
    if (signinPassword.value.trim() === "") {
      showError(signinPassword, "Please enter password");
      isValid = false;
    } else {
      clearError(signinPassword);
    }
    return isValid;
  }

  //Validate signup fields
  function checkUsername() {
    const usernameValue = signupUser.value.trim();
    const min = 3,
      max = 10;
    if (usernameValue.length < min || usernameValue.length > max) {
      showError(
        signupUser,
        `Username must be between ${min} and ${max} characters`
      );
      return false;
    }
    clearError(signupUser);
    return true;
  }

  function checkPassword() {
    const passwordValue = signupPassword.value.trim();
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!passwordValue) {
      showError(signupPassword, "Cannot be blank");
      return false;
    } else if (!passwordRegex.test(passwordValue)) {
      showError(
        signupPassword,
        "Password must contain at least one uppercase, one lowercase, one number and one special character in (!@#$%^&*)."
      );
      return false;
    }
    clearError(signupPassword);
    return true;
  }

  function checkConfirmPassword() {
    const passwordValue = signupPassword.value.trim();
    const confirmValue = confirmPassword.value.trim();
    if (!confirmValue) {
      showError(confirmPassword, "Cannot be blank");
      return false;
    } else if (passwordValue !== confirmValue) {
      showError(confirmPassword, "Passwords do not match");
      return false;
    }
    clearError(confirmPassword);
    return true;
  }

  //handle signin
  async function handleSignin(username, password) {
    const signinError = document.getElementById("errorCredentials");
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
        if (response.status === 404) {
          signinError.classList.remove("d-none");
          signinError.innerHTML = "Invalid username or password";
          return;
        }
        console.log("HTTP Error: ", response);
        throw new Error(`HTTP Error: ${response.status}`);
      }
      signinError.classList.add("d-none");

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

  //handle signup
  async function handleSignup(username, password) {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        throw new Error(`HTTP Error: ${response.status}`);
      }

      alert(data.message);
      //Automatic login after signup
      await handleSignin(username, password);
    } catch (error) {
      console.error("Error during signup or automatic login");
    }
  }

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        let isValid = true;
        if (form.id === "signinForm") {
          isValid = validateSignin();
          if (isValid) {
            await handleSignin(signinUser.value, signinPassword.value);
          }
        } else if (form.id === "signupForm") {
          const userValid = checkUsername();
          const passwordValid = checkPassword();
          const confirmValid = checkConfirmPassword();
          isValid = userValid && passwordValid && confirmValid;
          if (isValid) {
            await handleSignup(signupUser.value, signupPassword.value);
          }
        }

        if (!isValid) {
          console.log("Validation failed");
          return;
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
