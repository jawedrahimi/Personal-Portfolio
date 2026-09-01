document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     ALWAYS START AT TOP
  ========================================== */

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  if (window.location.hash) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }

  window.scrollTo(0, 0);


  /* ==========================================
     CURSOR GLOW
  ========================================== */

  const cursorGlow =
    document.querySelector(".cursor-glow");

  if (cursorGlow) {

    window.addEventListener("mousemove", (event) => {

      cursorGlow.style.transform =
        `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

    });

  }


  /* ==========================================
     SCROLL REVEALS
  ========================================== */

  const revealTargets =
    document.querySelectorAll(
      ".system-card, .mission-entry, .build-card, .stack-terminal, .education-panel, .contact-node, .about-layout, .profile-metrics"
    );


  revealTargets.forEach(element => {
    element.classList.add("reveal");
  });


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealTargets.forEach(element => {
    observer.observe(element);
  });


  /* ==========================================
     NAVIGATION
  ========================================== */

  const internalLinks =
    document.querySelectorAll('a[href^="#"]');


  internalLinks.forEach(link => {

    link.addEventListener("click", event => {

      const href =
        link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target =
        document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* ==========================================
     HERO PARALLAX
  ========================================== */

  const heroVisual =
    document.querySelector(".hero-visual");


  if (heroVisual) {

    window.addEventListener("mousemove", event => {

      if (window.innerWidth < 900) {
        return;
      }

      const x =
        (event.clientX / window.innerWidth - 0.5) * 8;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 8;


      heroVisual.style.transform =
        `translate3d(${x}px, ${y}px, 0)`;

    });


    window.addEventListener("mouseleave", () => {

      heroVisual.style.transform =
        "translate3d(0,0,0)";

    });

  }


  /* ==========================================
     FINAL TOP RESET
  ========================================== */

  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
  });

});