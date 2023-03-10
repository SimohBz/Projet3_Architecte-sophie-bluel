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
