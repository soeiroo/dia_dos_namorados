document.addEventListener("DOMContentLoaded", () => {
  // Hello Kitty SVGs
  const addHelloKittySVGs = () => {
    const svgPaths = [
      "src/images/hello-kitty-1.svg",
      "src/images/hello-kitty-2.svg",
      "src/images/hello-kitty-3.svg",
      "src/images/hello-kitty-4.svg",
      "src/images/hello-kitty-5.svg"
    ];

    // Adicionar SVGs nos quatro cantos
    const corners = [
      { left: '5vw', top: '5vh' },
      { left: '5vw', top: '90vh' },
      { left: '90vw', top: '5vh' },
      { left: '90vw', top: '90vh' }
    ];

    corners.forEach((position, index) => {
      const svg = document.createElement("img");
      svg.classList.add("hello-kitty-svg");
      svg.classList.add("corner-kitty");
      svg.src = svgPaths[index % svgPaths.length];
      svg.style.left = position.left;
      svg.style.top = position.top;
      svg.style.transform = `rotate(${Math.random() * 30 - 15}deg) scale(${0.8 + Math.random() * 0.4})`;
      svg.style.opacity = 0.5 + Math.random() * 0.3;
      svg.style.zIndex = "1";
      document.body.appendChild(svg);
    });

    // Adicionar SVGs nas bordas laterais
    for (let i = 0; i < 6; i++) {
      const svg = document.createElement("img");
      svg.classList.add("hello-kitty-svg");
      svg.src = svgPaths[Math.floor(Math.random() * svgPaths.length)];

      // Determinar se fica na esquerda ou direita
      const isLeft = i % 2 === 0;

      // Posicionar nas laterais com pequena variação
      svg.style.left = isLeft ? `${Math.random() * 10}vw` : `${90 + Math.random() * 10}vw`;
      svg.style.top = `${10 + Math.random() * 80}vh`; // Distribuir verticalmente

      svg.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.6 + Math.random() * 0.8})`;
      svg.style.opacity = 0.5 + Math.random() * 0.3;
      document.body.appendChild(svg);
    }

    // Adicionar alguns SVGs nas bordas superior e inferior
    for (let i = 0; i < 8; i++) {
      const svg = document.createElement("img");
      svg.classList.add("hello-kitty-svg");
      svg.src = svgPaths[Math.floor(Math.random() * svgPaths.length)];

      // Determinar se fica em cima ou embaixo
      const isTop = i % 2 === 0;

      // Posicionar nas bordas superior e inferior
      svg.style.top = isTop ? `${Math.random() * 15}vh` : `${85 + Math.random() * 15}vh`;
      svg.style.left = `${10 + Math.random() * 80}vw`; // Distribuir horizontalmente

      svg.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.6 + Math.random() * 0.8})`;
      svg.style.opacity = 0.5 + Math.random() * 0.3;
      document.body.appendChild(svg);
    }
  };

  addHelloKittySVGs();

  // Pétalas
  const petalasBg = document.querySelector(".petalas-bg");
  const numPetalas = 12;
  const petalaImg = "src/images/icons8-flor-de-spa-40.png";

  for (let i = 0; i < numPetalas; i++) {
    const petala = document.createElement("img");
    petala.classList.add("petala");
    petala.src = petalaImg;
    petala.style.left = `calc(${Math.random() * 100}vw - 16px)`;
    petala.style.animationDelay = Math.random() * 8 + "s"; // mais lento
    petala.style.animationDuration = 8 + Math.random() * 4 + "s"; // mais lento
    petala.style.opacity = 0.7 + Math.random() * 0.3;
    petala.style.transform = `rotate(${Math.random() * 360}deg) scale(${
      0.7 + Math.random() * 0.8
    })`;
    petalasBg.appendChild(petala);
  }

  // Emojis caindo
  const emojisBg = document.querySelector(".emojis-bg");
  const emojis = ["💜", "🦕"];
  const numEmojis = 8;

  for (let i = 0; i < numEmojis; i++) {
    const emoji = document.createElement("span");
    emoji.classList.add("emoji-fall");
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDelay = Math.random() * 8 + "s"; // mais lento
    emoji.style.animationDuration = 8 + Math.random() * 4 + "s"; // mais lento
    emoji.style.opacity = 0.7 + Math.random() * 0.3;
    emoji.style.fontSize = 1.5 + Math.random() * 1.5 + "rem";
    emojisBg.appendChild(emoji);
  }

  // Carrossel (mantém igual)
  const imgs = document.querySelectorAll(".card-img");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let current = 0;

  function showImg(idx) {
    imgs.forEach((img, i) => {
      img.classList.toggle("active", i === idx);
    });
  }
  showImg(current);

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + imgs.length) % imgs.length;
    showImg(current);
  });
  nextBtn.addEventListener("click", () => {
    current = (current + 1) % imgs.length;
    showImg(current);
  });

  // --- PLAYER DE MÚSICA COM PLAYLIST ---
  const playlist = [
    {
      src: "src/musics/sure-thing.mp3",
      title: "Sure Thing - Miguel",
    },
    {
      src: "src/musics/Disfruto.mp3",
      title: "Disfruto",
    },
    {
      src: "src/musics/Infinity.mp3",
      title: "Infinity",
    },
    {
      src: "src/musics/Astronauta.mp3",
      title: "Astronauta",
    },
    {
      src: "src/musics/Sugar.mp3",
      title: "Sugar - Maroon 5",
    },
    // Adicione mais músicas aqui
  ];

  let currentTrack = 0;

  const audio = document.getElementById("audio");
  const prevTrackBtn = document.getElementById("prevTrackBtn");
  const nextTrackBtn = document.getElementById("nextTrackBtn");
  const muteBtn = document.getElementById("muteBtn");
  const muteIcon = document.getElementById("muteIcon");

  function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    audio.load();
    audio.muted = false;
    muteIcon.src = "src/images/on-audio.png";
    muteIcon.alt = "Áudio ligado";
  }

  prevTrackBtn.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
  });

  nextTrackBtn.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
  });

  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    if (audio.muted) {
      muteIcon.src = "src/images/no-audio.png";
      muteIcon.alt = "Áudio desligado";
    } else {
      muteIcon.src = "src/images/on-audio.png";
      muteIcon.alt = "Áudio ligado";
    }
  });

  audio.addEventListener("ended", () => {
    nextTrackBtn.click();
  });

  // Inicializa o player com a primeira música e tenta tocar automaticamente
  loadTrack(currentTrack);
  audio.play();
  audio.volume = 0.5;
  document.body.addEventListener("click", () => {
    if (audio.paused) audio.play();
  }, { once: true });
});
