// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// Enhanced Header scroll effect
let lastScrollY = 0;
let scrollTimeout;

function handleHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  const currentScrollY = window.scrollY;
  const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";

  // Clear timeout if scrolling continues
  clearTimeout(scrollTimeout);

  // Add scrolling class immediately
  header.classList.add("scrolling");

  // Update header state based on scroll position
  if (currentScrollY > 100) {
    header.classList.add("scrolled");
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.backdropFilter = "blur(20px)";
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.classList.remove("scrolled");
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }

  // Hide/show header based on scroll direction (only on mobile)
  if (window.innerWidth <= 768) {
    if (scrollDirection === "down" && currentScrollY > 200) {
      header.style.transform = "translateY(-100%)";
      // Close mobile menu when scrolling down
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".nav-menu");
      if (hamburger && navMenu) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    } else if (scrollDirection === "up" || currentScrollY <= 200) {
      header.style.transform = "translateY(0)";
    }
  } else {
    header.style.transform = "translateY(0)";
  }

  // Remove scrolling class after scroll ends
  scrollTimeout = setTimeout(() => {
    header.classList.remove("scrolling");
  }, 150);

  lastScrollY = currentScrollY;
}

// Throttled scroll event
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleHeaderScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Timeline interaction
const timelineItems = document.querySelectorAll(".timeline-item");
timelineItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove active class from all items
    timelineItems.forEach((i) => i.classList.remove("active"));
    // Add active class to clicked item
    item.classList.add("active");

    // Get the year and show related content
    const year = item.dataset.year;
    showTimelineContent(year);
  });
});

function showTimelineContent(year) {
  const contentMap = {
    1858: "Năm 1858, thực dân Pháp bắt đầu xâm lược và đặt ách đô hộ lên Việt Nam.",
    1939: "Thế chiến thứ 2 bùng nổ, tạo ra những biến động lớn trên thế giới.",
    1940: "Quân Nhật tiến vào Đông Dương, đe dọa vị thế của Pháp.",
    1941: "Mặt trận Việt Minh được thành lập, đánh dấu bước ngoặt quan trọng.",
    1944: "Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập.",
    1945: "Cách mạng Tháng Tám thành công, Việt Nam giành được độc lập.",
  };

  // Create or update info panel
  let infoPanel = document.querySelector(".timeline-info");
  if (!infoPanel) {
    infoPanel = document.createElement("div");
    infoPanel.className = "timeline-info";
    document.querySelector(".timeline-nav .container").appendChild(infoPanel);
  }

  infoPanel.innerHTML = `
        <div class="timeline-info-content">
            <h3>Năm ${year}</h3>
            <p>${contentMap[year]}</p>
        </div>
    `;

  infoPanel.style.display = "block";
  infoPanel.style.opacity = "0";
  setTimeout(() => {
    infoPanel.style.opacity = "1";
  }, 100);
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".uprising-card, .significance-item, .gallery-item, .prep-item"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);

    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// Enhanced Gallery functionality
