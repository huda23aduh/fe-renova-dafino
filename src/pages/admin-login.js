export default function AdminLoginPage() {
  return `
    <section class="min-h-screen bg-[#14213D] flex items-center justify-center px-4 py-8">
      <div class="max-w-md w-full">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="w-20 h-20 bg-[#FFB703] rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa-solid fa-user-shield text-[#14213D] text-3xl"></i>
          </div>
          <h1 class="text-2xl font-bold text-white">Admin Panel</h1>
          <p class="text-gray-400">RENOVA MOBIL</p>
        </div>

        <!-- Login Form -->
        <div class="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 class="text-xl font-bold text-gray-800 mb-6 text-center">Login Admin</h2>

          <form id="admin-login-form" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="Masukkan username"
                  class="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB703]"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i class="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Masukkan password"
                  class="w-full rounded-xl border border-gray-300 pl-12 pr-12 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB703]"
                />
                <button type="button" id="toggle-admin-password" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>

            <div id="admin-login-error" class="hidden text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg"></div>

            <button
              type="submit"
              class="w-full rounded-xl bg-[#14213D] text-white font-semibold py-3 hover:bg-[#1a2a4d] transition-colors"
            >
              <i class="fa-solid fa-sign-in mr-2"></i>Masuk
            </button>
          </form>

          <div class="mt-6 text-center">
            <a href="#home" class="text-sm text-gray-500 hover:text-gray-700 transition">
              <i class="fa-solid fa-arrow-left mr-1"></i>Kembali ke Website
            </a>
          </div>
        </div>

        <!-- Info -->
        <div class="mt-6 text-center">
          <p class="text-gray-500 text-xs">
            Default: admin / admin123
          </p>
        </div>
      </div>
    </section>
  `;
}

export function mount() {
  const form = document.getElementById('admin-login-form');
  const loginError = document.getElementById('admin-login-error');
  const togglePassword = document.getElementById('toggle-admin-password');
  const passwordInput = form.querySelector('input[name="password"]');

  // Default admin credentials
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = localStorage.getItem('adminPassword') || 'admin123';

  // Toggle password visibility
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      const icon = togglePassword.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');

    // Check credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Login success
      loginError.classList.add('hidden');
      
      // Save admin session
      const adminSession = {
        username: username,
        role: 'admin',
        loggedIn: true,
        loginTime: new Date().toISOString()
      };
      sessionStorage.setItem('adminSession', JSON.stringify(adminSession));

      // Show toast and redirect
      sessionStorage.setItem('pendingToast', JSON.stringify({
        message: 'Login berhasil! Selamat datang, Admin',
        type: 'success'
      }));
      window.location.hash = '#admin-dashboard';
      window.location.reload();
    } else {
      // Login failed
      loginError.textContent = 'Username atau password salah';
      loginError.classList.remove('hidden');
    }
  });
}
