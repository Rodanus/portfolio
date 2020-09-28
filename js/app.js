const body = document.querySelector("body"),
  navMenu = document.querySelector(".nav"),
  arrowDown = document.querySelector(".arrow-down-con");

let visible = false,
  overlay = null,
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

function addOverlayOnDesktop() {
  if (width >= 1200 && !overlay) {
    const newOverlay = document.createElement("div"),
      firstScriptInBody = document.querySelector("script"); // So I can add the overlay before it.
    newOverlay.classList.add("overlay");
    document.body.insertBefore(newOverlay, firstScriptInBody);
    overlay = newOverlay;
  }
}

function showOrHideNav() {
  navMenu.classList.toggle("show");
  overlay ? overlay.classList.toggle("show") : null;
  arrowDown.classList.toggle("vis-hidden");
  body.classList.toggle("overf-hidden");
  visible ? disableScrollingOnIOS() : enableScrollingOnIOS();
  visible = !visible;
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

window.addEventListener("resize", () => {
  checkWindowSize();

  // Reset the height whenever the user resizes the window
  resetHeight();
});

// To check the window size when the script loads
checkWindowSize();

// To set the page height when it first loads.
resetHeight();

// Add overlay when opening the navbar on desktop.
addOverlayOnDesktop();
