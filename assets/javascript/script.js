const container = document.getElementById("container")
const contentTabContainer = document.getElementById('tab-content')
const containerAlbumInfo = document.getElementById("content")
const buttonsContainer = document.getElementById("tab-buttons")

function fetchAlbuns(){
    const url = 'http://localhost:3000/albuns'
    const ajax = new XMLHttpRequest()

    ajax.open('GET', url)

    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200){
            const jsonResponse = JSON.parse(ajax.responseText)
            loadButtons(jsonResponse)
        }else{
            console.error("Json não pôde ser carregado.")
        }
    }

    ajax.send()
}

function loadButtons(albuns){
    buttonsContainer.innerHTML = ""

    albuns.forEach(album => {
        const buttonElement = document.createElement("button")
        buttonElement.className = "tab-btn"
        buttonElement.innerHTML = album.nome
        buttonElement.style.backgroundColor = album.cor_secundaria

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
    image.src = album.capa
    image.alt = `Capa do album ${album.nome}`
    image.className = "content-image"

    const infoContainerText = document.createElement("div")
    infoContainerText.className = 'infos'

    const albumTitle = document.createElement("h1")
    albumTitle.innerText = album.nome
    albumTitle.className = "content-title"

    const albumDescription = document.createElement("p")
    albumDescription.innerText = album.descricao
    albumDescription.className = "content-description"

    const songQuantity = document.createElement("span")
    songQuantity.innerText = album.quantidade_musicas

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

    document.body.style.backgroundColor = album.cor
    contentTabContainer.style.backgroundColor = album.cor_secundaria
}

function removeActive(elementsList){
    elementsList.forEach(element => {
        element.classList.remove("active")
    })
}

fetchAlbuns()