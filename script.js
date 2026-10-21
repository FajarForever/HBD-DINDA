
document.addEventListener("DOMContentLoaded", () => {
  // Animasi amplop pada halaman pembuka
  const openButton = document.getElementById("openEnvelope");

  if (openButton) {
    openButton.addEventListener("click", () => {
      if (openButton.disabled) return;

      openButton.disabled = true;

      const envelope = openButton.querySelector(".envelope");
      envelope.classList.add("open");

      const hint = document.querySelector(".tap-hint");
      if (hint) hint.textContent = "Ada surat buat kamu... 💗";

      // Berpindah ke halaman surat
      setTimeout(() => {
        window.location.href = "surat.html";
      }, 1200);
    });
  }

  // Hiasan hati melayang
  const heartContainer = document.querySelector(".floating-hearts");

  if (heartContainer) {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {
      function createHeart() {
        const heart = document.createElement("span");
        heart.className = "heart-particle";
        heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = 12 + Math.random() * 18 + "px";
        heart.style.animationDuration = 7 + Math.random() * 7 + "s";

        heartContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 15000);
      }

      for (let i = 0; i < 9; i++) {
        setTimeout(createHeart, i * 300);
      }

      setInterval(createHeart, 900);
    }
  }
});
