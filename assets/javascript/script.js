const container = document.getElementById("container")
const contentTabContainer = document.getElementById('tab-content')
const containerAlbumInfo = document.getElementById("content")
const buttonsContainer = document.getElementById("tab-buttons")

function fetchAlbums(){
    const url = 'https://yasmin-carloto.github.io/Projeto-Navegacao-com-Abas/taylor-albums.json'
    const ajax = new XMLHttpRequest()

// "../../taylor-albums.json"

    ajax.open('GET', url)

    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200){
            loadButtons(JSON.parse(ajax.responseText).albums)
        }else{
            console.error("Json não pôde ser carregado.")
        }
    }

    ajax.send()
}

function loadButtons(albums){
    buttonsContainer.innerHTML = ""

    albums.forEach(album => {
        const buttonElement = document.createElement("button")
        buttonElement.className = "tab-btn"
        buttonElement.innerHTML = album.name
        buttonElement.style.backgroundColor = album.secondary_color

        buttonElement.addEventListener("click", (e) => {
            e.preventDefault()
            setActiveButton(buttonElement)
            loadAlbumInfo(album)
            buttonElement.className = "tab-btn active"
        })

        buttonsContainer.appendChild(buttonElement)

    })
}

function setActiveButton(activeButton) {
    const allButtons = buttonsContainer.querySelectorAll(".tab-btn")
    allButtons.forEach(button => {
        button.classList.remove("active")
    })
    activeButton.classList.add("active")
}

function loadAlbumInfo(album){
    const image = document.createElement("img")
    image.src = album.cover
    image.alt = `Capa do album ${album.name}`
    image.className = "content-image"

    const infoContainerText = document.createElement("div")
    infoContainerText.className = 'infos'

    const albumTitle = document.createElement("h1")
    albumTitle.innerText = album.name
    albumTitle.className = "content-title"

    const albumDescription = document.createElement("p")
    albumDescription.innerText = album.description
    albumDescription.className = "content-description"

    const songQuantity = document.createElement("span")
    songQuantity.innerText = album.songs_quantity

    const songQuantityContainer = document.createElement("p")
    songQuantityContainer.innerText = "Quantidade de músicas: "
    songQuantityContainer.className = "song-quantity-container"

    songQuantityContainer.appendChild(songQuantity)

    const albumContainer = document.createElement("div")
    albumContainer.className = "content show"

    infoContainerText.appendChild(albumTitle)
    infoContainerText.appendChild(albumDescription)
    infoContainerText.appendChild(songQuantityContainer)

    albumContainer.appendChild(image)
    albumContainer.appendChild(infoContainerText)

    contentTabContainer.innerHTML = ""
    contentTabContainer.appendChild(albumContainer)

    document.body.style.backgroundColor = album.color
    contentTabContainer.style.backgroundColor = album.secondary_color
}

function removeActive(elementsList){
    elementsList.forEach(element => {
        element.classList.remove("active")
    })
}

fetchAlbums()