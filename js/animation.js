gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({ defaults: { duration: 1, autoAlpha: 0 } });

tl.to(".loading", {
  y: "-100%",
  delay: 3,
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
    duration: 2
  })
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
    stagger: 0.8
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
