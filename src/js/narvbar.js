let start_nav = '<div class="nav" style="position: fixed; \
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
<li style="display: inline; padding-inline-end: 12%;"> \
<a onclick="changeColorOfLinks(this)" id="startseite" href="index.html" style="color: rgb(154, 157, 160); text-decoration: none;">Startseite</a> \
</li> \
<li style="display: inline; padding-inline-end: 12%;"> \
<a id="matirzenrechnung" href="pages/matrizenrechnung.html" style="color:rgb(154, 157, 160); text-decoration:none;">Matrizenberechnung</a> \
</li> \
<li style="display: inline; padding-inline-end: 12%;"> \
<a id="matrixoperationen" href="pages/matrixoperationen.html" style="color: rgb(154, 157, 160); text-decoration: none;">Matrixoperationen</a> \
</li> \
<li style="display: inline; padding-inline-end: 12%;"> \
<a id="gleichungssystem" href="pages/gleichungssystem.html" style="color: rgb(154, 157, 160); text-decoration: none;">GL-System</a> \
</li> \
<li style="display: inline;"> \
<a id="matrixinversion" href="pages/matrixinversion.html" style="color: rgb(154, 157, 160); text-decoration: none;">Inversenberechnung</a> \
</li> \
</ul> \
</nav> \
</div>'

let navbar = '<div class="nav" style="position: fixed; \
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
<li style="display: inline; padding-inline-end: 12%;"> \
<a onclick="changeColorOfLinks(this)" id="startseite" href="../index.html" style="color: rgb(154, 157, 160); text-decoration: none;">Startseite</a> \
</li> \
<li style="display: inline; padding-inline-end: 12%;"> \
<a id="matirzenrechnung" href="matrizenrechnung.html" style="color:rgb(154, 157, 160); text-decoration:none;">Matrizenberechnung</a> \
</li> \
<li style="display: inline; padding-inline-end: 12%;"> \
<a id="matrixoperationen" href="matrixoperationen.html" style="color: rgb(154, 157, 160); text-decoration: none;">Matrixoperationen</a> \
</li> \
<li style="display: inline; padding-inline-end: 12%;"> \
<a id="gleichungssystem" href="gleichungssystem.html" style="color: rgb(154, 157, 160); text-decoration: none;">GL-System</a> \
</li> \
<li style="display: inline;"> \
<a id="matrixinversion" href="matrixinversion.html" style="color: rgb(154, 157, 160); text-decoration: none;">Inversenberechnung</a> \
</li> \
</ul> \
</nav> \
</div>'

window.onload = function(){
    insertNavbar();
}

function insertNavbar(){
    document.getElementById('navbar').innerHTML = navbar; 
    document.getElementById('start_nav').innerHTML = start_nav;  
}



