// visibilité de la modale partie CurrentWork
let modalCurrentWork = document.querySelector(".modalCurrentWork");
let openModalCurrentWork = document.querySelector(".openModalCurrentWork");
let closeModalCurrentWork = document.querySelector(".closeModalCurrentWork");
const token = localStorage.getItem("access_token");

function showModalPartOne() {
  modalCurrentWork.classList.toggle("showModalPartOne");
}
openModalCurrentWork.addEventListener("click", showModalPartOne);
closeModalCurrentWork.addEventListener("click", showModalPartOne);

function modalOneOutsideClick(e) {
  if (e.target === modalCurrentWork) {
    showModalPartOne();
  }
}
window.addEventListener("click", modalOneOutsideClick);

//Intégration des Traveaux d'Architecte
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

        //Ajout de l'icon poubelle et changement photos
        const trashIcon = document.createElement("div");
        trashIcon.classList.add("trashIconStyle");
        trashIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        const arrowsIcon = document.createElement("div");
        arrowsIcon.classList.add("arrowsIconStyle");
        arrowsIcon.innerHTML =
          '<i class="fa-solid fa-arrows-up-down-left-right"></i>';

        let figure = document.createElement("figure");
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figcaption.appendChild(trashIcon);
        figcaption.appendChild(arrowsIcon);
        currentPictures.appendChild(figure);
      }
      const trashIcons = document.querySelectorAll(".trashIconStyle");
      for (let trashIcon of trashIcons) {
        trashIcon.addEventListener("click", async (e) => {
          const workId = await getId();
          deleteProject(workId);
        });
      }
    });
};
document.addEventListener("DOMContentLoaded", getPictures);

// visibilité de la modale partie newWork
let modalNewWork = document.querySelector(".modalNewWork");
let openModalNewWork = document.querySelector(".openModalNewWork");
let backToCurrentWork = document.querySelector(".backBtn");

function showModalPartTwo() {
  modalNewWork.classList.toggle("showModalPartTwo");
}

openModalNewWork.addEventListener("click", showModalPartTwo);
backToCurrentWork.addEventListener("click", showModalPartTwo);

// Ajout du nouveau projet à l'affichage
const displayImage = document.getElementById("displayImage");
const imageInput = document.getElementById("imageInput");
const newImage = displayImage.querySelector(".newImage");
const infoUpload = displayImage.querySelector(".infoUpload");

imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    newImage.style.display = "block";
    newImage.style.position = "absolute";
    infoUpload.style.display = "none";

    reader.addEventListener("load", function () {
      console.log(this);
      newImage.setAttribute("src", this.result);
    });
    reader.readAsDataURL(file);
  } else {
    newImage.style.display = null;
    newImage.setAttribute("src", "");
  }
});

// Ajout du nouveau projet au database
const addProject = (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append(
    "image",
    document.getElementById("imageInput").files[0],
    document.getElementById("imageInput").files[0].type
  );
  formData.append("title", document.querySelector('input[name="title"]').value);

  let categoryList = document.getElementById("category").value;
  let categoryId = document.querySelector(
    `datalist option[value="${categoryList}"]`
  ).dataset.id;

  formData.append("category", categoryId);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: formData,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((error) =>
      console.error("Erreur lors de l'envoi des données : ", error)
    );
};

//Suppression de projet
const trashIcons = document.querySelectorAll(".trashIcon");
console.log(trashIcons);
if (trashIcons.length > 0) {
  trashIcons.forEach((trashIcon) => {
    if (trashIcon.id === "my-trash-icon") {
      const myTrashIcon = trashIcon;
      myTrashIcon.addEventListener("click", async (e) => {
        const workId = await getId();
        deleteProject(workId);
      });
    }
  });
}
async function getId() {
  const response = await fetch("http://localhost:5678/api/works");
  const json = await response.json();
  const workId = json[0].id;
  return workId;
}
async function deleteProject(workId) {
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json;charset=utf-8",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    console.log("Projet supprimé avec succès");
  } else if (response.status === 401 || response.status === 500) {
    console.log("Impossible de supprimer le projet");
  }
}