//Paramétrage de la fenetre login
const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  logIn();
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
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const validateInputs = () => {
  emailValue = email.value.trim();
  passwordValue = password.value.trim();

  if (emailValue === "") {
    setError(email, "Rensegnez votre adresse Email !");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Erreur dans l'identifiant !");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Rensegnez votre Mot de Passe");
  } else if (passwordValue.length >= 5 && passwordValue.length <= 15) {
    setSuccess(password);
  } else {
    setError(password, "Erreur dans le mot de passe !");
  }
};
//Récuperation du Token d'authentification
async function logIn() {
  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailValue, password: passwordValue }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.token) {
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("userId", data.userId);
        document.location.href = "index.html";
        console.log(
          "token:",
          localStorage.getItem("access_token"),
          "userID:",
          localStorage.getItem("userId")
        );
      } else {
        document.querySelector("#form > div.login_error").textContent =
          "utilisateur inconnu";
      }
    })
    .catch((error) => console.Error(error));
}
