window.onload = function(){
    let page = location.pathname.split("/").slice(-1);
    document.getElementById('navbar').innerHTML = createHTMLForNavbar(page);
    
    if(page == 'index.html'){
        let page = document.getElementById('startseite')
        page.style.color = 'white';
    } else if(page == 'matrizenrechnung.html') {
        let page = document.getElementById('matrizenrechnung')
        page.style.color = 'white';
    } else if(page == 'matrixoperationen.html'){
        let page = document.getElementById('matrixoperationen')
        page.style.color = 'white';
    } else if(page == 'gleichungssystem.html'){
        let page = document.getElementById('gleichungssystem')
        page.style.color = 'white';
    } else if(page == 'matrixinversion.html'){
        let page = document.getElementById('matrixinversion')
        page.style.color = 'white';
    }
};
    
function createHTMLForNavbar(page){
    var index_prefix;
    var page_prefix;
    if(page == 'index.html'){
        index_prefix = '';
        page_prefix = 'pages/';
    } else {
        index_prefix = '../';
        page_prefix = '';
    }

    let html = `<div class="nav">\
                 <ul class="nav-list"> \
                  <li class="nav-element"><a class="nav-link" id="startseite" href="${index_prefix}index.html">Startseite</a></li> \
                  <li class="nav-element"><a class="nav-link" id="matrizenrechnung" href="${page_prefix}matrizenrechnung.html">Matrizenberechnung</a></li> \
                  <li class="nav-element"><a class="nav-link" id="matrixoperationen" href="${page_prefix}matrixoperationen.html">Matrixoperationen</a></li> \
                  <li class="nav-element"><a class="nav-link" id="gleichungssystem" href="${page_prefix}gleichungssystem.html">GL-System</a></li> \
                  <li class="nav-element"><a class="nav-link" id="matrixinversion" href="${page_prefix}matrixinversion.html">Inversenberechnung</a></li> \
                 </ul> \
                </div>`;

    return html
}