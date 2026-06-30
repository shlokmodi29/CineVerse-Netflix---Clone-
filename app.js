/**
 * CineVerse - Core Application Script
 * Implements client-side SPA routing, dynamic movie carousels, watchlist tracking,
 * search filtering, profile managers, and custom simulated video player.
 */

// --- Dynamic Movie & TV Shows Mock Database ---
const MOVIE_DATABASE = [
  {
    id: "interstellar",
    title: "Interstellar",
    type: "movie",
    year: 2014,
    rating: "PG-13",
    duration: "2h 49m",
    match: 98,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    synopsis: "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    backdrop: "assets/interstellar.jpg",
    categories: ["trending", "popular", "scifi", "toppicks"],
    vibes: ["Mind-Bending", "Emotional", "Visual Masterpiece"]
  },
  {
    id: "avengers-endgame",
    title: "Avengers Endgame",
    type: "movie",
    year: 2019,
    rating: "PG-13",
    duration: "3h 02m",
    match: 97,
    genres: ["Action", "Sci-Fi", "Adventure"],
    synopsis: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos' actions.",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    backdrop: "assets/Avengers Endgame.jpg",
    categories: ["trending", "action", "toppicks"],
    vibes: ["Explosive", "Epic", "Inspiring"]
  },
  {
    id: "avatar",
    title: "Avatar",
    type: "movie",
    year: 2009,
    rating: "PG-13",
    duration: "2h 42m",
    match: 95,
    genres: ["Sci-Fi", "Adventure", "Action"],
    synopsis: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    backdrop: "assets/Avatar.jpg",
    categories: ["popular", "scifi", "action"],
    vibes: ["Visually Stunning", "Immersive", "Awe-Inspiring"]
  },
  {
    id: "spiderman",
    title: "Spiderman",
    type: "movie",
    year: 2002,
    rating: "PG-13",
    duration: "2h 01m",
    match: 94,
    genres: ["Action", "Adventure"],
    synopsis: "After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities that he must use to fight evil as a superhero.",
    cast: ["Tobey Maguire", "Kirsten Dunst", "Willem Dafoe"],
    backdrop: "assets/Spiderman.jpg",
    categories: ["popular", "action"],
    vibes: ["Nostalgic", "Thrilling", "Classic"]
  },
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    type: "movie",
    year: 2026,
    rating: "PG-13",
    duration: "2h 15m",
    match: 96,
    genres: ["Sci-Fi", "Adventure"],
    synopsis: "A sole surviving astronaut must use his scientific wits to save Earth from an extinction-level solar threat, aided by an unexpected alien ally.",
    cast: ["Ryan Gosling", "Sandra Bullock"],
    backdrop: "assets/Project Hail Mary.jpg",
    categories: ["scifi", "toppicks"],
    vibes: ["Intelligent", "Suspenseful", "Heartwarming"]
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    type: "tv",
    year: 2019,
    rating: "TV-14",
    duration: "4 Seasons",
    match: 96,
    genres: ["Anime", "Action", "Fantasy"],
    synopsis: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon. Tanjiro sets out to become a demon slayer.",
    cast: ["Natsuki Hanae", "Akari Kito", "Yoshitsugu Matsuoka"],
    backdrop: "assets/Demon Slayer.jpg",
    categories: ["trending", "anime", "action", "toppicks"],
    vibes: ["Stylized", "Action-Packed", "Emotional"],
    seasons: [
      {
        season: 1,
        episodes: [
          { ep: 1, title: "Cruelty", duration: "23m", desc: "Tanjiro Kamado lives a peaceful life until he finds his family slaughtered by a demon." },
          { ep: 2, title: "Trainer Sakonji Urokodaki", duration: "23m", desc: "Tanjiro starts his journey to become a demon slayer under Urokodaki's guidance." }
        ]
      }
    ]
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    type: "tv",
    year: 2020,
    rating: "TV-MA",
    duration: "2 Seasons",
    match: 95,
    genres: ["Anime", "Action", "Supernatural"],
    synopsis: "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a Jujutsu High school to learn how to control his powers.",
    cast: ["Junya Enoki", "Yuma Uchida", "Asami Seto"],
    backdrop: "assets/Jujutsu Kaisen.jpg",
    categories: ["trending", "anime", "action", "toppicks"],
    vibes: ["Dark", "Supernatural", "High-Octane"],
    seasons: [
      {
        season: 1,
        episodes: [
          { ep: 1, title: "Ryomen Sukuna", duration: "24m", desc: "Yuji Itadori eats a cursed finger to save his friends from a cursed spirit." }
        ]
      }
    ]
  },
  {
    id: "conjuring",
    title: "Conjuring",
    type: "movie",
    year: 2013,
    rating: "R",
    duration: "1h 52m",
    match: 91,
    genres: ["Horror", "Mystery", "Thriller"],
    synopsis: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    cast: ["Vera Farmiga", "Patrick Wilson", "Lili Taylor"],
    backdrop: "assets/Conjuring.jpg",
    categories: ["trending"],
    vibes: ["Chilling", "Terrifying", "Atmospheric"]
  },
  {
    id: "cocktail-2",
    title: "Cocktail 2",
    type: "movie",
    year: 2025,
    rating: "PG-13",
    duration: "2h 05m",
    match: 89,
    genres: ["Comedy", "Romance"],
    synopsis: "Two bartenders compete for the championship of a international flair-bartending league, only to find love in the final round.",
    cast: ["Tom Cruise Jr.", "Zendaya"],
    backdrop: "assets/Cocktail 2.jpg",
    categories: ["popular"],
    vibes: ["Witty", "Vibrant", "Feel-Good"]
  },
  {
    id: "download",
    title: "Download",
    type: "movie",
    year: 2024,
    rating: "PG-13",
    duration: "1h 48m",
    match: 88,
    genres: ["Action", "Sci-Fi"],
    synopsis: "In a world where memories can be downloaded directly into the neural network, a rogue agent fights to recover his deleted childhood.",
    cast: ["Keanu Reeves", "Carrie-Anne Moss"],
    backdrop: "assets/download.jpg",
    categories: ["popular", "action", "scifi"],
    vibes: ["Fast-Paced", "Cerebral", "Suspenseful"]
  }
];

// Default profile configurations
const DEFAULT_AVATARS = [
  "assets/avatar1.svg",
  "assets/avatar2.svg",
  "assets/avatar3.svg",
  "assets/avatar4.svg"
];

// --- Core Application Controller ---
class CineVerseApp {
  constructor() {
    this.currentUser = null;
    this.currentProfile = null;
    this.watchlist = [];
    this.activeView = "login";
    this.searchQuery = "";
    this.searchDebounceTimer = null;

    // Video Player state variables
    this.playerActive = false;
    this.isPlaying = false;
    this.playTime = 0;
    this.playDuration = 8040; // ~2h 14m in seconds
    this.playerTimer = null;
    this.playbackSpeed = 1.0;
    this.isMuted = false;
    this.volume = 0.8;
    this.idleControlsTimer = null;

    // Continue Watching simulated local progress database
    this.continueWatchingData = [];
  }

