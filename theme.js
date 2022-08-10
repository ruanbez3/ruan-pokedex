let colourTheme = ""

// Dark/Light mode function
function toggleDarkMode() {
    documentBody = document.querySelector(".body")
    const link = document.getElementsByTagName("a")
    navbar = document.querySelector(".navbar")
    card = document.querySelectorAll(".card")
    cardName = documentBody.querySelectorAll("#pokemon_name")

    if (colourTheme === "light") {
        colourTheme = "dark"
        btnTheme.innerHTML = "Dark"
    } else if (colourTheme === "dark") {
        colourTheme = "light"
        btnTheme.innerHTML = "Light"
    }

    // Toggle light/dark mode
    documentBody.classList.toggle("dark")
    for (let i = 0; i < link.length; i++) {
        link[i].classList.toggle("dark")
    }
    navbar.classList.toggle("dark")
    for (let i = 0; i < card.length; i++) {
        card[i].classList.toggle("dark")
    }
    for (let i = 0; i < cardName.length; i++) {
        cardName[i].classList.toggle("dark")
    }
}