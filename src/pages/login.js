import config from '../config/config.js';

export default function LoginPage() {
  return `
    <section class="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 flex items-center justify-center px-4 py-2">
      <div class="max-w-6xl w-full grid lg:grid-cols-2 rounded-[32px] shadow-2xl bg-white overflow-hidden">
        <div class="relative bg-gradient-to-br from-[#efefef] via-white to-[#d9d9d9] flex flex-col justify-center items-center text-center p-8 sm:p-12 gap-6">
          <a href="#home" class="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <i class="fa-solid fa-arrow-left"></i>
            <span class="text-sm font-semibold">Kembali ke Home</span>
          </a>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-widest text-gray-800">RENOVA MOBIL</h1>
          <img
            src="/images/car_login.png"
            alt="Renova cars"
            class="w-full max-w-md object-contain drop-shadow-lg"
          />
        </div>

        <div class="bg-white px-6 sm:px-10 py-10 sm:py-14">
          <div class="space-y-2 text-center">
            <h2 class="text-3xl font-extrabold text-gray-900">Masuk Sekarang</h2>
            <p class="text-sm text-gray-500">
              Belum punya akun?
              <a href="#register" class="text-blue-600 font-semibold hover:underline">Daftar</a>
            </p>
          </div>

          <form id="login-form" class="mt-8 space-y-6">
            <div>
              <label class="flex items-center justify-between text-sm font-semibold text-gray-900">
                <span>Email atau No Telepon<span class="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                name="username"
                required
                placeholder="Masukkan alamat email atau nomor"
                class="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <p class="mt-2 text-xs text-gray-500">Contoh : xxxx@gmail.com / 08xxxxxxxxxx</p>
            </div>

            <div>
              <label class="flex items-center justify-between text-sm font-semibold text-gray-900">
                <span>Password<span class="text-red-500">*</span></span>
              </label>
              <div class="mt-2 relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  <i class="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Masukkan password"
                  class="w-full rounded-2xl border border-gray-300 pl-12 pr-12 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <button type="button" id="toggle-password" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
              <p class="mt-2 text-xs text-gray-500">Password harus berupa huruf besar, huruf kecil, angka dan simbol.</p>
            </div>

            <div id="login-error" class="hidden text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg"></div>

            <div class="flex flex-wrap items-center justify-between text-sm text-gray-600 gap-3">
              <label class="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="remember" class="h-4 w-4 rounded border-gray-300 text-[#14213D] focus:ring-[#14213D]" />
                Ingat Saya
              </label>
              <a href="#forgot-password" class="text-blue-600 font-semibold hover:underline">Lupa Password?</a>
            </div>

            <button
              type="submit"
              id="login-btn"
              class="w-full rounded-2xl bg-[#14213D] text-white font-semibold py-3 hover:bg-[#1a2a4d] transition-colors"
            >
              Masuk
            </button>

            <div class="flex items-center gap-4">
              <span class="h-px flex-1 bg-gray-200"></span>
              <span class="text-xs uppercase tracking-widest text-gray-500">atau masuk dengan</span>
              <span class="h-px flex-1 bg-gray-200"></span>
            </div>

            <button
              type="button"
              id="google-login-btn"
              class="w-full rounded-2xl border border-gray-300 py-3 flex items-center justify-center gap-3 font-semibold text-gray-800 hover:border-gray-400 transition-colors"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" class="h-5 w-5" />
              Google
            </button>

            <p class="text-center text-sm text-gray-600">
              Sudah menjadi mitra di Renova Mobil?
              <a href="#admin-login" class="text-blue-600 font-semibold hover:underline">Masuk Sebagai Admin</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function mount() {
  ;
  const form = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const togglePassword = document.getElementById('toggle-password');
  const passwordInput = form.querySelector('input[name="password"]');

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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.classList.add('hidden');

    const formData = new FormData(form);
    const username = formData.get('username'); // email
    const password = formData.get('password');
    const remember = formData.get('remember');

    try {
      const res = await fetch(config.API_BASE_URL + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: username,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        loginError.textContent = data.message || 'Login gagal';
        loginError.classList.remove('hidden');
        return;
      }

      // ✅ Login success
      const session = {
        token: data.token
      };

      if (remember) {
        localStorage.setItem('auth', JSON.stringify(session));
      } else {
        sessionStorage.setItem('auth', JSON.stringify(session));
      }

      sessionStorage.setItem('pendingToast', JSON.stringify({
        message: 'Login berhasil!',
        type: 'success'
      }));

      window.location.hash = '#home';
      window.location.reload();

    } catch (err) {
      loginError.textContent = 'Server tidak dapat dihubungi';
      loginError.classList.remove('hidden');
    }
  });


  // Google login placeholder
  const googleBtn = document.getElementById('google-login-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      window.showToast('Fitur login dengan Google akan segera tersedia', 'info');
    });
  }
}
