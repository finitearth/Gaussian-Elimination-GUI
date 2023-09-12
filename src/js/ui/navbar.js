/**
 * Function to execute when the window is loaded.
 * It sets the color of the current page link in the navigation bar.
 */
window.onload = function () {
    // Get the current page URL
    let currentPage = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
    );

    // Create the navigation bar
    createHTMLForNavbar();

    // Highlight the current page link in the navigation bar
    currentPage = document.getElementById(currentPage);
    currentPage.style.color = "white";
};

/**
 * Function to create the HTML structure for the navigation bar.
 * It dynamically generates navigation links based on an array of elements.
 */
function createHTMLForNavbar() {
    // Get the navigation bar element by its ID
    let navbar = document.getElementById("navbar");
    navbar.classList.add("nav");

    // Create a logo element with a link to the homepage
    let navbarLogo = document.createElement("a");
    navbarLogo.href = "../index.html";
    let imgLogo = document.createElement("img");
    imgLogo.src = "../images/icon_logo.png";
    imgLogo.alt = "Logo";
    imgLogo.classList.add("nav-logo");
    navbarLogo.appendChild(imgLogo);

    // Create an unordered list to hold navigation links
    let navbarList = document.createElement("ul");
    navbarList.classList.add("nav-list");

    // Define an array of navigation elements with their references and text
    let navbarElements = [
        {
            ref: `matrizenrechnung.html`,
            text: "Matrizenrechnung ",
        },
        {
            ref: `matrixoperationen.html`,
            text: "Matrixoperationen ",
        },
        {
            ref: `gleichungssystem.html`,
            text: "GL System ",
        },
        {
            ref: `matrixinversion.html`,
            text: "Inversenberechnung ",
        },
        {
            ref: `simplex.html`,
            text: "Simplex ",
        },
        {
            ref: `info.html`,
            text: "ⓘ",
        },
    ];

    // Add the logo to the navigation bar
    navbar.appendChild(navbarLogo);

    // Iterate through the navigation elements and create corresponding links
    navbarElements.map(element => {
        let navbarElement = document.createElement("li");
        navbarElement.classList.add("nav-element");
        let navbarLink = document.createElement("a");
        navbarLink.classList.add("nav-link");
        navbarLink.id = element.ref;
        navbarLink.href = element.ref;
        navbarLink.innerHTML = element.text;
        navbarElement.appendChild(navbarLink);
        navbarList.appendChild(navbarElement);
    });

    // Add the list of navigation links to the navigation bar
    navbar.appendChild(navbarList);
}
