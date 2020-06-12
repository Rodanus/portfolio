(function () {
  const body = document.querySelector("body"),
    navMenu = document.querySelector(".nav-list"),
    arrowDown = document.querySelector(".arrow-down-con");

  let visible = false,
    width = window.innerWidth > 0 ? window.innerWidth : screen.width;

  function checkWindowSize() {
    width = window.innerWidth > 0 ? window.innerWidth : screen.width;
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
    if (width < 1200) {
      navMenu.classList.toggle("show");
      arrowDown.classList.toggle("vis-hidden");
      body.classList.toggle("overf-hidden");
      visible ? disableScrollingOnIOS() : enableScrollingOnIOS();
      visible = !visible;
    }
  }

  /*
   * To make sure navbar is displayed correctly on IOS devices
   * Credits:
   * https://medium.com/@susiekim9/how-to-compensate-for-the-ios-viewport-unit-bug-46e78d54af0d
   * https://stackoverflow.com/questions/43575363/css-100vh-is-too-tall-on-mobile-due-to-browser-ui
   */
  function resetHeight() {
    // Change the body height to match the inner height of the browser
    document.body.style.height = window.innerHeight;
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

  window.addEventListener("resize", () => {
    checkWindowSize();

    // Reset the height whenever the user resizes the window
    resetHeight();
  });

  // To check the window size when the script loads
  checkWindowSize();

  // To set the page height when it first loads.
  resetHeight();
})();