  init() {
    this.setupDOMReferences();
    this.setupEventListeners();
    this.loadStateFromStorage();
    this.updateNavigationUI();

    // Simulate Initial Loading Spin for premium OTT feel
    setTimeout(() => {
      this.appLoader.classList.add("hidden");
      this.appContainer.classList.remove("loading");
      this.route();
    }, 1500);
  }

  setupDOMReferences() {
    this.appContainer = document.getElementById("app");
    this.appLoader = document.getElementById("app-loader");
    this.navbar = document.getElementById("navbar");
    this.footer = document.getElementById("footer");
    this.viewContainer = document.getElementById("view-container");

    // Views
    this.views = {
      "login": document.getElementById("auth-view"),
      "signup": document.getElementById("auth-view"),
      "profile-gate": document.getElementById("profile-gate-view"),
      "home": document.getElementById("home-view"),
      "search": document.getElementById("search-view"),
      "watchlist": document.getElementById("watchlist-view"),
      "profile-settings": document.getElementById("profile-settings-view")
    };

    // Auth forms
    this.loginCard = document.getElementById("login-card");
    this.signupCard = document.getElementById("signup-card");
    this.loginForm = document.getElementById("login-form");
    this.signupForm = document.getElementById("signup-form");

    // Profile Gate
    this.profilesGrid = document.getElementById("profiles-grid");

    // Search Component
    this.searchBox = document.getElementById("search-box");
    this.searchToggleBtn = document.getElementById("search-toggle-btn");
    this.searchInput = document.getElementById("search-input");
    this.searchClearBtn = document.getElementById("search-clear-btn");
    this.searchResultsGrid = document.getElementById("search-results-grid");
    this.searchSkeleton = document.getElementById("search-skeleton");
    this.noResultsMsg = document.getElementById("no-results-msg");
    this.noResultsQuery = document.getElementById("no-results-query");
    this.searchHeading = document.getElementById("search-heading");

    // Watchlist Component
    this.watchlistGrid = document.getElementById("watchlist-grid");
    this.emptyWatchlistMsg = document.getElementById("empty-watchlist-msg");
    this.watchlistCountBadge = document.getElementById("watchlist-count");

    // Profile Dropdown & Avatars
    this.profileToggle = document.getElementById("profile-toggle");
    this.profileDropdown = document.getElementById("profile-dropdown");
    this.profileSwitchList = document.getElementById("profile-switch-list");
    this.navbarAvatarImg = document.getElementById("navbar-avatar-img");
    this.settingsProfilesGrid = document.getElementById("settings-profiles-grid");

    // Notifications Component
    this.notificationsToggle = document.getElementById("notifications-toggle");
    this.notificationsDropdown = document.getElementById("notifications-dropdown");
    this.notificationList = document.getElementById("notification-list");

    // Movie Detail Modal
    this.detailModal = document.getElementById("movie-detail-modal");
    this.modalCloseBtn = document.getElementById("modal-close-btn");
    this.modalBannerImg = document.getElementById("modal-banner-img");
    this.modalTitle = document.getElementById("modal-title");
    this.modalPlayBtn = document.getElementById("modal-play-btn");
    this.modalWatchlistBtn = document.getElementById("modal-watchlist-btn");
    this.modalLikeBtn = document.getElementById("modal-like-btn");
    this.modalMatch = document.getElementById("modal-match");
    this.modalYear = document.getElementById("modal-year");
    this.modalAge = document.getElementById("modal-age");
    this.modalDuration = document.getElementById("modal-duration");
    this.modalSynopsis = document.getElementById("modal-synopsis");
    this.modalCast = document.getElementById("modal-cast");
    this.modalGenres = document.getElementById("modal-genres");
    this.modalEpisodesSection = document.getElementById("modal-episodes-section");
    this.seasonSelector = document.getElementById("season-selector");
    this.episodesList = document.getElementById("episodes-list");
    this.recommendationsGrid = document.getElementById("recommendations-grid");

    // Video Player
    this.playerContainer = document.getElementById("video-player-container");
    this.playerScreen = document.getElementById("player-screen");
    this.playerCenterTitle = document.getElementById("player-center-title");
    this.playerStateIcon = document.getElementById("player-state-icon");
    this.playerControlsOverlay = document.querySelector(".player-controls-overlay");
    this.playerBackBtn = document.getElementById("player-back-btn");
    this.playerMovieTitle = document.getElementById("player-movie-title");
    this.playerEpisodeInfo = document.getElementById("player-episode-info");
    this.playerPlayToggle = document.getElementById("player-play-toggle");
    this.playerPlayIcon = document.getElementById("player-play-icon");
    this.playerRewind = document.getElementById("player-rewind");
    this.playerForward = document.getElementById("player-forward");
    this.playerMuteToggle = document.getElementById("player-mute-toggle");
    this.playerVolumeIcon = document.getElementById("player-volume-icon");
    this.volumeSliderTrack = document.getElementById("volume-slider-track");
    this.volumeSliderFill = document.getElementById("volume-slider-fill");
    this.seekBarTrack = document.getElementById("seek-bar-track");
    this.seekBarFill = document.getElementById("seek-bar-fill");
    this.seekBarHandle = document.getElementById("seek-bar-handle");
    this.playerTimeCurrent = document.getElementById("player-time-current");
    this.playerTimeDuration = document.getElementById("player-time-duration");
    this.playerSpeedBtn = document.getElementById("player-speed");
    this.playerFullscreenBtn = document.getElementById("player-fullscreen");

    // Toast Banner
    this.toastBanner = document.getElementById("toast-banner");
    this.toastMessage = document.getElementById("toast-message");
  }

