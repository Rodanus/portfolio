gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({ defaults: { duration: 1, opacity: 0 } });

tl.to(".loading", {
  width: "80%",
  height: "80%",
  onComplete: () => {
    // Make sure that div.loading is hidden so that nav links are clickable again.
    const loading = document.querySelector(".loading");

    loading.style.visibility = "hidden";
  },
  y: "-100%",
  delay: 3
})

  .from(".greetings-heading", {
    xPercent: "-100"
  })

  .from(".skills-logos-design", {
    xPercent: "+100"
  })

  .from(".header", {
    y: "-100",
    delay: 0.2
  })
  .from(".arrow-down-con", {
    y: "-100%",
    ease: "power.in"
    // onComplete: () => {
    //   document.querySelector("body").style.overflow = "visible";
    // }
  });

gsap.from(".about-info-con", {
  scrollTrigger: {
    trigger: ".about",
    start: "top center"
    // markers: true
  },
  duration: 1.5,
  opacity: 0
});

gsap.from(".skill-logo", {
  scrollTrigger: {
    trigger: ".skills",
    // markers: true,
    start: "top center"
  },
  duration: 1,
  opacity: 0,
  stagger: 0.4
});

const endOfPageTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".projects",
    // markers: { startColor: "blue", endColor: "yellow" },
    start: "top center"
  }
});

endOfPageTl
  .from(".project", {
    duration: 1,
    scale: 0.9,
    opacity: 0,
    stagger: 0.8
  })
  .from(".contact-email", {
    duration: 1,
    opacity: 0
  })
  .from(".footer-link", {
    duration: 1,
    opacity: 0,
    stagger: 0.6
  });
