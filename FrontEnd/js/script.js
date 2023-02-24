//récuperation des Traveaux
const urlWorks = "http://localhost:5678/api/works"
const works = document.getElementById("works")
const getWorks = () => {
    fetch (urlWorks)
    .then (function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
        for (work in data) {
            works.innerHTML += `<figure>
                <img src="${data[work].imageUrl}" alt="${data[work].category}">
                <figcaption>${data[work].title}</figcaption>
            </figure>`
        }
    })
}
getWorks()

//récuperation des Categories
const urlCategories = "http://localhost:5678/api/categories"
const categories = document.getElementById("categories")
const getCategories = () => {
    fetch (urlCategories)
    .then (function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
        for (work in data) {
            categories.innerHTML += `<a href= "#"> ${data[work].name}
            </a>`
        }
    })
}
getCategories()

