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

const showOverlayAnimation = () => {
  gsap.to(".overlay", {
    onStart: () => {
      showOrHideOverlay();
    },
    autoAlpha: 1
  });
};

const hideOverlayAnimation = () => {
  gsap.to(".overlay", {
    autoAlpha: 0,
    onComplete: () => {
      showOrHideOverlay();
    }
  });
};

const showNavAnimation = () => {
  // Check whether it is a desktop or mobile device.
  const x = width >= 1200 ? 0 : "-50%";

  gsap
    .timeline({ defaults: { duration: 0.8 } })
    .to(".nav", {
      ease: "power4",
      onStart: () => {
        showOverlayAnimation();
        toggleScrolling();
        showOrHideNav();
      },
      x
    })
    .from(
      ".close-button",
      {
        ease: "power4.in",
        autoAlpha: 0
      },
      "-=1"
    )
    .from(
      ".nav-list",
      {
        ease: "power4.in",
        autoAlpha: 0
      },
      "-=1"
    )
    .from(
      ".nav-social-links-con",
      {
        ease: "power4.in",
        autoAlpha: 0
      },
      "-=1"
    );
};

const hideNavAnimation = () => {
  gsap.to(".nav", {
    duration: 1,
    ease: "power4",
    x: "100%",
    onStart: () => {
      hideOverlayAnimation();
      toggleScrolling();
    },
    onComplete: () => {
      // TODO: make sure that you enable scrolling before navbar is hidden.
      showOrHideNav();
    }
  });
};

document.addEventListener("click", e => {
  const elementClassList = e.target.classList;

  if (elementClassList.contains("menu-button-img")) {
    showNavAnimation();
  } else if (
    elementClassList.contains("close-button-img") ||
    elementClassList.contains("nav-link-content") ||
    elementClassList.contains("overlay")
  ) {
    hideNavAnimation();
  }
});

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
  defaults: { duration: 1, stagger: 0.6 },
  scrollTrigger: {
    trigger: ".projects",
    start: "top center"
  }
});

endOfPageTl
  .from(".project", {
    scale: 0.9,
    autoAlpha: 0
  })
  .from(".resume-link", {
    duration: 0.4,
    autoAlpha: 0
  })
  .from(".contact-email", {
    duration: 0.4,
    autoAlpha: 0
  })
  .from(".footer-link", {
    autoAlpha: 0
  });
