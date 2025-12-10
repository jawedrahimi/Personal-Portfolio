<script>
  document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordion");

    /* ========================= */
    /*  ACCORDION LOGIC (TOGGLE) */
    /* ========================= */

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

    function openAccordionById(id) {
      const acc = document.getElementById(id);
      if (!acc || !acc.classList.contains("accordion")) return;
      openAccordion(acc);
    }

    // init all bodies closed
    accordions.forEach(acc => {
      const body = acc.querySelector(".accordion-body");
      if (body) {
        body.style.maxHeight = "0px";
        body.style.opacity = "0";
        body.style.transform = "translateY(-4px)";
      }
    });

    // open About by default (remove this line if you want all closed initially)
    openAccordionById("about");

    // header click: toggle this accordion, close others
    accordions.forEach(acc => {
      const header = acc.querySelector(".accordion-header");
      if (!header) return;

      header.addEventListener("click", () => {
        const isOpen = acc.classList.contains("open");

        if (isOpen) {
          // CLOSE this one
          closeAccordion(acc);
        } else {
          // OPEN this one and CLOSE others
          accordions.forEach(other => {
            if (other !== acc) closeAccordion(other);
          });
          openAccordion(acc);
        }
      });
    });

    // nav click: scroll + open
    const navLinks = document.querySelectorAll(".nav .links a[href^='#']");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.getAttribute("href").substring(1);
        const target = document.getElementById(id);
        if (!target) return;

        target.scrollIntoView({ behavior: "smooth", block: "start" });

        const acc = target.classList.contains("accordion")
          ? target
          : target.closest(".accordion");

        if (acc) {
          accordions.forEach(other => {
            if (other !== acc) closeAccordion(other);
          });
          openAccordion(acc);
        }
      });
    });

    /* ========================= */
    /*  HERO PARALLAX            */
    /* ========================= */

    const hero = document.querySelector(".hero");
    if (hero) {
      const strength = 0.04;
      hero.addEventListener("mousemove", (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        hero.style.setProperty("--bg-x", `${-x * strength}px`);
        hero.style.setProperty("--bg-y", `${-y * strength}px`);
      });
      hero.addEventListener("mouseleave", () => {
        hero.style.setProperty("--bg-x", "0px");
        hero.style.setProperty("--bg-y", "0px");
      });
    }

    /* ========================= */
    /*  BUBBLE PARTICLE BACKGROUND */
    /* ========================= */

    const canvas = document.getElementById("bubbles-canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");

      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      const BUBBLE_COUNT = 90;

      let bubbles = Array.from({ length: BUBBLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1.0,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.3
      }));

      function animateBubbles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bubbles.forEach(b => {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120,180,255,${b.alpha})`;
          ctx.fill();

          b.x += b.vx;
          b.y += b.vy;

          // wrap around
          if (b.x < -5) b.x = canvas.width + 5;
          if (b.x > canvas.width + 5) b.x = -5;
          if (b.y < -5) b.y = canvas.height + 5;
          if (b.y > canvas.height + 5) b.y = -5;
        });

        requestAnimationFrame(animateBubbles);
      }

      animateBubbles();
    }
  });
</script>
