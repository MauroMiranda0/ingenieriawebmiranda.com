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
