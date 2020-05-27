(function () {
    const body = document.getElementsByTagName("BODY"),
        navMenu = document.querySelector(".nav-list"),
        arrowDown = document.querySelector(".arrow-down-con");

    let visible = false;

    document.addEventListener("click", e => {
        if (e.target.classList.contains("menu-button-img") || e.target.classList.contains("close-button-img")) {
            navMenu.classList.toggle("show");
            arrowDown.style.visibility = visible ? "visible" : "hidden";
            visible = !visible;
        }
    });
})()