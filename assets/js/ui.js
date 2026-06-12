(() => {
  const yearEl = document.getElementById("copyright-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const toggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!toggle || !mobileMenu) return;

  const icon = toggle.querySelector(".material-icons");

  const closeMenu = () => {
    mobileMenu.setAttribute("hidden", "");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    if (icon) icon.textContent = "menu";
  };

  const openMenu = () => {
    mobileMenu.removeAttribute("hidden");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú");
    if (icon) icon.textContent = "close";
  };

  toggle.addEventListener("click", () => {
    if (mobileMenu.hasAttribute("hidden")) {
      openMenu();
    } else {
      closeMenu();
    }
  });
})();

(() => {
  const dialogTriggers = document.querySelectorAll("[data-dialog-target]");
  if (!dialogTriggers.length) return;

  const closeDialog = (dialog) => {
    if (dialog?.open) {
      dialog.close();
    }
  };

  dialogTriggers.forEach((trigger) => {
    const targetId = trigger.getAttribute("data-dialog-target");
    const dialog = targetId ? document.getElementById(targetId) : null;
    if (!dialog || typeof dialog.showModal !== "function") return;

    trigger.addEventListener("click", (event) => {
      if (trigger.tagName === "A") {
        event.preventDefault();
      }

      dialog.showModal();
    });
  });

  document.querySelectorAll(".blog-card-dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isInside) {
        closeDialog(dialog);
      }
    });

    dialog.querySelectorAll("[data-dialog-close]").forEach((button) => {
      button.addEventListener("click", () => closeDialog(dialog));
    });
  });
})();

(() => {
  const cardLinks = document.querySelectorAll(".fix-btn-blog .trigger[href]");
  if (!cardLinks.length) return;

  cardLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      event.preventDefault();

      const wrapper = link.closest(".fix-btn-blog");
      if (!wrapper) {
        window.location.href = href;
        return;
      }

      link.classList.add("active");
      wrapper.querySelector(".istria-over")?.classList.add("active");
      wrapper.querySelectorAll(".istria-line").forEach((line) => line.classList.add("active"));

      window.setTimeout(() => {
        window.location.href = href;
      }, 180);
    });
  });
})();

(() => {
  const transitionValue = "transform 1000ms cubic-bezier(0.22, 0.8, 0.2, 1)";
  const autoPlayDelay = 4800;
  const carousel = document.getElementById("areas-carousel");
  const viewport = document.getElementById("areas-carousel-viewport");
  const track = document.getElementById("areas-carousel-track");
  const prevButton = document.getElementById("areas-prev");
  const nextButton = document.getElementById("areas-next");

  if (!carousel || !viewport || !track || !prevButton || !nextButton) return;

  const originalSlides = Array.from(track.querySelectorAll(".areas-carousel-slide"));
  if (!originalSlides.length) return;

  const makeSlideSet = (label) =>
    originalSlides.map((slide) => {
      const clone = slide.cloneNode(true);
      clone.setAttribute("data-slide-set", label);
      return clone;
    });

  track.replaceChildren(
    ...makeSlideSet("far-prepend"),
    ...makeSlideSet("prepend"),
    ...originalSlides,
    ...makeSlideSet("append"),
    ...makeSlideSet("far-append"),
  );

  let slides = Array.from(track.querySelectorAll(".areas-carousel-slide"));
  let currentIndex = originalSlides.length * 2;
  let isTransitioning = false;
  let autoPlayId = 0;
  const centralStartIndex = originalSlides.length * 2;
  const centralEndIndex = centralStartIndex + originalSlides.length - 1;

  const getLogicalIndex = (index) => {
    const total = originalSlides.length;
    return ((index % total) + total) % total;
  };

  const normalizeToCentralRange = (index) => centralStartIndex + getLogicalIndex(index);

  const setTrackPosition = (index, animate = true) => {
    const activeSlide = slides[index];
    if (!activeSlide) return;

    const slideCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;
    const viewportCenter = viewport.clientWidth / 2;
    const offset = Math.max(0, slideCenter - viewportCenter);

    track.style.transition = animate ? transitionValue : "none";
    track.style.transform = `translateX(-${offset}px)`;
  };

  const updateActiveState = () => {
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });
  };

  const update = (animate = true) => {
    setTrackPosition(currentIndex, animate);
    updateActiveState();
  };

  const recenterIfNeeded = () => {
    if (currentIndex >= centralStartIndex - 1 && currentIndex <= centralEndIndex + 1) return;

    currentIndex = normalizeToCentralRange(currentIndex);
    update(false);
  };

  const goTo = (index) => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = index;
    update(true);
  };

  const stopAutoPlay = () => {
    if (!autoPlayId) return;
    window.clearInterval(autoPlayId);
    autoPlayId = 0;
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayId = window.setInterval(() => {
      if (!document.hidden && !isTransitioning) {
        goTo(currentIndex + 1);
      }
    }, autoPlayDelay);
  };

  prevButton.addEventListener("click", () => goTo(currentIndex - 1));
  nextButton.addEventListener("click", () => goTo(currentIndex + 1));
  prevButton.addEventListener("click", startAutoPlay);
  nextButton.addEventListener("click", startAutoPlay);

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(currentIndex - 1);
      startAutoPlay();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(currentIndex + 1);
      startAutoPlay();
    }
  });

  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);
  carousel.addEventListener("focusin", stopAutoPlay);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      startAutoPlay();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  track.addEventListener("transitionend", () => {
    window.requestAnimationFrame(() => {
      recenterIfNeeded();
      track.style.transition = transitionValue;
      isTransitioning = false;
      updateActiveState();
    });
  });

  window.addEventListener("resize", () => update(false));

  carousel.setAttribute("tabindex", "0");
  update(false);
  startAutoPlay();
})();
