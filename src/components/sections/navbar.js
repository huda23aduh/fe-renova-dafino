import { carsData } from "../../data/mockData.js";

function getUserSession() {
  const session = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
  return session ? JSON.parse(session) : null;
}

export default function Navbar() {
  const user = getUserSession();
  
  return `
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#14213D] text-white px-4 md:px-10 lg:px-20 py-4 flex items-center justify-between mobile-nav-padding">
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <img src="/images/logo.png" alt="Renova Logo" class="h-20 w-auto" />
    </div>

    <!-- Desktop Nav Links -->
    <div class="hidden lg:flex gap-2 text-sm font-medium">
      <a href="#home" data-nav="home" class="px-3 py-2 sm:px-4 sm:py-2 rounded-full text-white font-bold hover:opacity-80 transition-colors btn-mobile" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 40%, #14213D 60%, #FFB703 100%);">HOME</a>
      <a href="#brand" data-nav="brand" class="px-3 py-2 sm:px-4 sm:py-2 rounded-full text-white font-bold hover:opacity-80 transition-colors btn-mobile" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 40%, #14213D 60%, #FFB703 100%);">BRAND</a>
      <a href="#news" data-nav="news" class="px-3 py-2 sm:px-4 sm:py-2 rounded-full text-white font-bold hover:opacity-80 transition-colors btn-mobile" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 40%, #14213D 60%, #FFB703 100%);">BERITA</a>
      <a href="#contact" data-nav="contact" class="px-3 py-2 sm:px-4 sm:py-2 rounded-full text-white font-bold hover:opacity-80 transition-colors btn-mobile" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 40%, #14213D 60%, #FFB703 100%);">CONTACT</a>
    </div>

    <!-- Right Icons -->
    <div class="flex gap-6 items-center text-xl">
      <span class="w-10 h-10 flex items-center justify-center rounded-full lg:hidden cursor-pointer hover:opacity-80 transition-all duration-300 transform" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);" id="menu-btn">
        <i class="fa-solid fa-bars transition-all duration-300" id="menu-icon"></i>
      </span>

      <div class="hidden lg:flex gap-2 items-center text-lg">
        <span id="search-btn-desktop" class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 transition-colors" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);"><i class="fa-solid fa-magnifying-glass"></i></span>
        <span id="favorite-btn-desktop" class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 transition-colors relative" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);"><i class="fa-regular fa-heart"></i><span id="favorite-count-desktop" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center hidden">0</span></span>
        <span id="notification-btn-desktop" class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 transition-colors relative" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);"><i class="fa-regular fa-bell"></i><span id="notification-count-desktop" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center hidden">0</span></span>
        
        <!-- User Icon Dropdown -->
        <div class="relative flex items-center gap-2">
          ${user ? `<span class="text-sm font-semibold text-[#FFB703] hidden xl:block">Halo, ${user.name.split(' ')[0]}</span>` : ''}
          <span class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 transition-colors" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);" id="user-icon-desktop">
            <i class="fa-regular fa-user"></i>
          </span>
          
          <!-- Dropdown Menu -->
          <div id="user-dropdown-desktop" class="hidden absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            ${user ? `
              <div class="px-4 py-2 border-b border-gray-200">
                <p class="text-sm font-bold text-gray-800">${user.name}</p>
                <p class="text-xs text-gray-500">${user.email}</p>
              </div>
              <a href="#profile" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm">
                <i class="fa-solid fa-user mr-2 text-black"></i>Profil Saya
              </a>
              <button id="logout-btn-desktop" class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors text-sm">
                <i class="fa-solid fa-sign-out mr-2"></i>Keluar
              </button>
            ` : `
              <a href="#login" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm">
                <i class="fa-solid fa-sign-in mr-2 text-black"></i>Masuk
              </a>
              <a href="#register" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm">
                <i class="fa-solid fa-user-plus mr-2 text-black"></i>Daftar
              </a>
            `}
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu - Full Screen -->
  <div id="mobile-menu" class="fixed inset-0 top-20 lg:hidden z-40 bg-linear-to-b from-[#14213D]/95 to-[#0f172a] backdrop-blur-sm flex-col items-center justify-center gap-8 px-6 py-12 hidden opacity-0 transition-all duration-300" style="">
    <!-- Menu Links -->
    <div class="flex flex-col gap-4 w-full max-w-xs">
      <a href="#home" data-nav="home" class="px-4 py-3 sm:px-6 sm:py-4 rounded-full text-white font-bold text-center text-base sm:text-lg hover:opacity-90 transition-all transform hover:scale-105 btn-mobile" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">HOME</a>
      <a href="#brand" data-nav="brand" class="px-4 py-3 sm:px-6 sm:py-4 rounded-full text-white font-bold text-center text-base sm:text-lg hover:opacity-90 transition-all transform hover:scale-105 btn-mobile" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">BRAND</a>
      <a href="#news" data-nav="news" class="px-4 py-3 sm:px-6 sm:py-4 rounded-full text-white font-bold text-center text-base sm:text-lg hover:opacity-90 transition-all transform hover:scale-105 btn-mobile" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">BERITA</a>
      <a href="#contact" data-nav="contact" class="px-4 py-3 sm:px-6 sm:py-4 rounded-full text-white font-bold text-center text-base sm:text-lg hover:opacity-90 transition-all transform hover:scale-105 btn-mobile" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">CONTACT</a>
    </div>
    
    <!-- Divider -->
    <div class="w-32 h-px bg-linear-to-r from-transparent via-amber-500 to-transparent"></div>
    
    <!-- Icons -->
    <div class="flex gap-6 text-2xl justify-center relative">
      <span id="search-btn-mobile" class="w-12 h-12 flex items-center justify-center rounded-full text-white cursor-pointer hover:opacity-80 transition-all transform hover:scale-110" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);"><i class="fa-solid fa-magnifying-glass"></i></span>
      <span id="favorite-btn-mobile" class="w-12 h-12 flex items-center justify-center rounded-full text-white cursor-pointer hover:opacity-80 transition-all transform hover:scale-110 relative" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);"><i class="fa-regular fa-heart"></i><span id="favorite-count-mobile" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center hidden">0</span></span>
      <span id="notification-btn-mobile" class="w-12 h-12 flex items-center justify-center rounded-full text-white cursor-pointer hover:opacity-80 transition-all transform hover:scale-110 relative" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);"><i class="fa-regular fa-bell"></i><span id="notification-count-mobile" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center hidden">0</span></span>
      
      <!-- Mobile User Icon with Dropdown -->
      <div class="relative">
        <span class="w-12 h-12 flex items-center justify-center rounded-full text-white cursor-pointer hover:opacity-80 transition-all transform hover:scale-110" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);" id="user-icon-mobile">
          <i class="fa-regular fa-user"></i>
        </span>
        
        <!-- Mobile Dropdown Menu -->
        <div id="user-dropdown-mobile" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          ${user ? `
            <div class="px-4 py-2 border-b border-gray-200">
              <p class="text-sm font-bold text-gray-800">${user.name}</p>
              <p class="text-xs text-gray-500">${user.email}</p>
            </div>
            <a href="#profile" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm">
              <i class="fa-solid fa-user mr-2 text-black"></i>Profil Saya
            </a>
            <button id="logout-btn-mobile" class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors text-sm">
              <i class="fa-solid fa-sign-out mr-2"></i>Keluar
            </button>
          ` : `
            <a href="#login" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm">
              <i class="fa-solid fa-sign-in mr-2 text-black"></i>Login
            </a>
            <a href="#mitra-login" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm">
              <i class="fa-solid fa-people-group mr-2 text-black"></i>Masuk Mitra
            </a>
            <a href="#mitra-register" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm">
              <i class="fa-solid fa-user-plus mr-2 text-black"></i>Daftar Mitra
            </a>
          `}
        </div>
      </div>
    </div>
  </div>
  <!-- Favorite Modal -->
  <div id="favorite-modal" class="fixed inset-0 z-[100] hidden">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" id="favorite-modal-overlay"></div>
    <div class="relative z-10 flex items-start justify-center pt-24 px-4">
      <div class="bg-[#14213D] rounded-2xl p-6 w-full max-w-2xl shadow-2xl border-2 border-[#FFB703]">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-white"><i class="fa-solid fa-heart text-red-500 mr-2"></i>Mobil Favorit</h3>
          <button id="favorite-close-btn" class="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFB703] text-[#14213D] hover:opacity-80 transition">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div id="favorite-list" class="max-h-[400px] overflow-y-auto">
          <p class="text-gray-400 text-center py-8">Belum ada mobil favorit</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Search Modal -->
  <div id="search-modal" class="fixed inset-0 z-[100] hidden">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" id="search-modal-overlay"></div>
    <div class="relative z-10 flex items-start justify-center pt-24 px-4">
      <div class="bg-[#14213D] rounded-2xl p-6 w-full max-w-2xl shadow-2xl border-2 border-[#FFB703]">
        <div class="flex items-center gap-4 mb-4">
          <div class="flex-1 relative">
            <input type="text" id="search-input" placeholder="Cari mobil, brand, atau tipe..." 
              class="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-[#FFB703] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB703]">
            <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[#FFB703]"></i>
          </div>
          <button id="search-close-btn" class="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFB703] text-[#14213D] hover:opacity-80 transition">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div id="search-results" class="max-h-[400px] overflow-y-auto">
          <p class="text-gray-400 text-center py-8">Ketik untuk mencari mobil...</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Notification Modal -->
  <div id="notification-modal" class="fixed inset-0 z-[100] hidden">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" id="notification-modal-overlay"></div>
    <div class="relative z-10 flex items-start justify-center pt-24 px-4">
      <div class="bg-[#14213D] rounded-2xl p-6 w-full max-w-2xl shadow-2xl border-2 border-[#FFB703]">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-white"><i class="fa-solid fa-bell text-[#FFB703] mr-2"></i>Notifikasi</h3>
          <button id="notification-close-btn" class="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFB703] text-[#14213D] hover:opacity-80 transition">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div id="notification-list" class="max-h-[400px] overflow-y-auto">
          <p class="text-gray-400 text-center py-8">Tidak ada notifikasi</p>
        </div>
        <div class="mt-4 flex justify-between">
          <button id="mark-all-read-btn" class="px-4 py-2 bg-[#FFB703] text-[#14213D] rounded-lg hover:bg-yellow-500 transition text-sm font-medium">
            Tandai Semua Dibaca
          </button>
          <button id="clear-notifications-btn" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium">
            Hapus Semua
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
}

export function mountNavbar() {
  // Desktop user icon dropdown
  const userIconDesktop = document.getElementById('user-icon-desktop');
  const userDropdownDesktop = document.getElementById('user-dropdown-desktop');
  
  if (userIconDesktop && userDropdownDesktop) {
    userIconDesktop.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdownDesktop.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      userDropdownDesktop.classList.add('hidden');
    });
  }
  
  // Mobile user icon dropdown
  const userIconMobile = document.getElementById('user-icon-mobile');
  const userDropdownMobile = document.getElementById('user-dropdown-mobile');
  
  if (userIconMobile && userDropdownMobile) {
    userIconMobile.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdownMobile.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      userDropdownMobile.classList.add('hidden');
    });
  }
  
  // Hamburger menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  
  if (menuBtn && mobileMenu && menuIcon) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        mobileMenu.classList.add('opacity-100');
        mobileMenu.classList.remove('opacity-0');
        
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark', 'rotate-90');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        mobileMenu.classList.remove('opacity-100');
        mobileMenu.classList.add('opacity-0');
        
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-xmark', 'rotate-90');
      }
    });
    
    // Close menu saat klik link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        mobileMenu.classList.remove('opacity-100');
        mobileMenu.classList.add('opacity-0');
        
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-xmark', 'rotate-90');
      });
    });
  }

  // Search functionality
  const searchBtnDesktop = document.getElementById('search-btn-desktop');
  const searchBtnMobile = document.getElementById('search-btn-mobile');
  const searchModal = document.getElementById('search-modal');
  const searchModalOverlay = document.getElementById('search-modal-overlay');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  function openSearchModal() {
    searchModal.classList.remove('hidden');
    searchInput.focus();
  }

  function closeSearchModal() {
    searchModal.classList.add('hidden');
    searchInput.value = '';
    searchResults.innerHTML = '<p class="text-gray-400 text-center py-8">Ketik untuk mencari mobil...</p>';
  }

  function renderSearchResults(query) {
    if (!query.trim()) {
      searchResults.innerHTML = '<p class="text-gray-400 text-center py-8">Ketik untuk mencari mobil...</p>';
      return;
    }

    const filtered = carsData.filter(car => 
      car.brand.toLowerCase().includes(query.toLowerCase()) ||
      (car.name && car.name.toLowerCase().includes(query.toLowerCase())) ||
      (car.type && car.type.toLowerCase().includes(query.toLowerCase()))
    );

    if (filtered.length === 0) {
      searchResults.innerHTML = '<p class="text-gray-400 text-center py-8">Tidak ada hasil ditemukan</p>';
      return;
    }

    searchResults.innerHTML = filtered.map(car => `
      <div class="search-result-item flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition" data-car-id="${car.id}" data-brand="${car.brand}">
        <img src="${car.image}" class="w-16 h-12 object-cover rounded-lg">
        <div class="flex-1">
          <h4 class="text-white font-semibold">${car.brand}</h4>
          <p class="text-gray-400 text-sm">${car.price}</p>
        </div>
        <i class="fa-solid fa-arrow-right text-[#FFB703]"></i>
      </div>
    `).join('');

    // Add click handlers to results
    document.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const carId = item.dataset.carId;
        const brand = item.dataset.brand;
        sessionStorage.setItem('selectedCarId', carId);
        sessionStorage.setItem('selectedBrand', brand.toUpperCase());
        closeSearchModal();
        window.location.hash = '#car-detail';
      });
    });
  }

  if (searchBtnDesktop) {
    searchBtnDesktop.addEventListener('click', openSearchModal);
  }

  if (searchBtnMobile) {
    searchBtnMobile.addEventListener('click', openSearchModal);
  }

  if (searchModalOverlay) {
    searchModalOverlay.addEventListener('click', closeSearchModal);
  }

  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', closeSearchModal);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });

    // Close on Escape key
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSearchModal();
      }
    });
  }

  // Favorite functionality
  const favoriteBtnDesktop = document.getElementById('favorite-btn-desktop');
  const favoriteBtnMobile = document.getElementById('favorite-btn-mobile');
  const favoriteModal = document.getElementById('favorite-modal');
  const favoriteModalOverlay = document.getElementById('favorite-modal-overlay');
  const favoriteCloseBtn = document.getElementById('favorite-close-btn');
  const favoriteList = document.getElementById('favorite-list');
  const favoriteCountDesktop = document.getElementById('favorite-count-desktop');
  const favoriteCountMobile = document.getElementById('favorite-count-mobile');

  function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  function updateFavoriteCount() {
    const favorites = getFavorites();
    const count = favorites.length;
    
    if (favoriteCountDesktop) {
      favoriteCountDesktop.textContent = count;
      favoriteCountDesktop.classList.toggle('hidden', count === 0);
    }
    if (favoriteCountMobile) {
      favoriteCountMobile.textContent = count;
      favoriteCountMobile.classList.toggle('hidden', count === 0);
    }
  }

  function openFavoriteModal() {
    favoriteModal.classList.remove('hidden');
    renderFavoriteList();
  }

  function closeFavoriteModal() {
    favoriteModal.classList.add('hidden');
  }

  function renderFavoriteList() {
    const favorites = getFavorites();
    
    if (favorites.length === 0) {
      favoriteList.innerHTML = '<p class="text-gray-400 text-center py-8">Belum ada mobil favorit</p>';
      return;
    }

    const favoriteCars = carsData.filter(car => favorites.includes(car.id.toString()));
    
    favoriteList.innerHTML = favoriteCars.map(car => `
      <div class="favorite-item flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition" data-car-id="${car.id}">
        <img src="${car.image}" class="w-16 h-12 object-cover rounded-lg cursor-pointer favorite-car-link" data-car-id="${car.id}" data-brand="${car.brand}">
        <div class="flex-1 cursor-pointer favorite-car-link" data-car-id="${car.id}" data-brand="${car.brand}">
          <h4 class="text-white font-semibold">${car.brand}</h4>
          <p class="text-gray-400 text-sm">${car.price}</p>
        </div>
        <button class="remove-favorite-btn w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition" data-car-id="${car.id}">
          <i class="fa-solid fa-trash text-sm"></i>
        </button>
      </div>
    `).join('');

    // Add click handlers for car links
    document.querySelectorAll('.favorite-car-link').forEach(item => {
      item.addEventListener('click', () => {
        const carId = item.dataset.carId;
        const brand = item.dataset.brand;
        sessionStorage.setItem('selectedCarId', carId);
        sessionStorage.setItem('selectedBrand', brand.toUpperCase());
        closeFavoriteModal();
        window.location.hash = '#car-detail';
      });
    });

    // Add click handlers for remove buttons
    document.querySelectorAll('.remove-favorite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const carId = btn.dataset.carId;
        removeFavorite(carId);
        renderFavoriteList();
        updateFavoriteCount();
      });
    });
  }

  function removeFavorite(carId) {
    let favorites = getFavorites();
    favorites = favorites.filter(id => id !== carId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // Initialize favorite count on page load
  updateFavoriteCount();

  if (favoriteBtnDesktop) {
    favoriteBtnDesktop.addEventListener('click', openFavoriteModal);
  }

  if (favoriteBtnMobile) {
    favoriteBtnMobile.addEventListener('click', openFavoriteModal);
  }

  if (favoriteModalOverlay) {
    favoriteModalOverlay.addEventListener('click', closeFavoriteModal);
  }

  if (favoriteCloseBtn) {
    favoriteCloseBtn.addEventListener('click', closeFavoriteModal);
  }

  // Export updateFavoriteCount for use in other components
  window.updateFavoriteCount = updateFavoriteCount;

  // Notification functionality
  const notificationBtnDesktop = document.getElementById('notification-btn-desktop');
  const notificationBtnMobile = document.getElementById('notification-btn-mobile');
  const notificationModal = document.getElementById('notification-modal');
  const notificationModalOverlay = document.getElementById('notification-modal-overlay');
  const notificationCloseBtn = document.getElementById('notification-close-btn');
  const notificationList = document.getElementById('notification-list');
  const notificationCountDesktop = document.getElementById('notification-count-desktop');
  const notificationCountMobile = document.getElementById('notification-count-mobile');
  const markAllReadBtn = document.getElementById('mark-all-read-btn');
  const clearNotificationsBtn = document.getElementById('clear-notifications-btn');

  function getNotifications() {
    const notifications = localStorage.getItem('contactNotifications');
    return notifications ? JSON.parse(notifications) : [];
  }

  function updateNotificationCount() {
    const notifications = getNotifications();
    const unreadCount = notifications.filter(notif => !notif.read).length;
    
    if (notificationCountDesktop) {
      notificationCountDesktop.textContent = unreadCount;
      notificationCountDesktop.classList.toggle('hidden', unreadCount === 0);
    }
    if (notificationCountMobile) {
      notificationCountMobile.textContent = unreadCount;
      notificationCountMobile.classList.toggle('hidden', unreadCount === 0);
    }
  }

  function openNotificationModal() {
    notificationModal.classList.remove('hidden');
    renderNotificationList();
  }

  function closeNotificationModal() {
    notificationModal.classList.add('hidden');
  }

  function renderNotificationList() {
    const notifications = getNotifications();
    
    if (notifications.length === 0) {
      notificationList.innerHTML = '<p class="text-gray-400 text-center py-8">Tidak ada notifikasi</p>';
      return;
    }

    notificationList.innerHTML = notifications.map((notification, index) => `
      <div class="notification-item flex items-start gap-4 p-4 rounded-lg hover:bg-white/10 transition mb-3 ${!notification.read ? 'bg-blue-500/10 border-l-4 border-l-blue-500' : ''}" data-notification-index="${index}">
        <div class="w-10 h-10 bg-[#FFB703] rounded-full flex items-center justify-center flex-shrink-0">
          <i class="fa-solid fa-user-tie text-[#14213D]"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <h4 class="font-semibold text-white text-sm">${notification.message}</h4>
            ${!notification.read ? '<div class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>' : ''}
          </div>
          <p class="text-gray-300 text-xs mb-2">${notification.messageDetail}</p>
          <p class="text-gray-400 text-xs">Untuk: ${notification.fromUser} (${notification.email})</p>
          <p class="text-gray-400 text-xs">${new Date(notification.timestamp).toLocaleString('id-ID')}</p>
        </div>
        <button class="mark-read-btn w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition" data-notification-index="${index}" title="Tandai Dibaca">
          <i class="fa-solid fa-check text-xs"></i>
        </button>
        <button class="delete-notification-btn w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition" data-notification-index="${index}" title="Hapus">
          <i class="fa-solid fa-trash text-xs"></i>
        </button>
      </div>
    `).join('');

    // Add event listeners for notification actions
    document.querySelectorAll('.mark-read-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(e.currentTarget.dataset.notificationIndex);
        markNotificationAsRead(index);
        renderNotificationList();
        updateNotificationCount();
      });
    });

    document.querySelectorAll('.delete-notification-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(e.currentTarget.dataset.notificationIndex);
        deleteNotification(index);
        renderNotificationList();
        updateNotificationCount();
      });
    });
  }

  function markNotificationAsRead(index) {
    const notifications = getNotifications();
    if (notifications[index]) {
      notifications[index].read = true;
      localStorage.setItem('contactNotifications', JSON.stringify(notifications));
    }
  }

  function deleteNotification(index) {
    const notifications = getNotifications();
    notifications.splice(index, 1);
    localStorage.setItem('contactNotifications', JSON.stringify(notifications));
  }

  function markAllNotificationsAsRead() {
    const notifications = getNotifications();
    notifications.forEach(notif => notif.read = true);
    localStorage.setItem('contactNotifications', JSON.stringify(notifications));
    renderNotificationList();
    updateNotificationCount();
  }

  function clearAllNotifications() {
    localStorage.removeItem('contactNotifications');
    renderNotificationList();
    updateNotificationCount();
  }

  // Initialize notification count on page load
  updateNotificationCount();

  // Event listeners
  if (notificationBtnDesktop) {
    notificationBtnDesktop.addEventListener('click', openNotificationModal);
  }

  if (notificationBtnMobile) {
    notificationBtnMobile.addEventListener('click', openNotificationModal);
  }

  if (notificationModalOverlay) {
    notificationModalOverlay.addEventListener('click', closeNotificationModal);
  }

  if (notificationCloseBtn) {
    notificationCloseBtn.addEventListener('click', closeNotificationModal);
  }

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', markAllNotificationsAsRead);
  }

  if (clearNotificationsBtn) {
    clearNotificationsBtn.addEventListener('click', clearAllNotifications);
  }

  // Export updateNotificationCount for use in other components
  window.updateNotificationCount = updateNotificationCount;

  // Check for new notifications periodically (every 30 seconds)
  setInterval(() => {
    updateNotificationCount();
  }, 30000);

  // Listen for storage changes (when admin replies)
  window.addEventListener('storage', (e) => {
    if (e.key === 'contactNotifications') {
      updateNotificationCount();
    }
  });

  // Also check on page visibility change
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      updateNotificationCount();
    }
  });

  // Logout functionality
  const logoutBtnDesktop = document.getElementById('logout-btn-desktop');
  const logoutBtnMobile = document.getElementById('logout-btn-mobile');

  function handleLogout() {
    window.showConfirm('Apakah Anda yakin ingin keluar?', () => {
      localStorage.removeItem('userSession');
      sessionStorage.removeItem('userSession');
      sessionStorage.setItem('pendingToast', JSON.stringify({
        message: 'Anda telah keluar dari akun',
        type: 'success'
      }));
      window.location.hash = '#home';
      window.location.reload();
    });
  }

  if (logoutBtnDesktop) {
    logoutBtnDesktop.addEventListener('click', handleLogout);
  }

  if (logoutBtnMobile) {
    logoutBtnMobile.addEventListener('click', handleLogout);
  }
}