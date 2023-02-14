window.onload = function () {
    let currentPage = location.pathname.split("/").slice(-1);
    // document.getElementById('navbar').innerHTML =
    createHTMLForNavbar(currentPage);

    if (currentPage == "index.html") {
        currentPage = document.getElementById("startseite");
    } else {
        currentPage = currentPage[0].replace(".html", "");
        currentPage = document.getElementById(currentPage);
    }

    currentPage.style.color = "white";
};

function createHTMLForNavbar(page) {
    if (page == "index.html") {
        index_prefix = "";
        page_prefix = "pages/";
    } else {
        index_prefix = "../";
        page_prefix = "";
    }

    let navbar = document.getElementById("navbar");
    // let navbarInner = document.createElement('div');
    navbar.classList.add("nav");
    let navbarList = document.createElement("ul");
    navbarList.classList.add("nav-list");
    let navbarElements = [
        {
            id: "startseite",
            href: `${index_prefix}index.html`,
            text: "Startseite",
        },
        {
            id: "matrizenrechnung",
            href: `${page_prefix}matrizenrechnung.html`,
            text: "Matrizenberechnung",
        },
        {
            id: "matrixoperationen",
            href: `${page_prefix}matrixoperationen.html`,
            text: "Matrixoperationen",
        },
        {
            id: "gleichungssystem",
            href: `${page_prefix}gleichungssystem.html`,
            text: "GL-System",
        },
        {
            id: "matrixinversion",
            href: `${page_prefix}matrixinversion.html`,
            text: "Inversenberechnung",
        },
    ];
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
    // navbarInner.appendChild(navbarList);
    navbar.appendChild(navbarList);
}
