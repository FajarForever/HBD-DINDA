
const $ = (s) => document.querySelector(s);

// OPEN ENVELOPE + MUSIC
const envelope = $("#envelope");
const openEnvelope = $("#openEnvelope");
const tapHint = $("#tapHint");
const song = $("#song");
const musicBtn = $("#musicBtn");
const musicLabel = $("#musicLabel");
let envelopeOpened = false;

async function playMusic() {
  try {
    await song.play();
    musicLabel.textContent = "Pause our song";
  } catch (error) {
    musicLabel.textContent = "Play our song";
  }
}

function pauseMusic() {
  song.pause();
  musicLabel.textContent = "Play our song";
}

openEnvelope.addEventListener("click", () => {
  if (envelopeOpened) return;
  envelopeOpened = true;

  envelope.classList.add("open");
  tapHint.textContent = "A LITTLE SURPRISE FOR YOU ♡";
  openEnvelope.disabled = true;

  // Browser biasanya mengizinkan musik setelah klik pengguna.
  playMusic();

  setTimeout(() => {
    $("#greeting").scrollIntoView({ behavior: "smooth" });
  }, 1100);
});

musicBtn.addEventListener("click", () => {
  if (song.paused) playMusic();
  else pauseMusic();
});

// REVEAL SECTIONS
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: "translateY(22px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 750, easing: "ease-out", fill: "both" }
      );
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section > *, .letter-paper").forEach((el) => {
  revealObserver.observe(el);
});

// PHOTO LIGHTBOX
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");

document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    lightboxImg.src = card.dataset.photo;
    lightbox.classList.add("show");
  });
});

function closeLightbox() {
  lightbox.classList.remove("show");
  lightboxImg.src = "";
}

$("#closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// SECRET MESSAGE
$("#secretBtn").addEventListener("click", () => {
  const message = $("#secretMessage");
  const isOpening = message.hidden;

  message.hidden = !isOpening;
  $("#secretBtn").textContent = isOpening
    ? "Close your surprise ↑"
    : "Open your surprise ↗";

  if (isOpening) {
    launchConfetti(90);
    setTimeout(() => {
      message.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }
});

// FLOATING HEARTS
const hearts = $("#hearts");

function createHeart() {
  if (document.hidden) return;

  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (12 + Math.random() * 17) + "px";
  heart.style.animationDuration = (7 + Math.random() * 6) + "s";
  hearts.appendChild(heart);

  heart.addEventListener("animationend", () => heart.remove());
}

setInterval(createHeart, 1300);

// CONFETTI
function launchConfetti(amount = 120) {
  const symbols = ["♥", "✦", "●", "◆"];
  const colors = ["#762d3c", "#c17a8a", "#c4a36a", "#f2d9b8", "#fffaf2"];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.color = colors[Math.floor(Math.random() * colors.length)];
    piece.style.fontSize = (8 + Math.random() * 12) + "px";
    piece.style.animationDuration = (2.5 + Math.random() * 3) + "s";
    piece.style.animationDelay = Math.random() * 0.5 + "s";
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

$("#confettiBtn").addEventListener("click", () => launchConfetti(180));
