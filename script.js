document.addEventListener("DOMContentLoaded", () => {

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finePointer =
    window.matchMedia("(pointer: fine)").matches;


  /* ==========================================
     CURSOR GLOW
  ========================================== */

  const cursorGlow =
    document.querySelector(".cursor-glow");

  if (cursorGlow && finePointer && !reduceMotion) {

    window.addEventListener(
      "mousemove",
      event => {

        cursorGlow.style.transform =
          `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

      },
      { passive: true }
    );

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

      if (!certificationsExpanded) {

        const certificationsSection =
          document.getElementById("certifications");

        if (certificationsSection) {

          certificationsSection.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start"
          });

        }

      }

    });

  }


  /* ==========================================
     REVEAL ANIMATIONS
  ========================================== */

  const revealTargets =
    document.querySelectorAll(
      ".system-card, .mission-entry, .build-card, .stack-terminal, .education-panel, .contact-node, .about-layout, .profile-metrics, .featured-project, .case-section"
    );

  if (
    reduceMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealTargets.forEach(element => {
      element.classList.add("visible");
    });

  } else {

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
          threshold: 0.08
        }
      );

    revealTargets.forEach(element => {
      observer.observe(element);
    });

  }


  /* ==========================================
     SMOOTH INTERNAL NAVIGATION
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
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });

      history.replaceState(
        null,
        "",
        href
      );

    });

  });


  /* ==========================================
     HERO PARALLAX
  ========================================== */

  const heroVisual =
    document.querySelector(".hero-visual");

  if (
    heroVisual &&
    finePointer &&
    !reduceMotion
  ) {

    window.addEventListener(
      "mousemove",
      event => {

        if (window.innerWidth < 900) {
          return;
        }

        const x =
          (event.clientX / window.innerWidth - 0.5) * 7;

        const y =
          (event.clientY / window.innerHeight - 0.5) * 7;

        heroVisual.style.transform =
          `translate3d(${x}px, ${y}px, 0)`;

      },
      { passive: true }
    );

    window.addEventListener("mouseleave", () => {

      heroVisual.style.transform =
        "translate3d(0,0,0)";

    });

  }


  /* ==========================================
     SCROLL PROGRESS + BACK TO TOP
  ========================================== */

  const progressBar =
    document.querySelector(".scroll-progress span");

  const backToTop =
    document.getElementById("backToTop");

  const updateScrollUI = () => {

    const scrollTop =
      window.scrollY;

    const maxScroll =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      maxScroll > 0
        ? scrollTop / maxScroll
        : 0;

    if (progressBar) {

      progressBar.style.transform =
        `scaleX(${progress})`;

    }

    if (backToTop) {

      backToTop.classList.toggle(
        "show",
        scrollTop > 700
      );

    }

  };

  updateScrollUI();

  window.addEventListener(
    "scroll",
    updateScrollUI,
    { passive: true }
  );

  if (backToTop) {

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });

    });

  }


  /* ==========================================
     ACTIVE NAV SECTION
  ========================================== */

  const navLinks =
    Array.from(
      document.querySelectorAll(
        ".nav-links a[href^='#']"
      )
    );

  const navSections =
    navLinks
      .map(link => {

        const id =
          link.getAttribute("href");

        return id
          ? document.querySelector(id)
          : null;

      })
      .filter(Boolean);

  if (
    navLinks.length &&
    navSections.length &&
    "IntersectionObserver" in window
  ) {

    const navObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            navLinks.forEach(link => {

              link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                  `#${entry.target.id}`
              );

            });

          });

        },
        {
          rootMargin: "-35% 0px -55% 0px",
          threshold: 0
        }
      );

    navSections.forEach(section => {
      navObserver.observe(section);
    });

  }

});
