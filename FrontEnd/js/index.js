//récuperation des Traveaux d'Architecte
const urlWorks = "http://localhost:5678/api/works";
const works = document.getElementById("works");
const getWorks = () => {
  fetch(urlWorks)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      localStorage.setItem("SauvegardeWorks", JSON.stringify(data));
      for (i in data) {
        let img = document.createElement("img");
        img.src = data[i].imageUrl;
        img.alt = data[i].title;
        img.appendChild(document.createTextNode(data[i].title));

        let figcaption = document.createElement("figcaption");
        figcaption.textContent = data[i].title;

        let figure = document.createElement("figure");
        figure.appendChild(img);
        figure.appendChild(figcaption);

        works.appendChild(figure);
      }
    });
};
getWorks();

//récuperation des Categories
const urlCategories = "http://localhost:5678/api/categories";
const categories = document.getElementById("categories");
const getCategories = () => {
  fetch(urlCategories)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (i in data) {
        let button = document.createElement("button");
        button.appendChild(document.createTextNode(data[i].name));
        button.setAttribute("class", "btn");
        button.setAttribute(
          "onclick",
          `filter('${data[i].name}');clicked(this)`
        );
        categories.appendChild(button);
      }
    });
};
getCategories();

//création des filters
function filter(selected) {
  savedDataWorks = JSON.parse(localStorage.getItem("SauvegardeWorks"));

  works.replaceChildren();
  for (i in savedDataWorks) {
    if (selected === "All") {
      let img = document.createElement("img");
      img.src = savedDataWorks[i].imageUrl;
      img.alt = savedDataWorks[i].title;
      img.appendChild(document.createTextNode(savedDataWorks[i].title));

      let figcaption = document.createElement("figcaption");
      figcaption.textContent = savedDataWorks[i].title;

      let figure = document.createElement("figure");
      figure.appendChild(img);
      figure.appendChild(figcaption);

      works.appendChild(figure);
    } else if (savedDataWorks[i].category.name === selected) {
      let img = document.createElement("img");
      img.src = savedDataWorks[i].imageUrl;
      img.alt = savedDataWorks[i].title;
      img.appendChild(document.createTextNode(savedDataWorks[i].title));

      let figcaption = document.createElement("figcaption");
      figcaption.textContent = savedDataWorks[i].title;

      let figure = document.createElement("figure");
      figure.appendChild(img);
      figure.appendChild(figcaption);

      works.appendChild(figure);
    }
  }

  const buttons = document.getElementsByClassName("btn");
  for (i in buttons) {
    if (buttons[i].classList == "btn active")
      buttons[i].classList.remove("active");
  }
}

function clicked(sl) {
  sl.classList.add("active");
}

//display none in CSS: banniére, link logout et modifier
//display none in CSS: 2modals

let log = localStorage.getItem("access_token");
console.log(log);
const logout = document.getElementById("logout");
console.log(logout);

if (log != null) {
  logout.classList.add("show");
  logout.classList.remove("hide");

  const login = document.get("login");
  login.classList.add("hide");

  const categories = document.getElementById("categories");
  categories.style.display = "none";
}

logout.addEventListener("click", function () {
  localStorage.clear();
});