const galleryItems = document.querySelectorAll(".gallery-item");
galleryItems.forEach((item, index) => {
  // Add staggered animation
  item.style.animationDelay = `${index * 0.1}s`;

  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const h4 = item.querySelector("h4");
    const p = item.querySelector("p");

    if (img && h4 && p) {
      // Create enhanced lightbox
      const lightbox = document.createElement("div");
      lightbox.className = "lightbox active";
      lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
          <button class="lightbox-close">
            <i class="fas fa-times"></i>
          </button>
          <div class="lightbox-image-container">
            <img src="${img.src}" alt="${img.alt}" class="lightbox-image">
            <div class="lightbox-info">
              <h3>${h4.textContent}</h3>
              <p>${p.textContent}</p>
              <div class="lightbox-actions">
                <button class="lightbox-btn download-btn">
                  <i class="fas fa-download"></i> Tải xuống
                </button>
                <button class="lightbox-btn share-btn">
                  <i class="fas fa-share"></i> Chia sẻ
                </button>
              </div>
            </div>
          </div>
          <div class="lightbox-navigation">
            <button class="nav-btn prev-btn" ${index === 0 ? "disabled" : ""}>
              <i class="fas fa-chevron-left"></i>
            </button>
            <span class="nav-counter">${index + 1} / ${
        galleryItems.length
      }</span>
            <button class="nav-btn next-btn" ${
              index === galleryItems.length - 1 ? "disabled" : ""
            }>
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(lightbox);
      document.body.style.overflow = "hidden";

      // Animation entrance
      setTimeout(() => {
        lightbox.querySelector(".lightbox-content").style.transform =
          "scale(1)";
        lightbox.querySelector(".lightbox-content").style.opacity = "1";
      }, 10);

      // Close lightbox functionality
      const closeBtn = lightbox.querySelector(".lightbox-close");
      const backdrop = lightbox.querySelector(".lightbox-backdrop");

      const closeLightbox = () => {
        lightbox.querySelector(".lightbox-content").style.transform =
          "scale(0.9)";
        lightbox.querySelector(".lightbox-content").style.opacity = "0";

        setTimeout(() => {
          if (document.body.contains(lightbox)) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = "";
          }
        }, 300);
      };

      closeBtn.addEventListener("click", closeLightbox);
      backdrop.addEventListener("click", closeLightbox);

      // Navigation functionality
      const prevBtn = lightbox.querySelector(".prev-btn");
      const nextBtn = lightbox.querySelector(".next-btn");

      if (!prevBtn.disabled) {
        prevBtn.addEventListener("click", () => {
          closeLightbox();
          setTimeout(() => galleryItems[index - 1].click(), 350);
        });
      }

      if (!nextBtn.disabled) {
        nextBtn.addEventListener("click", () => {
          closeLightbox();
          setTimeout(() => galleryItems[index + 1].click(), 350);
        });
      }

      // Keyboard navigation
      const handleKeyPress = (e) => {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft" && !prevBtn.disabled) prevBtn.click();
        if (e.key === "ArrowRight" && !nextBtn.disabled) nextBtn.click();
      };

      document.addEventListener("keydown", handleKeyPress);

      // Remove event listener when lightbox closes
      const originalCloseLightbox = closeLightbox;
      closeLightbox = () => {
        document.removeEventListener("keydown", handleKeyPress);
        originalCloseLightbox();
      };

      // Download functionality
      const downloadBtn = lightbox.querySelector(".download-btn");
      downloadBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = img.src;
        link.download = h4.textContent + ".jpg";
        link.click();
      });

      // Share functionality
      const shareBtn = lightbox.querySelector(".share-btn");
      shareBtn.addEventListener("click", () => {
        if (navigator.share) {
          navigator.share({
            title: h4.textContent,
            text: p.textContent,
            url: window.location.href,
          });
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(window.location.href).then(() => {
            shareBtn.innerHTML = '<i class="fas fa-check"></i> Đã sao chép';
            setTimeout(() => {
              shareBtn.innerHTML = '<i class="fas fa-share"></i> Chia sẻ';
            }, 2000);
          });
        }
      });
    }
  });

  // Add hover sound effect (optional)
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-10px) scale(1.02)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) scale(1)";
  });
});

// Search functionality
function createSearchBox() {
  const searchBox = document.createElement("div");
  searchBox.className = "search-box";
  searchBox.innerHTML = `
        <input type="text" placeholder="Tìm kiếm nội dung..." id="searchInput">
        <button id="searchBtn"><i class="fas fa-search"></i></button>
    `;

  document.querySelector(".nav-container").appendChild(searchBox);

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  function performSearch() {
    const query = searchInput.value.toLowerCase();
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const text = section.textContent.toLowerCase();
      if (text.includes(query) && query.length > 0) {
        section.style.backgroundColor = "#fff3cd";
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        section.style.backgroundColor = "";
      }
    });
  }

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
}

// Initialize search box
// createSearchBox();

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroImage = document.querySelector(".hero-image img");

  if (hero && heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add loading animation
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }

  // Animate hero content
  const heroElements = document.querySelectorAll(
    ".hero-title, .hero-subtitle, .hero-date, .cta-button"
  );
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 200);
  });
});

// Add scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    document.querySelector(".scroll-progress-bar").style.width =
      scrollPercent + "%";
  });
}

createScrollProgress();

// Add CSS for new elements
const additionalCSS = `
.timeline-info {
    margin-top: 2rem;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    display: none;
    transition: opacity 0.3s ease;
}

.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2rem;
    cursor: pointer;
}

.lightbox img {
    max-width: 100%;
    max-height: 70vh;
    border-radius: 10px;
}

.lightbox-caption {
    color: white;
    text-align: center;
    margin-top: 1rem;
}

.search-box {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 25px;
    padding: 0.5rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.search-box input {
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    width: 200px;
}

.search-box button {
    background: #d32f2f;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 50%;
    cursor: pointer;
}

.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(255,255,255,0.3);
    z-index: 1001;
}

.scroll-progress-bar {
    height: 100%;
    background: #ffd700;
    transition: width 0.1s ease;
}

@media (max-width: 768px) {
    .search-box {
        display: none;
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        padding: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
}
`;

