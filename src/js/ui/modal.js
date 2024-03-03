var modal = document.getElementById("help-modal");
var buttonOpen = document.getElementById("button-help-modal");
var spanClose = document.getElementById("span-close");
var buttonClose = document.getElementById("button-close");

/**
 * adds mouse click EventListener to button
 * sets the style attribute "display" to "block"
 * modal shows to user
 */
buttonOpen.addEventListener("click", function () {
    modal.style.display = "block";
});

/**
 * sets the style attribute "display" to "none"
 */
function closeModal() {
    modal.style.display = "none";
}

/**
 * adds mouse click EventListener to span
 * calls method "closeModal"
 * model not shown to user anymore
 */
spanClose.addEventListener("click", closeModal);


/**
 * adds escape press EventListener to document
 * calls method "closeModal"
 * model not shown to user anymore
 */
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

/**
 * adds escape press EventListener to document
 * calls method "closeModal"
 * model not shown to user anymore
 */
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
};
