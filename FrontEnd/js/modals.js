// visibilité modale CurrentWork
let modalCurrentWork = document.querySelector(".modalCurrentWork");
let openModalCurrentWork = document.querySelector(".openModalCurrentWork");
let closeModalCurrentWork = document.querySelector(".closeModalCurrentWork");

function toggleModal() {
  modalCurrentWork.classList.toggle("showModalCurrentWork");
}

function windowOnClick(event) {
  if (event.target === modalCurrentWork) {
    toggleModal();
  }
}

openModalCurrentWork.addEventListener("click", toggleModal);
closeModalCurrentWork.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//récuperation des Traveaux d'Architecte
const urlPictures = "http://localhost:5678/api/works";
const currentPictures = document.getElementById("currentPictures");
const getPictures = () => {
  fetch(urlPictures)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      localStorage.setItem("SauvegardeWorks", JSON.stringify(data));
      for (i in data) {
        let img = document.createElement("img");
        img.src = data[i].imageUrl;

        let figcaption = document.createElement("figcaption");
        figcaption.textContent = "éditer";

        //Ajout de l' icon fleché et la poubelle
        const arrowsIcon = document.createElement("arrowsIcon");
        arrowsIcon.innerHTML =
          '<i class="fa-regular fa-arrows-up-down-left-right"></i>';

        const trashIcon = document.createElement("trashIcon");
        trashIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        let figure = document.createElement("figure");
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(arrowsIcon);
        figure.appendChild(trashIcon);

        currentPictures.appendChild(figure);

        //Multiple CSS pour les icons
        const iconStyles = `
        background-color: black;
        font-size: 10px;
        color: white;
        padding: 4px;
        position: relative;
      `;
        trashIcon.style.cssText = iconStyles;
        arrowsIcon.style.cssText = iconStyles;

        trashIcon.style.marginLeft = "4px";
        arrowsIcon.style.marginLeft = "36px";

        /*
        const figCaptionStyles = `
        color: black;
        position: relative;
      `;
        figcaption.style.cssText = figCaptionStyles;
        */
      }
    });
};
getPictures();

// Suppression de projet
async function getId() {
  const response = await fetch("http://localhost:5678/api/works");
  const json = await response.json();
  const workId = json.categoryId;
}

async function deleteProject(workId) {
  const response = await fetch("http://localhost:5678/api/works/${workId})", {
    method: "DELETE",
    headers: {
      "content-type": "application/json;charset=utf-8",
      authorization: "bearer ${getToken}",
    },
  });
}

if (response.status === 200) {
  deleteProject(workId);
} else if (response.status === 401 || 500) {
  console.log("Imposible de supprimer");
}

trashIcon.addEventListener("click", deleteProject(workId));
