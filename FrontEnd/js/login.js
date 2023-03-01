const form = document.getElementById("form");
const username = document.getElementById("usename");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = " ";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Erreur dans l`identifiant ou le mot de passe");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length < 8) {
    setError(password, "Erreur dans l`identifiant ou le mot de passe");
  } else {
    setSuccess(password);
  }
};

fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: email, password: password }),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.message) {
      document.querySelector("#error-message").textContent =
        "Erreur dans l`identifiant ou le mot de passe";
    } else {
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("userId", data.userId);
      window.location.href = "/FrontEnd/";
    }
  })
  .catch((error) => console.Error(error));
