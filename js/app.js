(function () {
  const body = document.getElementsByTagName("BODY"),
    navMenu = document.querySelector(".nav-list"),
    arrowDown = document.querySelector(".arrow-down-con");

  let visible = false;

  function showOrHideNav() {
    navMenu.classList.toggle("show");
    arrowDown.style.visibility = visible ? "visible" : "hidden";
    visible = !visible;
  }

  document.addEventListener("click", e => {
    if (
      e.target.classList.contains("menu-button-img") ||
      e.target.classList.contains("close-button-img")
    ) {
      showOrHideNav();
    } else if (e.target.classList.contains("nav-link-content")) {
      showOrHideNav();
    }
  });
})();
