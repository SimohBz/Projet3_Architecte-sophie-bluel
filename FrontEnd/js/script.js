const url = "http://localhost:5678/api/works"
const container = document.getElementById("portfolio")

const getWorks = () => {
    fetch (url)
    .then (function (response){
        return response.json()
    })

    .then(function (data) {
        console.log(data)
        for (work in data) {
            container.innerHTML += `<a href= "#">
            <figure>
                <img src="${data[work].imageUrl}" alt="${data[work].category}">
                <figcaption>${data[work].title}</figcaption>
            </figure>
            </a>`
        }

    })

}

getWorks()