  setupEventListeners() {
    // Auth Forms Submission
    this.loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleLogin();
    });
    this.signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSignup();
    });

    // Expandable Search Logic
    this.searchToggleBtn.addEventListener("click", () => {
      const isExpanded = this.searchBox.classList.contains("expanded");
      if (isExpanded) {
        if (!this.searchInput.value.trim()) {
          this.searchBox.classList.remove("expanded");
        }
      } else {
        this.searchBox.classList.add("expanded");
        this.searchInput.focus();
      }
    });

    // Handle Navbar Collapse when clicking outside search
    document.addEventListener("click", (e) => {
      if (!this.searchBox.contains(e.target) && this.searchInput.value.trim() === "") {
        this.searchBox.classList.remove("expanded");
      }
      if (!this.profileToggle.contains(e.target) && !this.profileDropdown.contains(e.target)) {
        this.profileDropdown.classList.add("hidden");
      }
      if (!this.notificationsToggle.contains(e.target) && !this.notificationsDropdown.contains(e.target)) {
        this.notificationsDropdown.classList.add("hidden");
      }
    });

    // Live Search Typing with Debounce
    this.searchInput.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.trim();
      if (this.searchQuery) {
        this.searchClearBtn.classList.remove("hidden");
        this.triggerSearchDebounced();
      } else {
        this.searchClearBtn.classList.add("hidden");
        this.navigateTo("home");
      }
    });

    // Clear Search Input
    this.searchClearBtn.addEventListener("click", () => {
      this.searchInput.value = "";
      this.searchQuery = "";
      this.searchClearBtn.classList.add("hidden");
      this.navigateTo("home");
    });

    // Toggle Dropdowns
    this.profileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.profileDropdown.classList.toggle("hidden");
      this.notificationsDropdown.classList.add("hidden"); // close other
    });

    this.notificationsToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.notificationsDropdown.classList.toggle("hidden");
      this.profileDropdown.classList.add("hidden"); // close other
    });

    // Sticky Navbar blur on Scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        this.navbar.classList.add("scrolled");
      } else {
        this.navbar.classList.remove("scrolled");
      }
    });

    // Movie Detail Modal Close
    this.modalCloseBtn.addEventListener("click", () => {
      this.closeMovieDetail();
    });
    this.detailModal.addEventListener("click", (e) => {
      if (e.target === this.detailModal) {
        this.closeMovieDetail();
      }
    });

    // Hero action buttons
    document.getElementById("hero-play-btn").addEventListener("click", () => {
      this.playVideo(MOVIE_DATABASE[0].id);
    });
    document.getElementById("hero-info-btn").addEventListener("click", () => {
      this.openMovieDetail(MOVIE_DATABASE[0].id);
    });

    // Video Player Interactions
    this.playerBackBtn.addEventListener("click", () => this.closeVideoPlayer());
    this.playerPlayToggle.addEventListener("click", () => this.togglePlayback());
    this.playerScreen.addEventListener("click", () => this.togglePlayback());
    this.playerRewind.addEventListener("click", () => this.skipTime(-10));
    this.playerForward.addEventListener("click", () => this.skipTime(10));
    this.playerMuteToggle.addEventListener("click", () => this.toggleMute());
    this.playerSpeedBtn.addEventListener("click", () => this.changePlaybackSpeed());
    this.playerFullscreenBtn.addEventListener("click", () => this.toggleFullscreen());

    // Player controls activity monitor
    this.playerContainer.addEventListener("mousemove", () => this.resetPlayerIdleTimer());
    this.playerContainer.addEventListener("touchstart", () => this.resetPlayerIdleTimer());

    // Timeline Scrubbing
    this.seekBarTrack.addEventListener("click", (e) => this.scrubVideo(e));
    this.volumeSliderTrack.addEventListener("click", (e) => this.scrubVolume(e));

    // Episode selection changer
    this.seasonSelector.addEventListener("change", (e) => {
      const movieId = this.detailModal.dataset.movieId;
      const selectedSeasonNum = parseInt(e.target.value);
      this.renderEpisodesList(movieId, selectedSeasonNum);
    });
  }

  loadStateFromStorage() {
    const user = localStorage.getItem("cv_user");
    if (user) {
      this.currentUser = JSON.parse(user);
      const activeProf = localStorage.getItem("cv_profile");
      if (activeProf) {
        this.currentProfile = JSON.parse(activeProf);
        this.navbarAvatarImg.src = this.currentProfile.avatar;
      }
      this.loadWatchlist();
      this.loadContinueWatching();
    }
  }

  loadWatchlist() {
    if (!this.currentUser || !this.currentProfile) return;
    const storeKey = `cv_watchlist_${this.currentUser.email}_${this.currentProfile.id}`;
    const stored = localStorage.getItem(storeKey);
    this.watchlist = stored ? JSON.parse(stored) : [];
  }

  saveWatchlist() {
    if (!this.currentUser || !this.currentProfile) return;
    const storeKey = `cv_watchlist_${this.currentUser.email}_${this.currentProfile.id}`;
    localStorage.setItem(storeKey, JSON.stringify(this.watchlist));
    this.updateNavbarWatchlistLink();
  }

  loadContinueWatching() {
    if (!this.currentUser || !this.currentProfile) return;
    const storeKey = `cv_cw_${this.currentUser.email}_${this.currentProfile.id}`;
    const stored = localStorage.getItem(storeKey);

    // If empty, generate pre-seeded entries for realistic feeling
    if (stored) {
      this.continueWatchingData = JSON.parse(stored);
    } else {
      this.continueWatchingData = [
        { movieId: "jujutsu-kaisen", progress: 65, timeLeft: "18m left", lastWatched: "Watched 2 hours ago", epInfo: "S1:E1" },
        { movieId: "demon-slayer", progress: 42, timeLeft: "14m left", lastWatched: "Watched yesterday", epInfo: "S1:E1" },
        { movieId: "interstellar", progress: 85, timeLeft: "18m left", lastWatched: "Watched 3 days ago" }
      ];
      this.saveContinueWatching();
    }
  }

  saveContinueWatching() {
    if (!this.currentUser || !this.currentProfile) return;
    const storeKey = `cv_cw_${this.currentUser.email}_${this.currentProfile.id}`;
    localStorage.setItem(storeKey, JSON.stringify(this.continueWatchingData));
  }

  route() {
    if (!this.currentUser) {
      this.activeView = "login";
      this.navigateTo("login");
    } else if (!this.currentProfile) {
      this.activeView = "profile-gate";
      this.navigateTo("profile-gate");
    } else {
      this.activeView = "home";
      this.navigateTo("home");
    }
  }

  navigateTo(viewName) {
    this.activeView = viewName;

    // Handle specific screen layouts
    if (viewName === "login" || viewName === "signup") {
      this.navbar.classList.add("hidden");
      this.footer.classList.add("hidden");
      this.loginCard.classList.toggle("hidden", viewName !== "login");
      this.signupCard.classList.toggle("hidden", viewName !== "signup");
    } else if (viewName === "profile-gate") {
      this.navbar.classList.add("hidden");
      this.footer.classList.add("hidden");
      this.renderProfileGateGrid();
    } else {
      // Authenticated standard screens
      this.navbar.classList.remove("hidden");
      this.footer.classList.remove("hidden");

      // Load contents based on view
      if (viewName === "home") {
        this.renderHomeRows();
      } else if (viewName === "watchlist") {
        this.renderWatchlist();
      } else if (viewName === "profile-settings") {
        this.renderProfileSettings();
      }
    }

    // Toggle view containers active state
    const activeElement = this.views[viewName];
    Object.keys(this.views).forEach(key => {
      const element = this.views[key];
      if (element) {
        if (element === activeElement) {
          element.classList.remove("hidden");
        } else if (element !== activeElement) {
          element.classList.add("hidden");
        }
      }
    });

    this.updateNavigationUI();
    window.scrollTo(0, 0);
  }

  updateNavigationUI() {
    // Reset and select active link in navbar
    const links = document.querySelectorAll(".nav-links li");
    links.forEach(li => {
      const target = li.dataset.view;
      if (target === this.activeView) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });

    this.updateNavbarWatchlistLink();
    this.renderNotifications();
    this.renderNavbarProfileDropdown();
  }

  updateNavbarWatchlistLink() {
    const listLink = document.querySelector('[data-view="watchlist"]');
    if (listLink && this.watchlist.length > 0) {
      listLink.innerHTML = `My List <span style="font-size:0.75rem; background:var(--primary-red); color:white; padding: 1px 6px; border-radius: 10px; margin-left: 4px;">${this.watchlist.length}</span>`;
    } else if (listLink) {
      listLink.innerHTML = "My List";
    }
  }

  // --- Auth Handlers ---
  handleLogin() {
    const email = document.getElementById("login-email").value.trim();
    const pass = document.getElementById("login-password").value;

    if (email && pass.length >= 6) {
      // Simulate successful login
      const mockUser = { email: email, name: email.split("@")[0] };
      this.currentUser = mockUser;
      localStorage.setItem("cv_user", JSON.stringify(mockUser));

      // Try to load user profiles. If none exist, create defaults.
      let profiles = localStorage.getItem(`cv_profiles_${email}`);
      if (!profiles) {
        profiles = [
          { id: 1, name: mockUser.name.charAt(0).toUpperCase() + mockUser.name.slice(1), avatar: DEFAULT_AVATARS[0] },
          { id: 2, name: "Kids", avatar: DEFAULT_AVATARS[1] },
          { id: 3, name: "Guest", avatar: DEFAULT_AVATARS[2] }
        ];
        localStorage.setItem(`cv_profiles_${email}`, JSON.stringify(profiles));
      }

      this.showToast(`Welcome back, ${mockUser.name}!`);
      this.navigateTo("profile-gate");
    }
  }

  handleSignup() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const pass = document.getElementById("signup-password").value;

    if (name && email && pass.length >= 6) {
      const mockUser = { email: email, name: name };
      this.currentUser = mockUser;
      localStorage.setItem("cv_user", JSON.stringify(mockUser));

      // Create defaults
      const profiles = [
        { id: 1, name: name, avatar: DEFAULT_AVATARS[0] },
        { id: 2, name: "Kids", avatar: DEFAULT_AVATARS[1] },
        { id: 3, name: "Family", avatar: DEFAULT_AVATARS[2] }
      ];
      localStorage.setItem(`cv_profiles_${email}`, JSON.stringify(profiles));

      this.showToast("Account created successfully!");
      this.navigateTo("profile-gate");
    }
  }

  toggleAuthCard(cardType) {
    if (cardType === "signup") {
      this.activeView = "signup";
      this.loginCard.classList.add("hidden");
      this.signupCard.classList.remove("hidden");
    } else {
      this.activeView = "login";
      this.signupCard.classList.add("hidden");
      this.loginCard.classList.remove("hidden");
    }
  }

  logout() {
    localStorage.removeItem("cv_user");
    localStorage.removeItem("cv_profile");
    this.currentUser = null;
    this.currentProfile = null;
    this.watchlist = [];
    this.continueWatchingData = [];
    this.showToast("Signed out successfully");
    this.navigateTo("login");
  }

  // --- Profile Gate ("Who's watching?") ---
  renderProfileGateGrid() {
    if (!this.currentUser) return;
    const profiles = JSON.parse(localStorage.getItem(`cv_profiles_${this.currentUser.email}`)) || [];

    this.profilesGrid.innerHTML = "";
    profiles.forEach(profile => {
      const btn = document.createElement("button");
      btn.className = "profile-card-btn";
      btn.innerHTML = `
        <img src="${profile.avatar}" alt="${profile.name}">
        <span>${profile.name}</span>
      `;
      btn.addEventListener("click", () => this.selectProfile(profile));
      this.profilesGrid.appendChild(btn);
    });

    // Add profile placeholder if profiles length < 4
    if (profiles.length < 4) {
      const addBtn = document.createElement("button");
      addBtn.className = "profile-card-btn add-profile-btn";
      addBtn.innerHTML = `
        <div style="width:120px; height:120px; border-radius:16px; border:2px dashed var(--text-muted); display:flex; align-items:center; justify-content:center; font-size:2rem; color:var(--text-muted);">+</div>
        <span>Add Profile</span>
      `;
      addBtn.addEventListener("click", () => this.createNewProfilePrompt());
      this.profilesGrid.appendChild(addBtn);
    }
  }

  selectProfile(profile) {
    this.currentProfile = profile;
    localStorage.setItem("cv_profile", JSON.stringify(profile));
    this.navbarAvatarImg.src = profile.avatar;
    this.loadWatchlist();
    this.loadContinueWatching();
    this.showToast(`Viewing as ${profile.name}`);
    this.navigateTo("home");
  }

  createNewProfilePrompt() {
    const name = prompt("Enter profile name:");
    if (name && name.trim()) {
      const profiles = JSON.parse(localStorage.getItem(`cv_profiles_${this.currentUser.email}`)) || [];
      const newId = Date.now();
      const randomAvatar = DEFAULT_AVATARS[profiles.length % DEFAULT_AVATARS.length];

      profiles.push({ id: newId, name: name.trim(), avatar: randomAvatar });
      localStorage.setItem(`cv_profiles_${this.currentUser.email}`, JSON.stringify(profiles));
      this.renderProfileGateGrid();
    }
  }

  // --- Home page row rendering ---
  renderHomeRows() {
    this.renderHero();
    const rowsContainer = document.getElementById("rows-container");
    rowsContainer.innerHTML = "";

    // Categories we want to show
    const categoriesMap = [
      { id: "trending", title: "Trending Now", items: MOVIE_DATABASE.filter(m => m.categories.includes("trending")) },
      { id: "popular", title: "Popular on CineVerse", items: MOVIE_DATABASE.filter(m => m.categories.includes("popular")) },
      { id: "continue", title: "Continue Watching", items: [] }, // populate separately
      { id: "scifi", title: "Sci-Fi Masterpieces", items: MOVIE_DATABASE.filter(m => m.categories.includes("scifi")) },
      { id: "action", title: "Action & Adventure Thrillers", items: MOVIE_DATABASE.filter(m => m.categories.includes("action")) },
      { id: "anime", title: "Anime Spotlight", items: MOVIE_DATABASE.filter(m => m.categories.includes("anime")) },
      { id: "toppicks", title: "Top Picks For You", items: MOVIE_DATABASE.filter(m => m.categories.includes("toppicks")) }
    ];

    categoriesMap.forEach(category => {
      // Handle continue watching differently
      if (category.id === "continue") {
        if (this.continueWatchingData.length === 0) return;

        // Match simulated progress items to movie assets
        const cwItems = this.continueWatchingData.map(cw => {
          const item = MOVIE_DATABASE.find(m => m.id === cw.movieId);
          return item ? { ...item, cwProgress: cw.progress, cwTimeLeft: cw.timeLeft, cwEpInfo: cw.epInfo } : null;
        }).filter(Boolean);

        category.items = cwItems;
      }

      if (category.items.length === 0) return;

      const row = this.createSliderRowElement(category.id, category.title, category.items);
      rowsContainer.appendChild(row);
    });

    // Reinitalize icons for new elements
    lucide.createIcons();
  }

  createSliderRowElement(rowId, title, items) {
    const rowSection = document.createElement("section");
    rowSection.className = "row-section";
    rowSection.id = `row-${rowId}`;

    const heading = document.createElement("h2");
    heading.textContent = title;
    rowSection.appendChild(heading);

    const sliderWrapper = document.createElement("div");
    sliderWrapper.className = "slider-wrapper";

    // Left Arrow
    const leftArrow = document.createElement("button");
    leftArrow.className = "slider-arrow arrow-left";
    leftArrow.setAttribute("aria-label", "Scroll left");
    leftArrow.innerHTML = `<i data-lucide="chevron-left"></i>`;

    // Right Arrow
    const rightArrow = document.createElement("button");
    rightArrow.className = "slider-arrow arrow-right";
    rightArrow.setAttribute("aria-label", "Scroll right");
    rightArrow.innerHTML = `<i data-lucide="chevron-right"></i>`;

    const sliderTrack = document.createElement("div");
    sliderTrack.className = "slider-track";
    sliderTrack.id = `track-${rowId}`;

    items.forEach(movie => {
      const card = this.createMovieCard(movie, rowId === "continue");
      sliderTrack.appendChild(card);
    });

    sliderWrapper.appendChild(leftArrow);
    sliderWrapper.appendChild(sliderTrack);
    sliderWrapper.appendChild(rightArrow);

    rowSection.appendChild(sliderWrapper);

    // Attach scroll behavior listeners
    leftArrow.addEventListener("click", () => {
      const cardWidth = sliderTrack.querySelector(".movie-card").offsetWidth + 16; // width + gap
      sliderTrack.scrollBy({ left: -cardWidth * 3, behavior: 'smooth' });
    });
    rightArrow.addEventListener("click", () => {
      const cardWidth = sliderTrack.querySelector(".movie-card").offsetWidth + 16;
      sliderTrack.scrollBy({ left: cardWidth * 3, behavior: 'smooth' });
    });

    return rowSection;
  }

  createMovieCard(movie, isContinue = false) {
    const card = document.createElement("div");
    card.className = "movie-card";

    let continueOverlay = "";
    let progressIndicator = "";

    if (isContinue && movie.cwProgress !== undefined) {
      progressIndicator = `
        <div class="progress-container">
          <div class="progress-fill" style="width: ${movie.cwProgress}%;"></div>
        </div>
      `;
      continueOverlay = `
        <div class="resume-overlay">
          <i data-lucide="play" style="fill:white; width:16px; height:16px;"></i>
        </div>
      `;
    }

    const inWatchlist = this.watchlist.includes(movie.id);
    const listBtnIcon = inWatchlist ? "check" : "plus";

    card.innerHTML = `
      <div class="card-poster-wrapper">
        <img src="${movie.backdrop}" alt="${movie.title}" class="card-poster" loading="lazy">
        ${continueOverlay}
        ${progressIndicator}
      </div>
      <div class="movie-card-info">
        <div class="card-actions">
          <button class="card-btn play-card-btn" data-movie-id="${movie.id}">
            <i data-lucide="play"></i>
          </button>
          <button class="card-btn add-card-btn" data-movie-id="${movie.id}">
            <i data-lucide="${listBtnIcon}"></i>
          </button>
          <button class="card-btn like-card-btn" data-movie-id="${movie.id}">
            <i data-lucide="thumbs-up"></i>
          </button>
        </div>
        <div class="card-title">${movie.title}</div>
        <div class="card-meta">
          <span class="match-rating">${movie.match}% Match</span>
          <span class="card-genres">${movie.genres.slice(0, 2).join(" • ")}</span>
        </div>
      </div>
    `;

    // Click on Card directly (except buttons) opens details modal
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".card-btn")) {
        this.openMovieDetail(movie.id);
      }
    });

    // Play action
    card.querySelector(".play-card-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      this.playVideo(movie.id);
    });

    // Watchlist action
    const watchlistBtn = card.querySelector(".add-card-btn");
    watchlistBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleWatchlist(movie.id, watchlistBtn);
    });

    // Like action
    card.querySelector(".like-card-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      this.showToast(`Liked "${movie.title}"`);
    });

    return card;
  }

  // --- Filtering Navbar Links ---
  filterType(type) {
    this.navigateTo("search");
    this.searchHeading.textContent = type === "movie" ? "Movies" : "TV Shows";
    const filtered = MOVIE_DATABASE.filter(m => m.type === type);
    this.renderSearchResults(filtered);
  }

  filterCategory(category) {
    this.navigateTo("search");
    this.searchHeading.textContent = "New & Popular on CineVerse";
    const filtered = MOVIE_DATABASE.filter(m => m.categories.includes("trending") || m.categories.includes("popular"));
    this.renderSearchResults(filtered);
  }

  // --- Watchlist Functions ---
  toggleWatchlist(movieId, buttonElement) {
    const index = this.watchlist.indexOf(movieId);
    const movie = MOVIE_DATABASE.find(m => m.id === movieId);

    if (index === -1) {
      this.watchlist.push(movieId);
      this.showToast(`Added "${movie.title}" to My List`);
      if (buttonElement) {
        buttonElement.innerHTML = `<i data-lucide="check"></i>`;
      }
    } else {
      this.watchlist.splice(index, 1);
      this.showToast(`Removed "${movie.title}" from My List`);
      if (buttonElement) {
        buttonElement.innerHTML = `<i data-lucide="plus"></i>`;
      }
    }

    lucide.createIcons();
    this.saveWatchlist();

    // Re-render watchlist if currently active
    if (this.activeView === "watchlist") {
      this.renderWatchlist();
    }
  }

  renderWatchlist() {
    this.watchlistGrid.innerHTML = "";
    this.watchlistCountBadge.textContent = `${this.watchlist.length} item${this.watchlist.length === 1 ? '' : 's'}`;

    if (this.watchlist.length === 0) {
      this.emptyWatchlistMsg.classList.remove("hidden");
    } else {
      this.emptyWatchlistMsg.classList.add("hidden");
      this.watchlist.forEach(id => {
        const movie = MOVIE_DATABASE.find(m => m.id === id);
        if (movie) {
          const card = this.createMovieCard(movie);
          this.watchlistGrid.appendChild(card);
        }
      });
      lucide.createIcons();
    }
  }

  // --- Live Search ---
  triggerSearchDebounced() {
    clearTimeout(this.searchDebounceTimer);

    // Enter search layout
    this.navigateTo("search");
    this.searchHeading.textContent = `Results for "${this.searchQuery}"`;
    this.searchResultsGrid.innerHTML = "";
    this.searchSkeleton.classList.remove("hidden");
    this.noResultsMsg.classList.add("hidden");

    // Debounce to simulate premium network request delay (300ms)
    this.searchDebounceTimer = setTimeout(() => {
      this.searchSkeleton.classList.add("hidden");
      this.executeSearch();
    }, 400);
  }

  executeSearch() {
    const q = this.searchQuery.toLowerCase();
    const results = MOVIE_DATABASE.filter(movie => {
      return movie.title.toLowerCase().includes(q) ||
        movie.genres.some(g => g.toLowerCase().includes(q)) ||
        movie.cast.some(c => c.toLowerCase().includes(q));
    });

    this.renderSearchResults(results);
  }

  renderSearchResults(results) {
    this.searchResultsGrid.innerHTML = "";
    if (results.length === 0) {
      this.noResultsMsg.classList.remove("hidden");
      this.noResultsQuery.textContent = this.searchQuery;
    } else {
      this.noResultsMsg.classList.add("hidden");
      results.forEach(movie => {
        const card = this.createMovieCard(movie);
        this.searchResultsGrid.appendChild(card);
      });
      lucide.createIcons();
    }
  }

  // --- Movie Detail Modal Control ---
  openMovieDetail(movieId) {
    const movie = MOVIE_DATABASE.find(m => m.id === movieId);
    if (!movie) return;

    this.detailModal.dataset.movieId = movieId;
    this.modalBannerImg.src = movie.backdrop;
    this.modalBannerImg.alt = movie.title;
    this.modalTitle.textContent = movie.title;
    this.modalMatch.textContent = `${movie.match}% Match`;
    this.modalYear.textContent = movie.year;
    this.modalAge.textContent = movie.rating;
    this.modalDuration.textContent = movie.duration;
    this.modalSynopsis.textContent = movie.synopsis;
    this.modalCast.textContent = movie.cast.join(", ");
    this.modalGenres.textContent = movie.genres.join(", ");

    // Vibes text selection
    const vibeItem = document.getElementById("modal-vibes");
    if (movie.vibes) {
      vibeItem.textContent = movie.vibes.join(", ");
    }

    // Modal play click
    this.modalPlayBtn.onclick = () => {
      this.closeMovieDetail();
      this.playVideo(movieId);
    };

    // Modal watchlist setup
    const updateModalWatchlistBtn = () => {
      const inWatchlist = this.watchlist.includes(movie.id);
      this.modalWatchlistBtn.innerHTML = inWatchlist ? `<i data-lucide="check"></i>` : `<i data-lucide="plus"></i>`;
      this.modalWatchlistBtn.title = inWatchlist ? "Remove from List" : "Add to List";
      lucide.createIcons();
    };
    updateModalWatchlistBtn();

    this.modalWatchlistBtn.onclick = () => {
      this.toggleWatchlist(movie.id);
      updateModalWatchlistBtn();
    };

    this.modalLikeBtn.onclick = () => {
      this.showToast(`You liked "${movie.title}"`);
    };

    // Render TV Shows seasons & episodes dropdown
    if (movie.type === "tv" && movie.seasons) {
      this.modalEpisodesSection.classList.remove("hidden");
      this.seasonSelector.innerHTML = "";
      movie.seasons.forEach(s => {
        const option = document.createElement("option");
        option.value = s.season;
        option.textContent = `Season ${s.season}`;
        this.seasonSelector.appendChild(option);
      });
      this.renderEpisodesList(movieId, 1);
    } else {
      this.modalEpisodesSection.classList.add("hidden");
    }

    // Render Recommendations
    this.renderRecommendations(movie);

    // Show Detail Modal
    this.detailModal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // lock page scrolling
    lucide.createIcons();
  }

  renderEpisodesList(movieId, seasonNumber) {
    const movie = MOVIE_DATABASE.find(m => m.id === movieId);
    const season = movie.seasons.find(s => s.season === seasonNumber);

    this.episodesList.innerHTML = "";
    if (season) {
      season.episodes.forEach(ep => {
        const card = document.createElement("div");
        card.className = "episode-card";
        card.innerHTML = `
          <div class="ep-number">${ep.ep}</div>
          <div class="ep-thumbnail-wrapper">
            <img src="${movie.backdrop}" alt="${ep.title}">
            <div class="ep-play-overlay">
              <i data-lucide="play" style="fill:white; color:white; width:16px; height:16px;"></i>
            </div>
          </div>
          <div class="ep-details">
            <div class="ep-title-row">
              <span class="ep-title">${ep.title}</span>
              <span class="ep-duration">${ep.duration}</span>
            </div>
            <p class="ep-desc">${ep.desc}</p>
          </div>
        `;

        card.addEventListener("click", () => {
          this.closeMovieDetail();
          this.playVideo(movieId, `S${seasonNumber}:E${ep.ep} - ${ep.title}`);
        });

        this.episodesList.appendChild(card);
      });
      lucide.createIcons();
    }
  }

  renderRecommendations(currentMovie) {
    this.recommendationsGrid.innerHTML = "";

    // Filter recommendations by same type or genre (max 3 items)
    const recs = MOVIE_DATABASE.filter(m => m.id !== currentMovie.id &&
      (m.type === currentMovie.type || m.genres.some(g => currentMovie.genres.includes(g)))
    ).slice(0, 3);

    recs.forEach(movie => {
      const card = document.createElement("div");
      card.className = "rec-card";

      const inWatchlist = this.watchlist.includes(movie.id);
      const btnIcon = inWatchlist ? "check" : "plus";

      card.innerHTML = `
        <div class="rec-thumb-wrapper">
          <img src="${movie.backdrop}" alt="${movie.title}">
        </div>
        <div class="rec-content">
          <div class="rec-top">
            <span class="rec-title">${movie.title}</span>
            <span class="rec-match">${movie.match}% Match</span>
          </div>
          <div class="rec-meta">
            <span>${movie.year}</span>
            <span class="age-rating">${movie.rating}</span>
            <button class="card-btn rec-add-btn" style="margin-left: auto;">
              <i data-lucide="${btnIcon}"></i>
            </button>
          </div>
          <p class="rec-desc">${movie.synopsis.substring(0, 80)}...</p>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (!e.target.closest(".rec-add-btn")) {
          // Open new detailed movie
          this.openMovieDetail(movie.id);
        }
      });

      const addBtn = card.querySelector(".rec-add-btn");
      addBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleWatchlist(movie.id, addBtn);
      });

      this.recommendationsGrid.appendChild(card);
    });
  }

  closeMovieDetail() {
    this.detailModal.classList.add("hidden");
    document.body.style.overflow = ""; // unlock scrolling
  }

  // --- Simulated Custom Video Player ---
  playVideo(movieId, episodeInfo = "") {
    const movie = MOVIE_DATABASE.find(m => m.id === movieId);
    if (!movie) return;

    this.playerActive = true;
    this.isPlaying = true;
    this.playTime = 0;
    this.playbackSpeed = 1.0;

    // Seeding player titles
    this.playerMovieTitle.textContent = movie.title;
    this.playerEpisodeInfo.textContent = episodeInfo;
    this.playerCenterTitle.textContent = movie.title;

    // Simulate player background with movie poster blurred
    this.playerScreen.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('${movie.backdrop}')`;

    // Set play control icons
    this.playerPlayIcon.setAttribute("data-lucide", "pause");

    // Set time labels
    this.playerTimeCurrent.textContent = "00:00";

    // Parse duration strings
    let totalSeconds = 7200; // default 2 hours
    if (movie.duration.includes("h")) {
      const parts = movie.duration.split(" ");
      const hours = parseInt(parts[0]) || 0;
      const mins = parts[1] ? parseInt(parts[1]) : 0;
      totalSeconds = (hours * 3600) + (mins * 60);
    } else if (movie.duration.includes("Season")) {
      totalSeconds = 2700; // ~45 minutes for TV series episodes
    }
    this.playDuration = totalSeconds;
    this.playerTimeDuration.textContent = this.formatTime(totalSeconds);

    // Show Player Screen & Lock Body scroll
    this.playerContainer.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Start active player timer loop
    this.startPlayerTimer(movieId, episodeInfo);

    this.showToast(`Streaming ${movie.title}...`);
    this.resetPlayerIdleTimer();
    lucide.createIcons();
  }

  startPlayerTimer(movieId, episodeInfo) {
    clearInterval(this.playerTimer);

    this.playerTimer = setInterval(() => {
      if (this.isPlaying) {
        this.playTime += this.playbackSpeed;
        if (this.playTime >= this.playDuration) {
          this.playTime = this.playDuration;
          this.togglePlayback();
          this.showToast("Stream ended");
        }
        this.updatePlayerProgress();
      }
    }, 1000);
  }

  updatePlayerProgress() {
    const percent = (this.playTime / this.playDuration) * 100;
    this.seekBarFill.style.width = `${percent}%`;
    this.seekBarHandle.style.left = `${percent}%`;
    this.playerTimeCurrent.textContent = this.formatTime(this.playTime);
  }

  togglePlayback() {
    this.isPlaying = !this.isPlaying;

    // Show center icon feedback animation
    this.playerStateIcon.classList.remove("hidden");
    this.playerStateIcon.setAttribute("data-lucide", this.isPlaying ? "play" : "pause");
    lucide.createIcons();

    setTimeout(() => {
      this.playerStateIcon.classList.add("hidden");
    }, 500);

    // Update bottom controller icon
    this.playerPlayIcon.setAttribute("data-lucide", this.isPlaying ? "pause" : "play");
    lucide.createIcons();
  }

  skipTime(seconds) {
    this.playTime += seconds;
    if (this.playTime < 0) this.playTime = 0;
    if (this.playTime > this.playDuration) this.playTime = this.playDuration;

    this.updatePlayerProgress();
    this.showToast(seconds > 0 ? "Skipped forward 10s" : "Rewound 10s");
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.playerVolumeIcon.setAttribute("data-lucide", this.isMuted ? "volume-x" : (this.volume > 0.5 ? "volume-2" : "volume-1"));
    lucide.createIcons();

    this.volumeSliderFill.style.width = this.isMuted ? "0%" : `${this.volume * 100}%`;
    this.showToast(this.isMuted ? "Muted" : "Unmuted");
  }

  scrubVolume(e) {
    const rect = this.volumeSliderTrack.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    this.volume = Math.max(0, Math.min(1, percent));
    this.isMuted = false;

    this.volumeSliderFill.style.width = `${this.volume * 100}%`;
    this.playerVolumeIcon.setAttribute("data-lucide", this.volume > 0.5 ? "volume-2" : (this.volume === 0 ? "volume-x" : "volume-1"));
    lucide.createIcons();
  }

  scrubVideo(e) {
    const rect = this.seekBarTrack.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    this.playTime = Math.max(0, Math.min(this.playDuration, percent * this.playDuration));
    this.updatePlayerProgress();
  }

  changePlaybackSpeed() {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    let currentIndex = speeds.indexOf(this.playbackSpeed);
    let nextIndex = (currentIndex + 1) % speeds.length;
    this.playbackSpeed = speeds[nextIndex];
    this.playerSpeedBtn.textContent = `${this.playbackSpeed}x`;
    this.showToast(`Speed: ${this.playbackSpeed}x`);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.playerContainer.requestFullscreen().catch(err => {
        this.showToast("Fullscreen not supported");
      });
    } else {
      document.exitFullscreen();
    }
  }

  resetPlayerIdleTimer() {
    this.playerControlsOverlay.classList.remove("idle");
    document.body.style.cursor = "default";

    clearTimeout(this.idleControlsTimer);
    this.idleControlsTimer = setTimeout(() => {
      if (this.isPlaying && this.playerActive) {
        this.playerControlsOverlay.classList.add("idle");
        document.body.style.cursor = "none";
      }
    }, 3000);
  }

  closeVideoPlayer() {
    // Save progress to Continue Watching before exiting
    const movie = MOVIE_DATABASE.find(m => m.title === this.playerMovieTitle.textContent);
    if (movie && this.playTime > 60 && this.playTime < this.playDuration - 60) {
      const progressPercent = Math.round((this.playTime / this.playDuration) * 100);
      const timeRemaining = Math.round((this.playDuration - this.playTime) / 60);

      const existingIdx = this.continueWatchingData.findIndex(cw => cw.movieId === movie.id);
      const cwPayload = {
        movieId: movie.id,
        progress: progressPercent,
        timeLeft: `${timeRemaining}m left`,
        lastWatched: "Watched just now",
        epInfo: this.playerEpisodeInfo.textContent.split(" - ")[0] || undefined
      };

      if (existingIdx !== -1) {
        this.continueWatchingData[existingIdx] = cwPayload;
      } else {
        this.continueWatchingData.unshift(cwPayload);
      }
      this.saveContinueWatching();
    }

    this.playerActive = false;
    this.isPlaying = false;
    clearInterval(this.playerTimer);

    this.playerContainer.classList.add("hidden");
    document.body.style.overflow = "";
    document.body.style.cursor = "default";

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    this.showToast("Playback stopped");
    this.navigateTo(this.activeView);
  }

  // --- Profile Settings Manager ---
  renderProfileSettings() {
    if (!this.currentUser) return;
    const profiles = JSON.parse(localStorage.getItem(`cv_profiles_${this.currentUser.email}`)) || [];

    this.settingsProfilesGrid.innerHTML = "";
    profiles.forEach(profile => {
      const card = document.createElement("div");
      card.className = "settings-profile-card";
      card.innerHTML = `
        <div class="avatar-edit-wrapper" data-profile-id="${profile.id}">
          <img src="${profile.avatar}" alt="${profile.name}">
          <div class="avatar-edit-overlay">
            <i data-lucide="edit-2"></i>
          </div>
        </div>
        <input type="text" class="profile-name-input" data-profile-id="${profile.id}" value="${profile.name}">
      `;

      // Set input editing listener
      const input = card.querySelector(".profile-name-input");
      input.addEventListener("change", (e) => {
        this.updateProfileName(profile.id, e.target.value.trim());
      });

      // Avatar editing click handler
      card.querySelector(".avatar-edit-wrapper").addEventListener("click", () => {
        this.openAvatarPicker(profile.id);
      });

      this.settingsProfilesGrid.appendChild(card);
    });
  }

  updateProfileName(profileId, newName) {
    if (!newName) return;
    const profiles = JSON.parse(localStorage.getItem(`cv_profiles_${this.currentUser.email}`)) || [];
    const idx = profiles.findIndex(p => p.id === profileId);
    if (idx !== -1) {
      profiles[idx].name = newName;
      localStorage.setItem(`cv_profiles_${this.currentUser.email}`, JSON.stringify(profiles));
      this.showToast("Profile name updated");

      // If updating active profile, sync it
      if (this.currentProfile && this.currentProfile.id === profileId) {
        this.currentProfile.name = newName;
        localStorage.setItem("cv_profile", JSON.stringify(this.currentProfile));
      }
    }
  }

  openAvatarPicker(profileId) {
    const picker = document.createElement("div");
    picker.className = "avatar-picker-modal";
    picker.innerHTML = `
      <div class="avatar-picker-content">
        <h3>Choose your avatar</h3>
        <div class="avatar-options">
          ${DEFAULT_AVATARS.map(avatar => `
            <img src="${avatar}" alt="Avatar Option" class="avatar-option" data-src="${avatar}">
          `).join("")}
        </div>
        <button class="manage-profiles-btn" style="border-color:white; color:white;">Cancel</button>
      </div>
    `;

    picker.querySelectorAll(".avatar-option").forEach(opt => {
      opt.addEventListener("click", () => {
        const selectedAvatar = opt.dataset.src;
        this.updateProfileAvatar(profileId, selectedAvatar);
        document.body.removeChild(picker);
      });
    });

    picker.querySelector("button").addEventListener("click", () => {
      document.body.removeChild(picker);
    });

    document.body.appendChild(picker);
  }

  updateProfileAvatar(profileId, avatarSrc) {
    const profiles = JSON.parse(localStorage.getItem(`cv_profiles_${this.currentUser.email}`)) || [];
    const idx = profiles.findIndex(p => p.id === profileId);
    if (idx !== -1) {
      profiles[idx].avatar = avatarSrc;
      localStorage.setItem(`cv_profiles_${this.currentUser.email}`, JSON.stringify(profiles));
      this.showToast("Profile avatar updated");

      // Sync active avatar if needed
      if (this.currentProfile && this.currentProfile.id === profileId) {
        this.currentProfile.avatar = avatarSrc;
        localStorage.setItem("cv_profile", JSON.stringify(this.currentProfile));
        this.navbarAvatarImg.src = avatarSrc;
      }
      this.renderProfileSettings();
    }
  }

  // --- Notifications Helper ---
  renderNotifications() {
    this.notificationList.innerHTML = `
      <li class="notification-item" onclick="app.openMovieDetail('interstellar')">
        <img src="assets/interstellar.jpg" alt="Notification" class="notification-img">
        <div class="notification-text">
          <p><strong>Interstellar</strong> is now streaming! Join the epic stellar flight.</p>
          <span class="notification-time">10 minutes ago</span>
        </div>
      </li>
      <li class="notification-item" onclick="app.openMovieDetail('jujutsu-kaisen')">
        <img src="assets/Jujutsu Kaisen.jpg" alt="Notification" class="notification-img">
        <div class="notification-text">
          <p>New Episode: <strong>Jujutsu Kaisen</strong> Season 2 Episode 1 is live.</p>
          <span class="notification-time">3 hours ago</span>
        </div>
      </li>
      <li class="notification-item" onclick="app.openMovieDetail('avengers-endgame')">
        <img src="assets/Avengers Endgame.jpg" alt="Notification" class="notification-img">
        <div class="notification-text">
          <p>Trending: <strong>Avengers Endgame</strong> reaches #1 in Action category.</p>
          <span class="notification-time">1 day ago</span>
        </div>
      </li>
    `;
  }

  // --- Hero Section Helper ---
  renderHero() {
    const heroMovie = MOVIE_DATABASE[0];
    if (!heroMovie) return;
    
    const bgImg = document.getElementById("hero-bg-img");
    const title = document.getElementById("hero-title");
    const match = document.getElementById("hero-match");
    const year = document.getElementById("hero-year");
    const age = document.getElementById("hero-age");
    const duration = document.getElementById("hero-duration");
    const description = document.getElementById("hero-description");
    const genresContainer = document.getElementById("hero-genres");

    if (bgImg) bgImg.src = heroMovie.backdrop;
    if (title) title.textContent = heroMovie.title;
    if (match) match.textContent = `${heroMovie.match}% Match`;
    if (year) year.textContent = heroMovie.year;
    if (age) age.textContent = heroMovie.rating;
    if (duration) duration.textContent = heroMovie.duration;
    if (description) description.textContent = heroMovie.synopsis;
    if (genresContainer) {
      genresContainer.innerHTML = heroMovie.genres.map(g => `<span>${g}</span>`).join(" • ");
    }
  }

  renderNavbarProfileDropdown() {
    if (!this.currentUser) return;
    const profiles = JSON.parse(localStorage.getItem(`cv_profiles_${this.currentUser.email}`)) || [];

    this.profileSwitchList.innerHTML = "";
    profiles.forEach(p => {
      // Don't show currently active profile in list to switch
      if (this.currentProfile && p.id === this.currentProfile.id) return;

      const li = document.createElement("li");
      li.className = "profile-switch-item";
      li.innerHTML = `
        <img src="${p.avatar}" alt="${p.name}">
        <span>${p.name}</span>
      `;
      li.addEventListener("click", () => {
        this.selectProfile(p);
        this.profileDropdown.classList.add("hidden");
      });
      this.profileSwitchList.appendChild(li);
    });
  }

  // --- Helper Utilities ---
  formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const mStr = m < 10 ? `0${m}` : m;
    const sStr = s < 10 ? `0${s}` : s;

    if (h > 0) {
      return `${h}:${mStr}:${sStr}`;
    }
    return `${mStr}:${sStr}`;
  }

  showToast(message) {
    this.toastMessage.textContent = message;
    this.toastBanner.classList.add("show");

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastBanner.classList.remove("show");
    }, 3000);
  }
}

// --- App instantiation & boot ---
const app = new CineVerseApp();
window.addEventListener("DOMContentLoaded", () => {
  app.init();
});
window.app = app; // expose to HTML onclick triggers
