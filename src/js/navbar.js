window.onload = function () {
    let currentPage = location.pathname.split("/").slice(-1);
    // document.getElementById('navbar').innerHTML =
    createHTMLForNavbar(currentPage);

    currentPage = currentPage[0].replace(".html", "");
    currentPage = document.getElementById(currentPage);
    currentPage.style.color = "white";
};

function createHTMLForNavbar(page) {

    let navbar = document.getElementById("navbar");
    // let navbarInner = document.createElement('div');
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
            id: "matrizenrechnung",
            href: `matrizenrechnung.html`,
            text: "Matrizenrechnung",
        },
        {
            id: "matrixoperationen",
            href: `matrixoperationen.html`,
            text: "Matrixoperationen",
        },
        {
            id: "gleichungssystem",
            href: `gleichungssystem.html`,
            text: "GL-System",
        },
        {
            id: "matrixinversion",
            href: `matrixinversion.html`,
            text: "Inversenberechnung",
        },
        {
            id: "hilfe",
            href: `hilfe.html`,
            text: "Hilfe",
        },
    ];
    navbar.appendChild(navbarLogo);
    navbarElements.map(element => {
        let navbarElement = document.createElement("li");
        navbarElement.classList.add("nav-element");
        let navbarLink = document.createElement("a");
        navbarLink.classList.add("nav-link");
        navbarLink.id = element.id;
        navbarLink.href = element.href;
        navbarLink.innerHTML = element.text;
        navbarElement.appendChild(navbarLink);
        navbarList.appendChild(navbarElement);
    });
    navbar.appendChild(navbarList);
}
