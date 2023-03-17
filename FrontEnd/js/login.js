//Get elements for form log-in
const form = document.getElementById("form"); // Id in html Ok
const email = document.getElementById("email"); // no Id in html but class !
const password = document.getElementById("password"); // no Id in html but class !

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
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Erreur dans l'identifiant");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length >= 5 && passwordValue.length <= 15) {
    setSuccess(password);
  } else {
    setError(password, "Erreur dans le mot de passe");
  }
};

async function logIn() {
  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailValue, password: passwordValue }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!JSON.stringify(data).match("token")) {
        document.querySelector("#form > div.login_error").textContent =
          "utilisateur inconnu";
      } else {
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("userId", data.userId);
        document.location.href = "index.html";
        console.log(
          "token:",
          localStorage.getItem("access_token"),
          "userID:",
          localStorage.getItem("userId")
        );
      }
    })
    .catch((error) => console.Error(error));
}
