// Visibilité de la premiére partie de la modale
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

// Affichage de projets actuels (CurrentWork)
const urlPictures = "http://localhost:5678/api/works";
const currentPictures = document.getElementById("currentPictures");
const getProject = () => {
  fetch(urlPictures)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Data = " + data.length);
      for (let i in data) {
        let img = document.createElement("img");
        img.src = data[i].imageUrl;
        let figcaption = document.createElement("figcaption");
        figcaption.textContent = "éditer";

        // Création de l'Icon de suppression
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can", "trashIconStyle");
        trash.setAttribute("data-id", data[i].id);
        trash.addEventListener("click", function (event) {
          event.preventDefault();
          let id = this.dataset.id;
          deleteProject(id);
        });

        // Création de l'Icon d'agrandissement
        const arrows = document.createElement("i");
        arrows.classList.add(
          "fa-solid",
          "fa-arrows-up-down-left-right",
          "arrowsIconStyle"
        );
        arrows.setAttribute("data-id", data[i].id);

        //-------------------------------//

        let figure = document.createElement("figure");
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figcaption.appendChild(trash);
        figcaption.appendChild(arrows);
        currentPictures.appendChild(figure);
      }
    });
};
getProject();

// Visibilité de la seconde partie de la modale
let modalNewWork = document.querySelector(".modalNewWork");
let openModalNewWork = document.querySelector(".openModalNewWork");
let backToCurrentWork = document.querySelector(".backBtn");

function showModalPartTwo() {
  modalNewWork.classList.toggle("showModalPartTwo");
}

openModalNewWork.addEventListener("click", showModalPartTwo);
backToCurrentWork.addEventListener("click", showModalPartTwo);

// Ajout de nouveau projet à l'affichage (LOAD NewWork)
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

// Envoi de nouveau projet à la Database (POST)
const postProject = (event) => {
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
      console.log(res);
      if (res.ok) {
        showModalPartTwo();
        return res.json();
      }
    })
    .catch((error) =>
      console.error("Erreur lors de l'envoi des données : ", error)
    );
};

/*const btnAdd = document.getElementById("btn-add");
btnAdd.addEventListener("click", function () {});
postProject();*/

// Suppression de projet (DELETE)
async function deleteProject(workId) {
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json;charset=utf-8",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 204) {
    console.log("Projet supprimé avec succès");
    const divPicture = document.getElementById("currentPictures");
    divPicture.innerHTML = "";
    await getProject();
  } else if (response.status === 401 || response.status === 500) {
    console.log("Impossible de supprimer le projet");
  }
}
