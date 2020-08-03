// Disable scrolling when playing the animation
// https://stackoverflow.com/a/4770179/12993793

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      }
    })
  );
} catch (e) {}

let wheelOpt = supportsPassive ? { passive: false } : false,
  wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

disableScroll();

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({ defaults: { duration: 1, autoAlpha: 0 } });

tl.to(".loading", {
  y: "-100%",
  delay: 3,
  onComplete: () => {
    // Make sure that div.loading is hidden so that nav links are clickable again.
    const loading = document.querySelector(".loading");

    loading.style.visibility = "hidden";

    enableScroll();
  }
})

  .from(".greetings-heading", {
    xPercent: "-100"
  })

  .from(".skills-logos-design", {})
  .from(".header", {})
  .from(".arrow-down-con", {
    y: "-100%",
    ease: "power.in"
  });

gsap.from(".about-info-con", {
  scrollTrigger: {
    trigger: ".about",
    start: "top center"
  },
  duration: 1.5,
  autoAlpha: 0
});

gsap.from(".skill-logo", {
  scrollTrigger: {
    trigger: ".skills",
    start: "top center"
  },
  duration: 1,
  autoAlpha: 0,
  stagger: 0.4
});

const endOfPageTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".projects",
    start: "top center"
  }
});

endOfPageTl
  .from(".project", {
    duration: 1,
    scale: 0.9,
    autoAlpha: 0,
    stagger: 0.6
  })
  .from(".contact-email", {
    duration: 1,
    autoAlpha: 0
  })
  .from(".footer-link", {
    duration: 1,
    autoAlpha: 0,
    stagger: 0.6
  });