// Add the additional CSS to the page
const style = document.createElement("style");
style.textContent = additionalCSS;
document.head.appendChild(style);

// Create particle background
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 4 + 4 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Loading screen animation
function showLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");

  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    setTimeout(() => {
      loadingScreen.style.display = "none";
      startPageAnimations();
    }, 500);
  }, 1500); // Reduced from 2500ms to 1500ms
}

// Enhanced scroll animations
function enhancedScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Different animations based on element type
        if (element.classList.contains("uprising-card")) {
          element.style.animation = "slideInFromBottom 0.8s ease forwards";
        } else if (element.classList.contains("significance-item")) {
          element.style.animation = "zoomIn 0.6s ease forwards";
        } else if (element.classList.contains("gallery-item")) {
          element.style.animation = "fadeInUp 0.6s ease forwards";
        } else if (element.classList.contains("video-item")) {
          element.style.animation = "fadeInLeft 0.8s ease forwards";
        } else if (element.classList.contains("document-category")) {
          element.style.animation = "fadeInRight 0.8s ease forwards";
        } else {
          element.style.animation = "fadeInUp 0.6s ease forwards";
        }

        // Add stagger effect for multiple elements
        const siblings = Array.from(element.parentElement.children);
        const index = siblings.indexOf(element);
        element.style.animationDelay = index * 0.1 + "s";
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document
    .querySelectorAll(
      ".uprising-card, .significance-item, .gallery-item, .video-item, .document-category, .prep-item"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      observer.observe(el);
    });
}

// Typing effect for hero title
function typewriterEffect() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  heroTitle.style.opacity = "1";

  let i = 0;
  const typeInterval = setInterval(() => {
    heroTitle.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typeInterval);
    }
  }, 100);
}

// Start page animations after loading
function startPageAnimations() {
  enhancedScrollAnimations();
  addTouchSupport();
  optimizeForMobile();

  // Delayed typewriter effect
  setTimeout(() => {
    typewriterEffect();
  }, 500);
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log(
    "Cách mạng Tháng Tám 1945 - Enhanced Website loaded successfully!"
  );

  // Create particles
  createParticles();

  // Show loading screen
  showLoadingScreen();
});

// Video interaction for YouTube iframe
document.addEventListener("DOMContentLoaded", function () {
  const videoContainer = document.querySelector(".video-container");
  const videoInfoOverlay = document.querySelector(".video-info-overlay");

  if (videoContainer && videoInfoOverlay) {
    // Add click event to hide overlay when clicking on video
    videoContainer.addEventListener("click", function () {
      // Optional: You can add additional interactions here
      console.log("Video container clicked");
    });

    // Add some visual feedback
    videoContainer.addEventListener("mouseenter", function () {
      videoContainer.style.transform = "translateY(-5px) scale(1.02)";
    });

    videoContainer.addEventListener("mouseleave", function () {
      videoContainer.style.transform = "translateY(0) scale(1)";
    });
  }
});

// Debug function to check video elements
function debugVideoElements() {
  console.log("=== Video Debug Information ===");

  const elements = {
    videoContainer: document.getElementById("videoContainer"),
    videoThumbnail: document.getElementById("videoThumbnail"),
    videoPlayer: document.getElementById("videoPlayer"),
    playButton: document.querySelector(".play-button"),
    playButtonOverlay: document.querySelector(".play-button-overlay"),
    iframe: document.querySelector("#videoPlayer iframe"),
  };

  Object.keys(elements).forEach((key) => {
    const element = elements[key];
    console.log(`${key}:`, element ? "Found" : "Not found", element);
    if (element && element.style) {
      console.log(`${key} styles:`, {
        display: element.style.display,
        opacity: element.style.opacity,
        visibility: element.style.visibility,
      });
    }
  });

  console.log("=== End Video Debug ===");
}

