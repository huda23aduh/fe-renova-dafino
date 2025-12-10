export default function AdminSidebar(currentPage = 'admin-dashboard') {
  const menuItems = [
    {
      id: 'admin-dashboard',
      href: '#admin-dashboard',
      icon: 'fa-solid fa-gauge-high',
      label: 'Dashboard'
    },
    {
      id: 'brand-catalog-admin',
      href: '#brand-catalog-admin',
      icon: 'fa-solid fa-car',
      label: 'Kelola Mobil'
    },
    {
      id: 'admin-users',
      href: '#admin-users',
      icon: 'fa-solid fa-users',
      label: 'Kelola User'
    },
    {
      id: 'admin-testdrive',
      href: '#admin-testdrive',
      icon: 'fa-solid fa-calendar-check',
      label: 'Test Drive'
    },
    {
      id: 'contact-admin',
      href: '#contact-admin',
      icon: 'fa-solid fa-envelope',
      label: 'Pesan Masuk'
    },
    {
      id: 'admin-change-password',
      href: '#admin-change-password',
      icon: 'fa-solid fa-key',
      label: 'Ubah Password'
    }
  ];

  return `
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 h-full w-64 bg-[#14213D] text-white z-50 hidden lg:block">
      <div class="p-6">
        <h1 class="text-xl font-bold text-[#FFB703]">RENOVA ADMIN</h1>
      </div>
      
      <nav class="mt-6">
        ${menuItems.map(item => `
          <a href="${item.href}" class="flex items-center gap-3 px-6 py-3 hover:bg-white/10 transition ${
            currentPage === item.id ? 'bg-[#FFB703]/20 border-l-4 border-[#FFB703] text-[#FFB703]' : ''
          }" data-page="${item.id}">
            <i class="${item.icon}"></i>
            <span>${item.label}</span>
          </a>
        `).join('')}
      </nav>

      <div class="absolute bottom-0 left-0 right-0 p-6">
        <a href="#home" class="flex items-center gap-3 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition text-center justify-center">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Kembali ke Website</span>
        </a>
      </div>
    </aside>

    <!-- Mobile Header -->
    <header class="lg:hidden fixed top-0 left-0 right-0 bg-[#14213D] text-white px-4 py-3 z-40 flex items-center justify-between">
      <h1 class="text-lg font-bold text-[#FFB703]">RENOVA ADMIN</h1>
      <button id="admin-menu-btn" class="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FFB703] text-[#14213D]">
        <i class="fa-solid fa-bars"></i>
      </button>
    </header>

    <!-- Mobile Menu -->
    <div id="admin-mobile-menu" class="lg:hidden fixed inset-0 bg-[#14213D] z-50 hidden">
      <div class="p-4 flex justify-between items-center border-b border-white/20">
        <h1 class="text-lg font-bold text-[#FFB703]">RENOVA ADMIN</h1>
        <button id="admin-menu-close" class="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FFB703] text-[#14213D]">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <nav class="mt-4">
        ${menuItems.map(item => `
          <a href="${item.href}" class="flex items-center gap-3 px-6 py-4 text-white hover:bg-white/10 ${
            currentPage === item.id ? 'text-[#FFB703]' : ''
          }" data-page="${item.id}">
            <i class="${item.icon}"></i>
            <span>${item.label}</span>
          </a>
        `).join('')}
        <a href="#home" class="flex items-center gap-3 px-6 py-4 text-red-400 hover:bg-white/10 mt-4 border-t border-white/20">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Kembali ke Website</span>
        </a>
      </nav>
    </div>
  `;
}

export function mount() {
  // Mobile menu toggle
  const menuBtn = document.getElementById('admin-menu-btn');
  const menuClose = document.getElementById('admin-menu-close');
  const mobileMenu = document.getElementById('admin-mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });
  }

  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  // Close menu when clicking links
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Handle "Kembali ke Website" buttons
  const backToWebsiteLinks = document.querySelectorAll('a[href="#home"]');
  backToWebsiteLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.showConfirm(
        'Apakah Anda yakin ingin kembali ke website? Anda akan keluar dari halaman admin.',
        () => {
          // Clear admin session
          localStorage.removeItem('adminLoggedIn');
          localStorage.removeItem('adminSession');
          
          // Redirect to home
          window.location.hash = '#home';
          
          // Show success message
          setTimeout(() => {
            window.showToast('Anda telah keluar dari admin panel', 'success');
          }, 500);
        }
      );
    });
  });
}