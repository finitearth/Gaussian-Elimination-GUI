window.onload = function () {
    let currentPage = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
    );
    createHTMLForNavbar();

    currentPage = document.getElementById(currentPage);
    currentPage.style.color = "white";
};

function createHTMLForNavbar() {
    let navbar = document.getElementById("navbar");
    navbar.classList.add("nav");
    let navbarLogo = document.createElement("a");
    navbarLogo.href = "../index.html";
    let imgLogo = document.createElement("img");
    imgLogo.src = "../images/icon_logo.png";
    imgLogo.alt = "Logo";
    imgLogo.classList.add("nav-logo");
    navbarLogo.appendChild(imgLogo);
    let navbarList = document.createElement("ul");
    navbarList.classList.add("nav-list");
    let navbarElements = [
        {
            ref: `matrizenrechnung.html`,
            text: "Matrizenrechnung",
        },
        {
            ref: `matrixoperationen.html`,
            text: "Matrixoperationen",
        },
        {
            ref: `gleichungssystem.html`,
            text: "GL-System",
        },
        {
            ref: `matrixinversion.html`,
            text: "Inversenberechnung",
        },
        {
            ref: `info.html`,
            text: "ⓘ",
        },
    ];
    navbar.appendChild(navbarLogo);
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
    navbar.appendChild(navbarList);
}
