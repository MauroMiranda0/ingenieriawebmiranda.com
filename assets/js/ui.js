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
