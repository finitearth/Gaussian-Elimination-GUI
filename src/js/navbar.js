let style_link = 'style="color: rgb(154, 157, 160); text-decoration: none;"'
let style_active_link = 'style="color: rgb(255, 255, 255); text-decoration: none;"'


window.onload = function(){
    let page = location.pathname.split("/").slice(-1)
    document.getElementById('navbar').innerHTML = createHTMLForNavbar(page)
    
};


function createHTMLForNavbar(page){
    let html = '<div class="nav" style="position: fixed; \
                                        box-sizing: border-box; \
                                        top: 0;  \
                                        left: 0;  \
                                        width: 100%;  \
                                        text-align: justify;  \
                                        background-color: rgb(52, 58, 64); \
                                        font-family: Georgia, Times, serif; \
                                        font-size: larger;"> \
                    <nav style="padding: 1%;"> \
                        <ul class="nav_links" style="list-style-type:none; margin: 0; padding: 0; width: 100%; text-align: center; justify-content: space-between;">  \
                            <li style="display: inline; padding-inline-end: 12%;">'
    
    if(page == 'index.html'){
        html = html + '<a id="startseite" href="index.html"' + style_active_link + ' >Startseite</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;">\
                        <a id="matirzenrechnung" href="pages/matrizenrechnung.html"' + style_link + '>Matrizenberechnung</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;"> \
                        <a id="matrixoperationen" href="pages/matrixoperationen.html"' + style_link + '>Matrixoperationen</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;"> \
                        <a id="gleichungssystem" href="pages/gleichungssystem.html"' + style_link + '>GL-System</a> \
                    </li> \
                    <li style="display: inline;"> \
                        <a id="matrixinversion" href="pages/matrixinversion.html"' + style_link + '>Inversenberechnung</a>'
    } else if(page == 'matrizenrechnung.html') {
        html = html + '<a id="startseite" href="../index.html"' + style_link + ' >Startseite</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;">\
                        <a id="matirzenrechnung" href="matrizenrechnung.html"' + style_active_link + '>Matrizenberechnung</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;"> \
                        <a id="matrixoperationen" href="matrixoperationen.html"' + style_link + '>Matrixoperationen</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;"> \
                        <a id="gleichungssystem" href="gleichungssystem.html"' + style_link + '>GL-System</a> \
                    </li> \
                    <li style="display: inline;"> \
                        <a id="matrixinversion" href="matrixinversion.html"' + style_link + '>Inversenberechnung</a>'
    } else if(page == 'matrixoperationen.html'){
        html = html + '<a id="startseite" href="../index.html"' + style_link + ' >Startseite</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;">\
                        <a id="matirzenrechnung" href="matrizenrechnung.html"' + style_link + '>Matrizenberechnung</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;"> \
                        <a id="matrixoperationen" href="matrixoperationen.html"' + style_active_link + '>Matrixoperationen</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;"> \
                        <a id="gleichungssystem" href="gleichungssystem.html"' + style_link + '>GL-System</a> \
                    </li> \
                    <li style="display: inline;"> \
                        <a id="matrixinversion" href="matrixinversion.html"' + style_link + '>Inversenberechnung</a>'
    } else if(page == 'gleichungssystem.html'){
        html = html + '<a id="startseite" href="../index.html"' + style_link + ' >Startseite</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;">\
                        <a id="matirzenrechnung" href="matrizenrechnung.html"' + style_link + '>Matrizenberechnung</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;"> \
                        <a id="matrixoperationen" href="matrixoperationen.html"' + style_link + '>Matrixoperationen</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;"> \
                        <a id="gleichungssystem" href="gleichungssystem.html"' + style_active_link + '>GL-System</a> \
                    </li> \
                    <li style="display: inline;"> \
                        <a id="matrixinversion" href="matrixinversion.html"' + style_link + '>Inversenberechnung</a>'
    } else if(page == 'matrixinversion.html'){
        html = html + '<a id="startseite" href="../index.html"' + style_link + ' >Startseite</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;">\
                        <a id="matirzenrechnung" href="matrizenrechnung.html"' + style_link + '>Matrizenberechnung</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;"> \
                        <a id="matrixoperationen" href="matrixoperationen.html"' + style_link + '>Matrixoperationen</a> \
                    </li> \
                    <li style="display: inline; padding-inline-end: 12%;"> \
                        <a id="gleichungssystem" href="gleichungssystem.html"' + style_link + '>GL-System</a> \
                    </li> \
                    <li style="display: inline;"> \
                        <a id="matrixinversion" href="matrixinversion.html"' + style_active_link + '>Inversenberechnung</a>'
    }

    html = html + '</li> \
                </ul> \
            </nav> \
        </div>'

    return html
}


