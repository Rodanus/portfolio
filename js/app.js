(function () {
  const body = document.querySelector("body"),
    navMenu = document.querySelector(".nav-list"),
    arrowDown = document.querySelector(".arrow-down-con");

  let visible = false;

  function checkWindowSize() {
    let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    if (width >= 1200) {
      console.log("1200");
    }
  }

  function enableScrollingOnIOS() {
    document.ontouchmove = e => {
      e.preventDefault();
    };
  }

  function disableScrollingOnIOS() {
    document.ontouchmove = () => true;
  }

  function showOrHideNav() {
    navMenu.classList.toggle("show");
    arrowDown.style.visibility = visible ? "visible" : "hidden";
    body.style.overflow = visible ? "auto" : "hidden";
    visible ? disableScrollingOnIOS() : enableScrollingOnIOS();
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

  window.addEventListener("resize", checkWindowSize);

  // To check the window size when the script loads
  checkWindowSize();
})();
