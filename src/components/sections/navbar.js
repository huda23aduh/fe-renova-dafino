export default function Navbar() {
  return `
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#14213D] text-white px-10 md:px-20 py-4 flex items-center justify-between">
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <img src="/images/logo.png" alt="Renova Logo" class="h-20 w-auto" />
    </div>

    <!-- Desktop Nav Links -->
    <div class="hidden lg:flex gap-2 text-sm font-medium">
      <a href="#home" data-nav="home" class="px-4 py-2 rounded-full text-white font-bold hover:opacity-80 transition-colors" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 40%, #14213D 60%, #FFB703 100%);">HOME</a>
      <a href="#brand" data-nav="brand" class="px-4 py-2 rounded-full text-white font-bold hover:opacity-80 transition-colors" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 40%, #14213D 60%, #FFB703 100%);">BRAND</a>
      <a href="#news" data-nav="news" class="px-4 py-2 rounded-full text-white font-bold hover:opacity-80 transition-colors" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 40%, #14213D 60%, #FFB703 100%);">BERITA</a>
      <a href="#contact" data-nav="contact" class="px-4 py-2 rounded-full text-white font-bold hover:opacity-80 transition-colors" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 40%, #14213D 60%, #FFB703 100%);">CONTACT</a>
    </div>

    <!-- Right Icons -->
    <div class="flex gap-6 items-center text-xl">
      <span class="w-10 h-10 flex items-center justify-center rounded-full lg:hidden cursor-pointer hover:opacity-80 transition-all duration-300 transform" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);" id="menu-btn">
        <i class="fa-solid fa-bars transition-all duration-300" id="menu-icon"></i>
      </span>

      <div class="hidden lg:flex gap-2 items-center text-lg">
        <span class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 transition-colors" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);"><i class="fa-solid fa-magnifying-glass"></i></span>
        <span class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 transition-colors" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);"><i class="fa-regular fa-heart"></i></span>
        <span class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 transition-colors" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);"><i class="fa-regular fa-bell"></i></span>
        
        <!-- User Icon Dropdown -->
        <div class="relative">
          <span class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 transition-colors" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);" id="user-icon-desktop">
            <i class="fa-regular fa-user"></i>
          </span>
          
          <!-- Dropdown Menu -->
          <div id="user-dropdown-desktop" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <div id="guest-menu-desktop">
              <a href="#login" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm">
                <i class="fa-solid fa-sign-in mr-2 text-black"></i>Masuk
              </a>
              <a href="#register" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm">
                <i class="fa-solid fa-user-plus mr-2 text-black"></i>Daftar
              </a>
            </div>

            <div id="auth-menu-desktop" class="hidden">
              <a id="logout-btn-desktop" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm cursor-pointer">
                <i class="fa-solid fa-right-from-bracket mr-2 text-black"></i>Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu - Full Screen -->
  <div id="mobile-menu" class="fixed inset-0 top-20 lg:hidden z-40 bg-linear-to-b from-[#14213D]/95 to-[#0f172a] backdrop-blur-sm flex-col items-center justify-center gap-8 px-6 py-12 hidden opacity-0 transition-all duration-300" style="">
    <!-- Menu Links -->
    <div class="flex flex-col gap-4 w-full max-w-xs">
      <a href="#home" data-nav="home" class="px-6 py-4 rounded-full text-white font-bold text-center text-lg hover:opacity-90 transition-all transform hover:scale-105" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">HOME</a>
      <a href="#brand" data-nav="brand" class="px-6 py-4 rounded-full text-white font-bold text-center text-lg hover:opacity-90 transition-all transform hover:scale-105" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">BRAND</a>
      <a href="#news" data-nav="news" class="px-6 py-4 rounded-full text-white font-bold text-center text-lg hover:opacity-90 transition-all transform hover:scale-105" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">BERITA</a>
      <a href="#contact" data-nav="contact" class="px-6 py-4 rounded-full text-white font-bold text-center text-lg hover:opacity-90 transition-all transform hover:scale-105" style="background: linear-gradient(180deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">CONTACT</a>
    </div>
    
    <!-- Divider -->
    <div class="w-32 h-px bg-linear-to-r from-transparent via-amber-500 to-transparent"></div>
    
    <!-- Icons -->
    <div class="flex gap-6 text-2xl justify-center relative">
      <span class="w-12 h-12 flex items-center justify-center rounded-full text-white cursor-pointer hover:opacity-80 transition-all transform hover:scale-110" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);"><i class="fa-solid fa-magnifying-glass"></i></span>
      <span class="w-12 h-12 flex items-center justify-center rounded-full text-white cursor-pointer hover:opacity-80 transition-all transform hover:scale-110" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);"><i class="fa-regular fa-heart"></i></span>
      <span class="w-12 h-12 flex items-center justify-center rounded-full text-white cursor-pointer hover:opacity-80 transition-all transform hover:scale-110" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);"><i class="fa-regular fa-bell"></i></span>
      
      <!-- Mobile User Icon with Dropdown -->
      <div class="relative">
        <span class="w-12 h-12 flex items-center justify-center rounded-full text-white cursor-pointer hover:opacity-80 transition-all transform hover:scale-110" style="background: linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%);" id="user-icon-mobile">
          <i class="fa-regular fa-user"></i>
        </span>
        
        <!-- Mobile Dropdown Menu -->
        <div id="user-dropdown-mobile" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <div id="guest-menu-mobile">
            <a href="#login" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm">
              <i class="fa-solid fa-sign-in mr-2 text-black"></i>Login
            </a>
            <a href="#mitra-login" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm">
              <i class="fa-solid fa-people-group mr-2 text-black"></i>Masuk Mitra
            </a>
            <a href="#mitra-register" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm">
              <i class="fa-solid fa-user-plus mr-2 text-black"></i>Daftar Mitra
            </a>
          </div>

          <div id="auth-menu-mobile" class="hidden">
            <a id="logout-btn-mobile" class="block px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm cursor-pointer">
              <i class="fa-solid fa-right-from-bracket mr-2 text-black"></i>Logout
            </a>
          </div>
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

  // === AUTH CHECK ===
  const token = localStorage.getItem("token");

  const guestDesktop = document.getElementById("guest-menu-desktop");
  const authDesktop = document.getElementById("auth-menu-desktop");

  const guestMobile = document.getElementById("guest-menu-mobile");
  const authMobile = document.getElementById("auth-menu-mobile");

  if (token) {
    // Logged in
    guestDesktop?.classList.add("hidden");
    authDesktop?.classList.remove("hidden");

    guestMobile?.classList.add("hidden");
    authMobile?.classList.remove("hidden");
  } else {
    // Logged out
    guestDesktop?.classList.remove("hidden");
    authDesktop?.classList.add("hidden");

    guestMobile?.classList.remove("hidden");
    authMobile?.classList.add("hidden");
  }

  // === LOGOUT ===
  const logoutDesktop = document.getElementById("logout-btn-desktop");
  const logoutMobile = document.getElementById("logout-btn-mobile");

  function handleLogout() {
    localStorage.removeItem("token");
    alert("Berhasil logout!");

    window.location.hash = "#login";
    window.location.reload(); // refresh UI
  }

  logoutDesktop?.addEventListener("click", handleLogout);
  logoutMobile?.addEventListener("click", handleLogout);

}
