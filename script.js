/* -------------------- Floating Hearts -------------------- */
const heartsContainer = document.getElementById("hearts");
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart-float";
  const heartEmojis = ["💖", "❤️", "💘", "💝", "💕"];
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 4 + "s";
  heart.style.fontSize = 14 + Math.random() * 20 + "px";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}, 400);

/* -------------------- Love Letter -------------------- */
let letterOpened = false, typingDone = false;
const letterText = `My love,

From the moment you came into my life, everything changed for the better.
You make my days brighter, my heart lighter, and my smile wider.

Thank you for being my Valentine and my favorite person.
I love you more than words can say ❤️`;

function toggleLetter() {
  const letter = document.getElementById("letter");
  const icon = document.getElementById("folderIcon");
  letterOpened = !letterOpened;
  letter.style.display = letterOpened ? "block" : "none";
  icon.textContent = letterOpened ? "📂" : "📁";
  if (letterOpened && !typingDone) {
    typeLetter();
    typingDone = true;
  }
}

function typeLetter() {
  const target = document.getElementById("typedText");
  let i = 0;
  function type() {
    if (i < letterText.length) {
      target.textContent += letterText.charAt(i);
      i++;
      setTimeout(type, 35);
    }
  }
  type();
}

/* -------------------- No Button -------------------- */
function moveNo() {
  const noBtn = document.getElementById("noBtn");
  const card = document.querySelector(".card");
  const maxX = card.clientWidth - noBtn.offsetWidth;
  const maxY = card.clientHeight - noBtn.offsetHeight;
  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
}

/* -------------------- Confetti Hearts -------------------- */
function createConfettiHearts() {
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti-heart";
    const heartEmojis = ["💖", "❤️", "💘", "💝", "💕"];
    confetti.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    confetti.style.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
    const rect = document.getElementById("yesBtn").getBoundingClientRect();
    confetti.style.left = rect.left + rect.width / 2 + "px";
    confetti.style.top = rect.top + rect.height / 2 + "px";
    confetti.style.setProperty("--x", (Math.random() - 0.5) * 200 + "px");
    confetti.style.setProperty("--y", -(Math.random() * 200 + 100) + "px");
    document.body.appendChild(confetti);
    confetti.addEventListener("animationend", () => confetti.remove());
  }
}

/* -------------------- Change Image -------------------- */
function changeImage(e) {
  document.getElementById("valentineImage").src = URL.createObjectURL(e.target.files[0]);
}

/* -------------------- YouTube Player -------------------- */
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtubePlayer', {
    height: '0',
    width: '0',
    videoId: 'Z6nzdtuHi0Y', // Lia by Zild
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: 'Z6nzdtuHi0Y',
      controls: 0,
      mute: 1
    },
    events: {
      onReady: (event) => {
        player.mute(); // autoplay muted
        player.playVideo();
      }
    }
  });
}

/* -------------------- Music Toggle -------------------- */
const musicToggle = document.getElementById("musicToggle");
musicToggle.onclick = () => {
  if (!player) return;
  const state = player.getPlayerState();
  if (state !== 1) { // if not playing
    player.unMute();
    player.playVideo();
    musicToggle.classList.remove("paused");
    musicToggle.classList.add("playing");
  } else { // if playing
    player.pauseVideo();
    musicToggle.classList.remove("playing");
    musicToggle.classList.add("paused");
  }
};

/* -------------------- Yes Button -------------------- */
function sayYes() {
  createConfettiHearts();
  document.getElementById("card").innerHTML = `
    <h1>I LOVE YOU JAIJAI!!! 💘</h1>
    <div class="heart">❤️❤️❤️</div>
    <div class="folder" onclick="toggleLetter()">
      <div id="folderIcon" class="folder-icon">📁</div>
      <div class="folder-title">Love Letter</div>
    </div>
    <div id="letter" class="letter">
      <div class="date">${new Date().toDateString()}</div>
      <div id="typedText"></div>
    </div>
  `;
  if (player) {
    player.unMute();
    player.playVideo();
    musicToggle.classList.remove("paused");
    musicToggle.classList.add("playing");
  }
}
