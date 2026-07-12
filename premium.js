
(() => {
  "use strict";

  const playlist = window.LovePlaylist;
  if (!playlist || !Array.isArray(playlist.tracks)) return;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const moodButtons = $$("#moodSelector [data-mood]");
  const moodResult = $("#moodResult");
  const moodResultIcon = moodResult?.querySelector(".mood-result-icon");
  const moodResultTitle = moodResult?.querySelector("strong");
  const moodResultText = moodResult?.querySelector("p");
  const moodPlayButton = $("#moodPlayButton");

  const constellationMap = $("#constellationMap");
  const constellationMessage = $("#constellationMessage");
  const memoryStars = $$(".memory-star");

  const dedicationTitle = $("#dedicationTitle");
  const dedicationText = $("#dedicationText");
  const heartReactionButton = $("#heartReactionButton");
  const openCinemaButton = $("#openCinemaButton");

  const mainVinyl = $("#musicArt");
  const stickyPlayer = $("#stickyLovePlayer");
  const stickyVinyl = $("#stickyVinyl");
  const stickyTitle = $("#stickyTitle");
  const stickyArtist = $("#stickyArtist");
  const stickyProgressBar = $("#stickyProgressBar");
  const stickyPrevious = $("#stickyPrevious");
  const stickyToggle = $("#stickyToggle");
  const stickyNext = $("#stickyNext");
  const stickyOpenCinema = $("#stickyOpenCinema");

  const cinema = $("#musicCinema");
  const cinemaClose = $("#cinemaClose");
  const cinemaTitle = $("#cinemaTitle");
  const cinemaArtist = $("#cinemaArtist");
  const cinemaWorldLabel = $("#cinemaWorldLabel");
  const cinemaDedication = $("#cinemaDedication");
  const cinemaVinyl = $("#cinemaVinyl");
  const cinemaToggle = $("#cinemaToggle");
  const cinemaPrevious = $("#cinemaPrevious");
  const cinemaNext = $("#cinemaNext");
  const cinemaSeek = $("#cinemaSeek");
  const cinemaCurrent = $("#cinemaCurrent");
  const cinemaDuration = $("#cinemaDuration");
  const cinemaReaction = $("#cinemaReaction");
  const heartbeatModeButton = $("#heartbeatModeButton");
  const privateCinemaToggle = $("#privateCinemaToggle");
  const cinemaParticles = $("#cinemaParticles");
  const memoryFrames = $$(".memory-frame");

  const holdHandButton = $("#holdHandButton");
  const holdHandMessage = $("#holdHandMessage");

  const secretLaunchButton = $("#secretLaunchButton");
  const secretChamber = $("#secretChamber");
  const secretClose = $("#secretClose");
  const playSecretSong = $("#playSecretSong");

  const finale = $("#loveFinale");
  const finaleStars = $("#finaleStars");
  const replayLoveStory = $("#replayLoveStory");
  const finaleKisses = $("#finaleKisses");
  const closeFinale = $("#closeFinale");

  const trackButtons = $$(".track-button");

  const STATE_KEY = "pondati-premium-music-state-v1";
  const worldClasses = [
    "world-sunrise",
    "world-lavender",
    "world-rain",
    "world-stars",
    "world-ocean",
    "world-rose",
    "world-gold"
  ];

  const worldNames = [
    "Golden sunrise world",
    "Lavender mist world",
    "Soft rain on glass",
    "Rose-coloured stars",
    "Ocean-light reflections",
    "Warm rose world",
    "Champagne-gold dawn"
  ];

  const moodDetails = {
    miss: {
      icon: "♡",
      title: "Let me sit beside your heart, maa",
      text: "These songs carry the feeling of missing someone so deeply that every melody becomes a hug.",
      tracks: [1, 5, 8, 9, 12, 14, 17, 21, 23, 28]
    },
    peace: {
      icon: "☁",
      title: "Breathe slowly with me, my baby",
      text: "Soft songs for a peaceful morning, like resting your head against me for a little while.",
      tracks: [2, 3, 6, 12, 13, 17, 20, 21, 24]
    },
    smile: {
      icon: "☀",
      title: "I want to see that beautiful smile",
      text: "Warm, playful songs chosen to brighten your face and make the morning feel lighter.",
      tracks: [4, 7, 10, 11, 16, 18, 22, 25, 26]
    },
    close: {
      icon: "∞",
      title: "Come a little closer to me, maa",
      text: "Songs that feel like holding hands, leaning closer, and forgetting the distance for a moment.",
      tracks: [0, 2, 8, 13, 15, 18, 19, 24, 27]
    },
    love: {
      icon: "♥",
      title: "You are deeply loved, my pondati",
      text: "These songs carry my promise that you are my happiness, my peace, and the person I choose every day.",
      tracks: [0, 1, 9, 14, 15, 19, 20, 27, 28]
    }
  };

  const dedications = [
    "I chose this because it feels like my heart calling you closer, maa, even when distance stands between us",
    "This song reminds me that wherever life takes us, my heart will always belong with you",
    "Come closer to my heart, maa. This is where you will always be safe, loved, and wanted",
    "My love for you is gentle and peaceful, yet it grows deeper inside me every single day",
    "This one is for your beautiful smile and the happiness you bring into even my quietest mornings",
    "Sometimes I cannot find the perfect words, so I let this song carry everything my heart wants to tell you",
    "Even when the world feels uncertain, one thing will never change: I will keep choosing you maa",
    "This song carries the playful happiness I feel whenever I imagine your smile and your little expressions",
    "You are the person my heart recognises in every crowd, every dream, and every tomorrow",
    "My life feels more complete because you are in it, maa. You are not beside me, but you are always within me",
    "This is for the little moments when I want to make you laugh, tease you gently, and watch your eyes light up",
    "Your eyes, your smile, and the way you make me feel safe are hidden inside every part of this melody",
    "I imagine the evening becoming quiet, the world slowing down, and the two of us simply being together",
    "Neeyum naanum, maa whatever happens, I want every chapter of my life to keep carrying both of us",
    "When I hear this, I imagine you beside me and wish I could hold you tightly without letting the moment end",
    "Vaa vaa en anbe—come close to me, maa. My heart has always kept a place only for you",
    "This song feels like your playful anger, your sweetness, and every little thing that makes you beautifully you",
    "Like marudaani leaving its colour behind, your love has coloured every part of my heart permanently",
    "You are the soft flower inside my life, maa, bringing gentleness to places that once felt empty",
    "This song is my simple confession: I love you, I need you, and I will always protect what we have",
    "Azhage—because that is what you are to me, not only in how you look but in the way your heart touches mine",
    "Neethanae, maa. At the end of every thought, every wish, and every future I imagine, it is still you",
    "This one carries the lightness of loving you the smiles, the teasing, and the happiness of calling you mine",
    "You are the light I search for when my day feels heavy, maa, and the warmth that guides my heart home",
    "You entered my heart so naturally that loving you now feels like breathing",
    "Please keep smiling, maa. Your happiness is one of the most precious things in my whole world",
    "Chellakuttiye—because sometimes one sweet name is enough to hold all the affection I feel for you",
    "When you look at me, maa, I want the whole world to become quiet so I can stay inside that moment",
    "Enadhuyire—you are not only someone I love; you are a part of the life inside my heart"
  ];

  const starMessages = [
    "5 June 2025—the date my heart began carrying our story differently",
    "Singapore may be where I stand, but my heart keeps travelling towards you",
    "Pondati—my favourite word because it means comfort, belonging, and forever",
    "Johor Bahru is not far enough to stop my heart from waking up beside you",
    "My promise: I will never leave you alone inside your difficult moments",
    "Our tomorrow is the place where distance becomes only an old memory",
    "Forever is not only a word, maa. It is the direction my heart has chosen",
    "Always us—through every morning, every silence, every song, and every lifetime"
  ];

  const state = {
    mood: null,
    reactions: new Set(),
    played: new Set(),
    currentIndex: playlist.getCurrentIndex(),
    constellationShown: false
  };

  let memoryTimer = null;
  let memoryIndex = 0;
  let holdStart = 0;
  let holdAnimationFrame = null;
  let holdCompleted = false;
  let selectedMoodTrack = -1;
  const vinylAnimations = [];
  let vinylAnimationsReady = false;

  function setupVinylAnimations() {
    if (vinylAnimationsReady) return;
    vinylAnimationsReady = true;

    const vinylTargets = [
      { element: mainVinyl, duration: 3600 },
      { element: stickyVinyl, duration: 3300 },
      { element: cinemaVinyl, duration: 4600 }
    ];

    vinylTargets.forEach(({ element, duration }) => {
      if (!element || typeof element.animate !== "function") return;

      const animation = element.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(360deg)" }
        ],
        { duration, iterations: Infinity, easing: "linear" }
      );

      animation.pause();
      vinylAnimations.push(animation);
    });
  }

  function syncVinylRotation(playing) {
    [mainVinyl, stickyVinyl, cinemaVinyl].filter(Boolean).forEach((element) => {
      element.classList.toggle("force-spin", playing);
    });

    vinylAnimations.forEach((animation) => {
      if (playing) animation.play();
      else animation.pause();
    });
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STATE_KEY) || "{}");
      state.mood = typeof saved.mood === "string" ? saved.mood : null;
      state.reactions = new Set(Array.isArray(saved.reactions) ? saved.reactions : []);
      state.played = new Set(Array.isArray(saved.played) ? saved.played : []);
    } catch {
      state.mood = null;
      state.reactions = new Set();
      state.played = new Set();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(
        STATE_KEY,
        JSON.stringify({
          mood: state.mood,
          reactions: Array.from(state.reactions),
          played: Array.from(state.played)
        })
      );
    } catch {
      // Local storage can be unavailable in strict private browsing.
    }
  }

  function formatTime(value) {
    if (!Number.isFinite(value) || value < 0) return "0:00";
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function currentTrack() {
    return state.currentIndex >= 0 ? playlist.tracks[state.currentIndex] : null;
  }

  function dedicationFor(index) {
    return dedications[index] || "Every melody here carries a small part of my heart towards you, maa.";
  }

  function worldFor(index) {
    return worldClasses[Math.abs(index) % worldClasses.length];
  }

  function setWorld(index) {
    worldClasses.forEach((className) => cinema.classList.remove(className));
    const worldClass = worldFor(index);
    cinema.classList.add(worldClass);
    cinemaWorldLabel.textContent = worldNames[worldClasses.indexOf(worldClass)];
  }

  function buildCinemaParticles() {
    if (!cinemaParticles || cinemaParticles.childElementCount) return;

    const count = window.innerWidth <= 500 ? 16 : 28;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement("span");
      particle.style.setProperty("--p-size", `${2 + Math.random() * 5}px`);
      particle.style.setProperty("--p-x", `${Math.random() * 100}%`);
      particle.style.setProperty("--p-duration", `${8 + Math.random() * 12}s`);
      particle.style.setProperty("--p-delay", `${-Math.random() * 15}s`);
      particle.style.setProperty("--p-drift", `${-70 + Math.random() * 140}px`);
      fragment.appendChild(particle);
    }

    cinemaParticles.appendChild(fragment);
  }

  function buildFinaleStars() {
    if (!finaleStars || finaleStars.childElementCount) return;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 52; i += 1) {
      const star = document.createElement("span");
      star.textContent = "✦";
      star.style.setProperty("--x", `${Math.random() * 100}%`);
      star.style.setProperty("--y", `${Math.random() * 100}%`);
      star.style.setProperty("--s", `${7 + Math.random() * 14}px`);
      star.style.setProperty("--d", `${-Math.random() * 3}s`);
      fragment.appendChild(star);
    }

    finaleStars.appendChild(fragment);
  }

  function burstPremiumHearts(originElement, count = 16) {
    const rect = originElement?.getBoundingClientRect?.() || {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
      width: 0,
      height: 0
    };

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    for (let i = 0; i < count; i += 1) {
      window.setTimeout(() => {
        const heart = document.createElement("span");
        heart.className = "premium-heart-burst";
        heart.textContent = i % 4 === 0 ? "♡" : "♥";
        heart.style.setProperty("--heart-x", `${x + (-26 + Math.random() * 52)}px`);
        heart.style.setProperty("--heart-y", `${y + (-12 + Math.random() * 24)}px`);
        heart.style.setProperty("--heart-drift", `${-95 + Math.random() * 190}px`);
        heart.style.setProperty("--heart-rotate", `${-35 + Math.random() * 70}deg`);
        heart.style.setProperty("--heart-size", `${18 + Math.random() * 20}px`);
        heart.style.setProperty("--heart-duration", `${1.35 + Math.random() * .8}s`);
        heart.style.color = i % 3 === 0 ? "#f4b6b9" : "#d8678b";

        document.body.appendChild(heart);
        window.setTimeout(() => heart.remove(), 2400);
      }, i * 45);
    }
  }

  function updateTrackRows() {
    trackButtons.forEach((button, index) => {
      button.classList.toggle("has-heart-reaction", state.reactions.has(index));
      button.setAttribute(
        "aria-label",
        state.reactions.has(index)
          ? `${playlist.tracks[index].title}, loved by you`
          : playlist.tracks[index].title
      );
    });
  }

  function updateDedication(index) {
    const track = playlist.tracks[index];
    if (!track) return;

    dedicationTitle.textContent = track.title;
    dedicationText.textContent = dedicationFor(index);
    heartReactionButton.classList.toggle("is-reacted", state.reactions.has(index));
    heartReactionButton.textContent = state.reactions.has(index)
      ? "This is one of our songs ♥"
      : "This feels like us ♡";

    cinemaTitle.textContent = track.title;
    cinemaArtist.textContent = track.artist;
    cinemaDedication.textContent = dedicationFor(index);
    cinemaReaction.classList.toggle("is-reacted", state.reactions.has(index));
    cinemaReaction.textContent = state.reactions.has(index)
      ? "This is one of our songs ♥"
      : "This song feels like us ♡";

    stickyTitle.textContent = track.title;
    stickyArtist.textContent = track.artist;
    setWorld(index);
  }

  function updatePlaybackState(playing) {
    const hasTrack = state.currentIndex >= 0;

    stickyPlayer.classList.toggle("is-visible", hasTrack && !cinema.classList.contains("is-open"));
    stickyPlayer.setAttribute("aria-hidden", String(!hasTrack));

    stickyVinyl.classList.toggle("is-playing", playing);
    cinemaVinyl.classList.toggle("is-playing", playing);
    mainVinyl?.classList.toggle("is-playing", playing);
    syncVinylRotation(playing);

    stickyToggle.textContent = playing ? "Ⅱ" : "▶";
    cinemaToggle.textContent = playing ? "Ⅱ" : "▶";

    openCinemaButton.disabled = !hasTrack;
  }

  function updateProgress(detail = {}) {
    const progress = playlist.getProgress();
    const current = Number.isFinite(detail.currentTime) ? detail.currentTime : progress.currentTime;
    const duration = Number.isFinite(detail.duration) ? detail.duration : progress.duration;
    const percentage = Number.isFinite(detail.percentage)
      ? detail.percentage
      : Number.isFinite(duration) && duration > 0
        ? (current / duration) * 100
        : 0;

    stickyProgressBar.style.width = `${percentage}%`;
    cinemaSeek.value = String(percentage);
    cinemaSeek.style.setProperty("--cinema-progress", `${percentage}%`);
    cinemaCurrent.textContent = formatTime(current);
    cinemaDuration.textContent = formatTime(duration);
  }

  function handleTrackChange(index) {
    state.currentIndex = index;
    state.played.add(index);
    saveState();

    updateDedication(index);
    updateTrackRows();
    updateConstellation();
    updateSecretLaunch();

    stickyPlayer.classList.add("is-visible");
    stickyPlayer.setAttribute("aria-hidden", "false");
  }

  function setMood(mood) {
    const detail = moodDetails[mood];
    if (!detail) return;

    state.mood = mood;
    saveState();

    moodButtons.forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.mood === mood);
    });

    trackButtons.forEach((button) => button.classList.remove("mood-match"));
    detail.tracks.forEach((index) => trackButtons[index]?.classList.add("mood-match"));

    selectedMoodTrack = detail.tracks[Math.floor(Math.random() * detail.tracks.length)];

    moodResultIcon.textContent = detail.icon;
    moodResultTitle.textContent = detail.title;
    moodResultText.textContent = detail.text;
    moodPlayButton.disabled = false;
    moodPlayButton.textContent = `Play ${playlist.tracks[selectedMoodTrack].title}`;
  }

  function updateConstellation() {
    const playedCount = state.played.size;
    const thresholds = [1, 2, 3, 4, 5, 6, 7, 8];

    memoryStars.forEach((star, index) => {
      star.classList.toggle("is-lit", playedCount >= thresholds[index]);
      star.disabled = playedCount < thresholds[index];
    });

    const litCount = thresholds.filter((threshold) => playedCount >= threshold).length;

    if (litCount === 0) {
      constellationMessage.textContent = "Listen to the playlist and watch our memories connect into a heart.";
    } else if (litCount < thresholds.length) {
      constellationMessage.textContent = `${litCount} of 8 memories are glowing. Every new song brings our heart closer to completion.`;
    } else {
      constellationMap.classList.add("is-complete");
      constellationMessage.textContent = "Our constellation is complete, maa. Every road, promise, and tomorrow leads back to us.";

      if (!state.constellationShown) {
        state.constellationShown = true;
        window.setTimeout(openFinale, 1200);
      }
    }
  }

  function updateSecretLaunch() {
    const unlocked = state.reactions.size >= 3;

    secretLaunchButton.disabled = !unlocked;
    secretLaunchButton.classList.toggle("is-unlocked", unlocked);

    const strong = secretLaunchButton.querySelector("strong");
    const small = secretLaunchButton.querySelector("small");

    if (unlocked) {
      strong.textContent = "Open the secret chamber";
      small.textContent = "You unlocked the room inside my heart";
    } else {
      const remaining = Math.max(0, 3 - state.reactions.size);
      strong.textContent = "A secret is waiting";
      small.textContent = `Love ${remaining} more song${remaining === 1 ? "" : "s"} to unlock it`;
    }
  }

  function toggleReaction(originElement) {
    if (state.currentIndex < 0) {
      playlist.playTrack(0, true);
      return;
    }

    const index = state.currentIndex;
    if (state.reactions.has(index)) {
      state.reactions.delete(index);
    } else {
      state.reactions.add(index);
      burstPremiumHearts(originElement, 18);
      if (navigator.vibrate) navigator.vibrate([25, 45, 25]);
    }

    saveState();
    updateDedication(index);
    updateTrackRows();
    updateSecretLaunch();
  }

  function openCinema() {
    if (state.currentIndex < 0) {
      playlist.playTrack(selectedMoodTrack >= 0 ? selectedMoodTrack : 0, true);
    }

    cinema.classList.add("is-open");
    cinema.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    stickyPlayer.classList.remove("is-visible");
    buildCinemaParticles();
    startMemoryCinema();

    window.setTimeout(() => cinemaClose.focus(), 350);
  }

  function closeCinema() {
    cinema.classList.remove("is-open", "private-mode", "heartbeat-mode");
    cinema.setAttribute("aria-hidden", "true");
    heartbeatModeButton.classList.remove("is-active");
    privateCinemaToggle.classList.remove("is-active");
    document.body.style.overflow = "";

    stopMemoryCinema();
    if (state.currentIndex >= 0) stickyPlayer.classList.add("is-visible");
  }

  function startMemoryCinema() {
    stopMemoryCinema();
    memoryIndex = 0;
    updateMemoryFrames();

    memoryTimer = window.setInterval(() => {
      memoryIndex = (memoryIndex + 1) % memoryFrames.length;
      updateMemoryFrames();
    }, 6800);
  }

  function stopMemoryCinema() {
    if (memoryTimer) window.clearInterval(memoryTimer);
    memoryTimer = null;
  }

  function updateMemoryFrames() {
    memoryFrames.forEach((frame, index) => {
      frame.classList.toggle("is-active", index === memoryIndex);
    });
  }

  function openSecretChamber() {
    if (state.reactions.size < 3) return;

    closeCinema();
    secretChamber.classList.add("is-open");
    secretChamber.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    window.setTimeout(() => secretClose.focus(), 350);
  }

  function closeSecretChamber() {
    secretChamber.classList.remove("is-open");
    secretChamber.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openFinale() {
    buildFinaleStars();
    closeCinema();
    closeSecretChamber();
    playlist.audio.pause();

    finale.classList.add("is-open");
    finale.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeFinaleOverlay() {
    finale.classList.remove("is-open");
    finale.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (state.currentIndex >= 0) stickyPlayer.classList.add("is-visible");
  }

  function beginHold() {
    if (holdAnimationFrame) return;

    holdStart = performance.now();
    holdCompleted = false;
    holdHandButton.classList.remove("is-complete");
    holdHandMessage.textContent = "Keep holding, maa…";

    const animate = (now) => {
      const progress = Math.min(1, (now - holdStart) / 1700);
      holdHandButton.style.setProperty("--hold-progress", `${progress * 100}%`);

      if (progress >= 1) {
        holdCompleted = true;
        holdHandButton.classList.add("is-complete");
        holdHandMessage.textContent = "I am holding your hand from here, maa. Don’t let go.";
        burstPremiumHearts(holdHandButton, 24);

        if (navigator.vibrate) navigator.vibrate([45, 55, 45, 90, 45]);
        holdAnimationFrame = null;
        return;
      }

      holdAnimationFrame = requestAnimationFrame(animate);
    };

    holdAnimationFrame = requestAnimationFrame(animate);
  }

  function endHold() {
    if (holdAnimationFrame) {
      cancelAnimationFrame(holdAnimationFrame);
      holdAnimationFrame = null;
    }

    if (holdCompleted) {
      holdHandMessage.textContent = "Even when you release the screen, I am still holding your heart.";
      window.setTimeout(() => {
        holdHandMessage.textContent = "I am right here, maa.";
        holdHandButton.classList.remove("is-complete");
        holdHandButton.style.setProperty("--hold-progress", "0%");
      }, 3600);
    } else {
      holdHandMessage.textContent = "Press and hold a little longer, my baby.";
      holdHandButton.style.setProperty("--hold-progress", "0%");
    }
  }

  function handleTrackEnded(detail) {
    if (detail?.isFinalTrack) {
      window.setTimeout(openFinale, 400);
    }
  }

  function initializeMood() {
    if (state.mood && moodDetails[state.mood]) {
      setMood(state.mood);
    }
  }

  moodButtons.forEach((button) => {
    button.addEventListener("click", () => setMood(button.dataset.mood));
  });

  moodPlayButton.addEventListener("click", () => {
    if (selectedMoodTrack < 0) return;
    playlist.playTrack(selectedMoodTrack, true);
    document.querySelector("#musicPlaylist")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  memoryStars.forEach((star) => {
    star.addEventListener("click", () => {
      const index = Number(star.dataset.star);
      if (!star.classList.contains("is-lit")) return;

      constellationMessage.textContent = starMessages[index];
      burstPremiumHearts(star, 9);
    });
  });

  heartReactionButton.addEventListener("click", () => toggleReaction(heartReactionButton));
  cinemaReaction.addEventListener("click", () => toggleReaction(cinemaReaction));

  openCinemaButton.addEventListener("click", openCinema);
  stickyOpenCinema.addEventListener("click", openCinema);
  cinemaClose.addEventListener("click", closeCinema);

  stickyToggle.addEventListener("click", playlist.toggle);
  stickyPrevious.addEventListener("click", playlist.previous);
  stickyNext.addEventListener("click", playlist.next);

  cinemaToggle.addEventListener("click", playlist.toggle);
  cinemaPrevious.addEventListener("click", playlist.previous);
  cinemaNext.addEventListener("click", playlist.next);

  cinemaSeek.addEventListener("input", () => {
    const progress = playlist.getProgress();
    if (!Number.isFinite(progress.duration) || progress.duration <= 0) return;

    const percentage = Number(cinemaSeek.value);
    playlist.audio.currentTime = (percentage / 100) * progress.duration;
    cinemaSeek.style.setProperty("--cinema-progress", `${percentage}%`);
  });

  heartbeatModeButton.addEventListener("click", () => {
    cinema.classList.toggle("heartbeat-mode");
    heartbeatModeButton.classList.toggle("is-active");
    if (navigator.vibrate && cinema.classList.contains("heartbeat-mode")) {
      navigator.vibrate([30, 70, 30]);
    }
  });

  privateCinemaToggle.addEventListener("click", () => {
    cinema.classList.toggle("private-mode");
    privateCinemaToggle.classList.toggle("is-active");
    privateCinemaToggle.textContent = cinema.classList.contains("private-mode")
      ? "Show everything"
      : "Private cinema";
  });

  holdHandButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    holdHandButton.setPointerCapture?.(event.pointerId);
    beginHold();
  });

  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    holdHandButton.addEventListener(eventName, endHold);
  });

  secretLaunchButton.addEventListener("click", openSecretChamber);
  secretClose.addEventListener("click", closeSecretChamber);

  playSecretSong.addEventListener("click", () => {
    closeSecretChamber();
    playlist.playTrack(28, true);
    window.setTimeout(openCinema, 250);
  });

  replayLoveStory.addEventListener("click", () => {
    closeFinaleOverlay();
    playlist.playTrack(0, true);
    window.setTimeout(openCinema, 250);
  });

  finaleKisses.addEventListener("click", () => {
    closeFinaleOverlay();
    playlist.sendKisses();
  });

  closeFinale.addEventListener("click", closeFinaleOverlay);

  playlist.audio.addEventListener("play", () => syncVinylRotation(true));
  playlist.audio.addEventListener("pause", () => syncVinylRotation(false));
  playlist.audio.addEventListener("ended", () => syncVinylRotation(false));

  document.addEventListener("loveplaylist:trackchange", (event) => {
    handleTrackChange(event.detail.index);
  });

  document.addEventListener("loveplaylist:state", (event) => {
    updatePlaybackState(Boolean(event.detail.playing));
  });

  document.addEventListener("loveplaylist:progress", (event) => {
    updateProgress(event.detail);
  });

  document.addEventListener("loveplaylist:trackended", (event) => {
    handleTrackEnded(event.detail);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (finale.classList.contains("is-open")) closeFinaleOverlay();
    else if (secretChamber.classList.contains("is-open")) closeSecretChamber();
    else if (cinema.classList.contains("is-open")) closeCinema();
  });

  setupVinylAnimations();
  loadState();
  buildCinemaParticles();
  buildFinaleStars();
  initializeMood();
  updateTrackRows();
  updateConstellation();
  updateSecretLaunch();
  updateProgress();

  const initialIndex = playlist.getCurrentIndex();
  if (initialIndex >= 0) {
    handleTrackChange(initialIndex);
    updatePlaybackState(!playlist.audio.paused);
  } else {
    updatePlaybackState(false);
    openCinemaButton.disabled = true;
  }

  syncVinylRotation(!playlist.audio.paused && playlist.getCurrentIndex() >= 0);
})();
