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

    window.addEventListener("mousemove", event => {

      cursorGlow.style.transform =
        `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

    });

  }


  /* ==========================================
     CERTIFICATIONS VIEW MORE / SHOW LESS
  ========================================== */

  const certToggle =
    document.getElementById("certToggle");

  const extraCerts =
    document.querySelectorAll(".cert-extra");


  if (certToggle && extraCerts.length > 0) {

    let certificationsExpanded = false;


    certToggle.addEventListener("click", () => {

      certificationsExpanded =
        !certificationsExpanded;


      extraCerts.forEach(card => {

        card.classList.toggle(
          "show",
          certificationsExpanded
        );

      });


      certToggle.textContent =
        certificationsExpanded
          ? "SHOW LESS CERTIFICATIONS"
          : "VIEW MORE CERTIFICATIONS";


      certToggle.setAttribute(
        "aria-expanded",
        certificationsExpanded.toString()
      );


      /*
       * When collapsing, smoothly return to
       * the beginning of the certifications section.
       */

      if (!certificationsExpanded) {

        const certificationsSection =
          document.getElementById("certifications");

        if (certificationsSection) {

          certificationsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }

    });

  }


  /* ==========================================
     SCROLL REVEALS
  ========================================== */

  /*
   * Do NOT include .cert-card here.
   *
   * Hidden cert-extra cards use display:none,
   * so keeping certification cards out of the
   * reveal observer avoids conflicts with the
   * View More button.
   */

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