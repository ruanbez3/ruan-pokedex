// VARIABLES
const cardContainer = document.querySelector(".card-container")

fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
.then(pokes => {
    return pokes.json()
})
.then(allPokes => {
    addPokesToDOM(allPokes.results)
})
.catch(error => {
    console.log(error)
})

function addPokesToDOM(pokes) {
    // console.log(pokes)
    let cardElements = ""

    pokes.forEach(poke => {
        cardElements += 
                    `<article class="card">
                    <span><img src="" alt="Alt"></span>
                    <span>ID</span>
                    <span>${poke.name}</span>
                    <span>Email</span>
                    </article>`
    });
    
    cardContainer.innerHTML += cardElements
}