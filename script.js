/* ========================= */
/*  BUBBLE PARTICLE BACKGROUND */
/* ========================= */

const canvas = document.getElementById("bubbles-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Number of bubbles
const BUBBLE_COUNT = 90;

// Bubble objects
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

    // Wrap around edges
    if (b.x < -5) b.x = canvas.width + 5;
    if (b.x > canvas.width + 5) b.x = -5;
    if (b.y < -5) b.y = canvas.height + 5;
    if (b.y > canvas.height + 5) b.y = -5;
  });

  requestAnimationFrame(animateBubbles);
}

animateBubbles();
