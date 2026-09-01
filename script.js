<script>
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
     ACCORDIONS
  ========================================== */

  const accordions = document.querySelectorAll(".accordion");

  function openAccordion(acc) {
    const body = acc.querySelector(".accordion-body");

    if (!body) return;

    acc.classList.add("open");

    body.style.maxHeight = body.scrollHeight + "px";
    body.style.opacity = "1";
    body.style.transform = "translateY(0)";
  }


  function closeAccordion(acc) {
    const body = acc.querySelector(".accordion-body");

    if (!body) return;

    acc.classList.remove("open");

    body.style.maxHeight = "0px";
    body.style.opacity = "0";
    body.style.transform = "translateY(-4px)";
  }


  /* Start ALL accordions closed */

  accordions.forEach(acc => {

    const body = acc.querySelector(".accordion-body");

    if (!body) return;

    body.style.maxHeight = "0px";
    body.style.opacity = "0";
    body.style.transform = "translateY(-4px)";

  });


  /*
     IMPORTANT:
     We removed:

     openAccordionById("about");

     So About will NOT automatically open.
  */


  /* ==========================================
     ACCORDION CLICK
  ========================================== */

  accordions.forEach(acc => {

    const header = acc.querySelector(".accordion-header");

    if (!header) return;


    header.addEventListener("click", () => {

      const isOpen =
        acc.classList.contains("open");


      if (isOpen) {

        closeAccordion(acc);

      } else {

        /* Close other accordions */

        accordions.forEach(other => {

          if (other !== acc) {
            closeAccordion(other);
          }

        });


        /* Open selected accordion */

        openAccordion(acc);

      }

    });

  });


  /* ==========================================
     NAVIGATION LINKS
  ========================================== */

  /*
     This works with BOTH:

     .nav .links

     and your newer:

     .navbar .nav-links
  */

  const navLinks = document.querySelectorAll(
    ".nav .links a[href^='#'], .navbar .nav-links a[href^='#']"
  );


  navLinks.forEach(link => {

    link.addEventListener("click", e => {

      e.preventDefault();


      const id =
        link
          .getAttribute("href")
          .substring(1);


      const target =
        document.getElementById(id);


      if (!target) return;


      /*
        Open accordion first if the section
        is an accordion.
      */

      const acc =
        target.classList.contains("accordion")
          ? target
          : target.closest(".accordion");


      if (acc) {

        accordions.forEach(other => {

          if (other !== acc) {
            closeAccordion(other);
          }

        });

        openAccordion(acc);

      }


      /*
        Then smoothly scroll to the section.
      */

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* ==========================================
     HERO PARALLAX
  ========================================== */

  const hero =
    document.querySelector(".hero");


  if (hero) {

    const strength = 0.04;


    hero.addEventListener("mousemove", e => {

      const rect =
        hero.getBoundingClientRect();


      const x =
        e.clientX -
        rect.left -
        rect.width / 2;


      const y =
        e.clientY -
        rect.top -
        rect.height / 2;


      hero.style.setProperty(
        "--bg-x",
        `${-x * strength}px`
      );


      hero.style.setProperty(
        "--bg-y",
        `${-y * strength}px`
      );

    });


    hero.addEventListener("mouseleave", () => {

      hero.style.setProperty(
        "--bg-x",
        "0px"
      );

      hero.style.setProperty(
        "--bg-y",
        "0px"
      );

    });

  }


  /* ==========================================
     BUBBLE PARTICLE BACKGROUND
  ========================================== */

  const canvas =
    document.getElementById("bubbles-canvas");


  if (canvas) {

    const ctx =
      canvas.getContext("2d");


    function resizeCanvas() {

      canvas.width =
        window.innerWidth;

      canvas.height =
        window.innerHeight;

    }


    resizeCanvas();


    window.addEventListener(
      "resize",
      resizeCanvas
    );


    const BUBBLE_COUNT = 90;


    const bubbles =
      Array.from(
        { length: BUBBLE_COUNT },
        () => ({

          x:
            Math.random() *
            canvas.width,

          y:
            Math.random() *
            canvas.height,

          r:
            Math.random() *
            2 + 1,

          vx:
            (Math.random() - 0.5) *
            0.25,

          vy:
            (Math.random() - 0.5) *
            0.25,

          alpha:
            Math.random() *
            0.5 + 0.3

        })
      );


    function animateBubbles() {

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      bubbles.forEach(b => {

        ctx.beginPath();

        ctx.arc(
          b.x,
          b.y,
          b.r,
          0,
          Math.PI * 2
        );


        ctx.fillStyle =
          `rgba(120,180,255,${b.alpha})`;


        ctx.fill();


        b.x += b.vx;
        b.y += b.vy;


        /* Wrap around screen */

        if (b.x < -5) {
          b.x = canvas.width + 5;
        }

        if (b.x > canvas.width + 5) {
          b.x = -5;
        }

        if (b.y < -5) {
          b.y = canvas.height + 5;
        }

        if (b.y > canvas.height + 5) {
          b.y = -5;
        }

      });


      requestAnimationFrame(
        animateBubbles
      );

    }


    animateBubbles();

  }


  /* ==========================================
     FINAL TOP RESET
  ========================================== */

  requestAnimationFrame(() => {

    window.scrollTo(0, 0);

  });

});
</script>
