// ELEMENTS
const scrollMove = document.querySelector(".scroll-move")
const user_input = document.querySelector(".scroll-move")
const cardContainer = document.querySelector(".card-container")
const searchFor = document.querySelector("#search")
const searchButtton = document.querySelector("#pokeSearch")
const sortSeletor = document.querySelector("#sort")
const btnTheme = document.querySelector("#colour-theme")

// GLOBAL VARIABLES
let pokemonArray = []
    lastScrollY = window.scrollY
    colourTheme = "light"

// =========================================================================
// BEGIN

// ASYNC FUNCTIONS
const getPokes = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    
    if (response.status !== 200) {
        throw new Error("Cannot fetch data")
    }
    
    const allPokes = await response.json()

    pokemonArray = allPokes.results
    return allPokes.results
}

// Get each pokemon's info
const getPokemonInfo = async (link) => {
    const response = await fetch(link)

    if (response.status !== 200) {
        throw new Error("Cannot fetch info")
    }

    const pokeInfo = await response.json()
    return pokeInfo
}

// Call function to fetch 151 pokemon cards
getPokes()
.then(allPokemons => {
    addPokesToDOM(allPokemons)
})
.catch(error => {
    console.log(error.message)
})

// Search array of Pokemons for result
async function searchPokemon(pokemonArray, search) {
    let cardElements = ""
    cardContainer.innerHTML = ""

    // Loop through array of pokemons
    for (let i = 0; i < pokemonArray.length; i++) {
        let pokeName = pokemonArray[i].name.toUpperCase()

        if (pokeName.includes(search.toUpperCase())) {
            cardElements += await getCardElements(pokemonArray[i].url)
    } 
}
        cardContainer.innerHTML += cardElements
}

// Event when select option changes
function sortSelectorChanged(event) {
    sortPokemons(pokemonArray, event.target.value)
}

// Sorting function
async function sortPokemons(pokemonArray, sortBy) {
    let cardElements = ""
        pokemonArraySorted = []
    cardContainer.innerHTML = ""

    switch (sortBy) {
        case "<":
            pokemonArraySorted = pokemonArray
            pokemonArraySorted.reverse()
            for (let i = 0; i < pokemonArray.length; i++) {
                cardElements += await getCardElements(pokemonArraySorted[i].url)
            }
            
            cardContainer.innerHTML += cardElements
            break
        case ">":
            pokemonArraySorted = pokemonArray
            pokemonArraySorted.reverse()
            for (let i = 0; i < pokemonArray.length; i++) {
                cardElements += await getCardElements(pokemonArraySorted[i].url)
            }
            
            cardContainer.innerHTML += cardElements
            break
        case "a-z":
            
            break
        case "z-a":

            break
    }
}

// Get card info to display
async function getCardElements(pokemonCharacter) {
    let pokemon = await getPokemonInfo(pokemonCharacter)
        display = ""

   display = 
            `<a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target=_blank class="pokemon-link">
            <article class="card ${colourTheme}">
            <span><img src="${pokemon.sprites.front_default}" alt="Alt"></span>
            <span id="pokemon_id">#${pokemon.id}</span>
            <span id="pokemon_name" class="${colourTheme}">${pokemon.name}</span>
            <span><h4 id="pokemon_type">${await displayPokemonTypes(pokemon.types)}</h4></span>
            </article>
            </a>`

    return display
}

// Get and return types of each pokemon
async function displayPokemonTypes(pokemonTypes) {
    let typeString = ""
    for (let i = 0; i < pokemonTypes.length; i++) {
        typeString += pokemonTypes[i].type.name + " "
    }
    return typeString
}

// =========================================================================
// DISPLAY FUNCTION
// Function to add pokemon cards to DOM
async function addPokesToDOM(pokes) {
    let cardElements = ""

    for (const poke of pokes) {
        let pokeName = poke.name
        pokeName = pokeName.toUpperCase()
        cardElements += await getCardElements(poke.url)
    }
    
    cardContainer.innerHTML += cardElements
}

// Reload the page
function refreshPage(){
    window.location.reload();
} 

// END
// =========================================================================