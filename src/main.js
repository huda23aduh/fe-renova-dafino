// global styles and 3rd-party CSS (Font Awesome) are imported so Vite bundles them
import "../global.css";

import router from "./router.js";
import Navbar, { mountNavbar } from "./components/sections/navbar.js";
import Footer from "./components/sections/footer.js";

export default function initApp() {
  const app = document.getElementById("app");

  function render() {
    app.innerHTML = `
      <header id="navbar"></header>
      <main id="page-content"></main>
      <footer id="footer"></footer>
    `;

    document.getElementById("navbar").innerHTML = Navbar();
    mountNavbar();
    router(); // render halaman aktif
    
    // Update footer visibility berdasarkan halaman
    updateFooterVisibility();
    updateNavbarVisibility();
  }

  render();
}

// Function untuk menampilkan/sembunyikan footer
function updateFooterVisibility() {
  const page = window.location.hash.replace("#", "") || "home";
  const footerEl = document.getElementById("footer");
  const showFooterPages = ["home"];
  
  if (showFooterPages.includes(page)) {
    footerEl.innerHTML = Footer();
  } else {
    footerEl.innerHTML = "";
  }
}

function updateNavbarVisibility() {
  const page = window.location.hash.replace("#", "") || "home";
  const navbarEl = document.getElementById("navbar");
  const hideNavbarPages = ["login", "register", "forgot-password", "mitra-login", "mitra-register"];

  if (!navbarEl) return;

  if (hideNavbarPages.includes(page)) {
    navbarEl.classList.add("hidden");
  } else {
    if (!navbarEl.innerHTML.trim()) {
      navbarEl.innerHTML = Navbar();
      mountNavbar();
    }
    navbarEl.classList.remove("hidden");
  }
}

// Update footer saat hash berubah
window.addEventListener("hashchange", () => {
  updateFooterVisibility();
  updateNavbarVisibility();
});

initApp();
