var modal = document.getElementById("help-modal");
var btnOpen = document.getElementById("btn-help-modal");
var spanClose = document.getElementById("span-close");
var btnClose = document.getElementById("btn-close");

btnOpen.addEventListener("click", function () {
    modal.style.display = "block";
});

function closeModal() {
    modal.style.display = "none";
}

spanClose.addEventListener("click", closeModal);
btnClose.addEventListener("click", closeModal);

// add eventlistener for esc-press
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
