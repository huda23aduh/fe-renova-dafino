// global styles and 3rd-party CSS (Font Awesome) are imported so Vite bundles them
import "../global.css";

// Source code protection
// import "./components/sections/source-protection.js";

import router from "./router.js";
import Navbar, { mountNavbar } from "./components/sections/navbar.js";
import Footer from "./components/sections/footer.js";

// Global toast notification function
window.showToast = function (message, type = 'success', duration = 3000) {
  // Remove existing toast
  const existingToast = document.getElementById('global-toast');
  if (existingToast) existingToast.remove();

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle';

  const toast = document.createElement('div');
  toast.id = 'global-toast';
  toast.className = `fixed top-0 left-0 w-full h-full z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300`;
  toast.innerHTML = `
    <div class="${bgColor} text-white px-8 py-6 rounded-2xl shadow-2xl flex items-center gap-4 max-w-md mx-4 transform scale-100 transition-transform duration-300">
      <i class="fa-solid ${icon} text-3xl"></i>
      <p class="text-lg font-semibold">${message}</p>
    </div>
  `;

  document.body.appendChild(toast);

  // Auto remove after duration
  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, duration);

  // Click to dismiss
  toast.addEventListener('click', () => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 300);
  });
};

// Global confirm dialog function
window.showConfirm = function (message, onConfirm, onCancel) {
  // Remove existing confirm
  const existingConfirm = document.getElementById('global-confirm');
  if (existingConfirm) existingConfirm.remove();

  const confirm = document.createElement('div');
  confirm.id = 'global-confirm';
  confirm.className = `fixed top-0 left-0 w-full h-full z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300`;
  confirm.innerHTML = `
    <div class="bg-white text-gray-800 px-8 py-6 rounded-2xl shadow-2xl max-w-md mx-4">
      <div class="flex items-center gap-4 mb-4">
        <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
          <i class="fa-solid fa-question text-yellow-500 text-2xl"></i>
        </div>
        <p class="text-lg font-semibold">${message}</p>
      </div>
      <div class="flex gap-3 justify-end">
        <button id="confirm-cancel" class="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">Tidak</button>
        <button id="confirm-ok" class="px-6 py-2 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition">Ya</button>
      </div>
    </div>
  `;

  document.body.appendChild(confirm);

  document.getElementById('confirm-ok').addEventListener('click', () => {
    confirm.remove();
    if (onConfirm) onConfirm();
  });

  document.getElementById('confirm-cancel').addEventListener('click', () => {
    confirm.remove();
    if (onCancel) onCancel();
  });
};

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
  const hideNavbarPages = ["login", "register", "forgot-password", "mitra-login", "mitra-register", "admin-dashboard", "admin-users", "admin-testdrive", "admin-change-password", "admin-login", "brand-catalog-admin", "contact-admin"];

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

// Check for pending toast message after page load
const pendingToast = sessionStorage.getItem('pendingToast');
if (pendingToast) {
  const { message, type } = JSON.parse(pendingToast);
  sessionStorage.removeItem('pendingToast');
  setTimeout(() => {
    if (window.showToast) window.showToast(message, type);
  }, 500);
}