// Video Player Functionality
function initVideoPlayer() {
  console.log("Initializing video player...");
  debugVideoElements();

  const videoContainer = document.getElementById("videoContainer");
  const videoThumbnail = document.getElementById("videoThumbnail");
  const videoPlayer = document.getElementById("videoPlayer");
  const playButton = document.querySelector(".play-button");

  console.log("Video elements found:", {
    container: !!videoContainer,
    thumbnail: !!videoThumbnail,
    player: !!videoPlayer,
    playButton: !!playButton,
  });

  if (videoThumbnail && videoPlayer) {
    // Add click event to both thumbnail and play button
    const playVideo = function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Play video clicked");

      try {
        // Hide thumbnail
        videoThumbnail.style.display = "none";
        console.log("Thumbnail hidden");

        // Show video player
        videoPlayer.style.display = "block";
        videoPlayer.classList.add("active");
        console.log("Video player shown");

        // Set iframe src with autoplay
        const iframe = videoPlayer.querySelector("iframe");
        if (iframe) {
          const videoSrc = iframe.getAttribute("data-src");
          if (videoSrc) {
            iframe.src = videoSrc + "&autoplay=1&rel=0";
            console.log("Video iframe src set to:", iframe.src);
          } else {
            // Fallback URL
            iframe.src =
              "https://www.youtube.com/embed/5uwqWetmHY8?si=j-pzQAqTrR73M1ZN&autoplay=1&rel=0";
            console.log("Using fallback video URL");
          }
        }

        // Add playing class to container
        if (videoContainer) {
          videoContainer.classList.add("playing");
          console.log("Playing class added to container");
        }

        // Add fade in animation
        videoPlayer.style.opacity = "0";
        videoPlayer.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
          videoPlayer.style.opacity = "1";
          console.log("Video fade in completed");
        }, 50);
      } catch (error) {
        console.error("Error playing video:", error);
      }
    };

    // Add event listeners
    videoThumbnail.addEventListener("click", playVideo);
    console.log("Click event added to thumbnail");

    if (playButton) {
      playButton.addEventListener("click", playVideo);
      console.log("Click event added to play button");
    }

    // Also add event listener to the entire video container
    if (videoContainer) {
      videoContainer.addEventListener("click", playVideo);
      console.log("Click event added to container");
    }

    console.log("Video player initialization completed successfully");
  } else {
    console.error(
      "Video elements not found - thumbnail:",
      !!videoThumbnail,
      "player:",
      !!videoPlayer
    );
  }
}

// Initialize video player when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing video player");
  initVideoPlayer();
});

// Also initialize when window loads (backup)
window.addEventListener("load", function () {
  console.log("Window loaded, initializing video player (backup)");
  initVideoPlayer();
});

// Responsive window resize handler
function handleWindowResize() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (window.innerWidth > 768) {
    // Desktop view - ensure mobile menu is closed
    if (hamburger && navMenu) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }

    // Reset header transform
    const header = document.querySelector(".header");
    if (header) {
      header.style.transform = "translateY(0)";
    }
  }
}

// Add window resize listener
window.addEventListener("resize", handleWindowResize);

// Touch support for mobile interactions
function addTouchSupport() {
  // Add touch feedback for buttons
  const buttons = document.querySelectorAll(
    ".cta-button, .lightbox-btn, .nav-btn"
  );

  buttons.forEach((button) => {
    button.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.95)";
    });

    button.addEventListener("touchend", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Add touch feedback for gallery items
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    item.addEventListener("touchstart", function () {
      this.style.transform = "translateY(-5px) scale(1.01)";
    });

    item.addEventListener("touchend", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Swipe support for lightbox navigation
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    // Check if lightbox is open
    const lightbox = document.querySelector(".lightbox");
    if (lightbox) {
      if (swipeDistance > swipeThreshold) {
        // Swipe right - previous image
        const prevBtn = lightbox.querySelector(".prev-btn");
        if (prevBtn && !prevBtn.disabled) {
          prevBtn.click();
        }
      } else if (swipeDistance < -swipeThreshold) {
        // Swipe left - next image
        const nextBtn = lightbox.querySelector(".next-btn");
        if (nextBtn && !nextBtn.disabled) {
          nextBtn.click();
        }
      }
    }
  }
}

// Performance optimization for mobile
function optimizeForMobile() {
  // Reduce particles on mobile
  if (window.innerWidth <= 768) {
    const particles = document.querySelectorAll(".particle");
    particles.forEach((particle, index) => {
      if (index % 2 === 0) {
        particle.style.display = "none";
      }
    });
  }

  // Lazy loading for images
  const images = document.querySelectorAll("img");
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            observer.unobserve(img);
          }
        }
      });
    });

    images.forEach((img) => {
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  }
}

// Orientation change handler
function handleOrientationChange() {
  // Recalculate layout after orientation change
  setTimeout(() => {
    handleWindowResize();

    // Close mobile menu on orientation change
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    if (hamburger && navMenu) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }, 100);
}

window.addEventListener("orientationchange", handleOrientationChange);

// Initialize touch support and mobile optimizations
addTouchSupport();
optimizeForMobile();
