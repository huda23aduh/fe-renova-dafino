import config from '../config/config.js';

export default function RegisterPage() {
  return `
    <section class="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 flex items-center justify-center px-4 py-6">
      <div class="max-w-6xl w-full grid lg:grid-cols-2 rounded-[32px] shadow-2xl bg-white overflow-hidden">
        <div class="relative bg-gradient-to-br from-[#efefef] via-white to-[#d9d9d9] flex flex-col justify-center items-center text-center p-8 sm:p-12 gap-4">
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

        <div class="bg-white px-6 sm:px-10 py-10 sm:py-12 overflow-y-auto max-h-[90vh]">
          <div class="space-y-2 text-center">
            <h2 class="text-3xl font-extrabold text-gray-900">Daftar Sekarang</h2>
            <p class="text-sm text-gray-500">
              Sudah punya akun?
              <a href="#login" class="text-blue-600 font-semibold hover:underline">Masuk</a>
            </p>
          </div>

          <form id="register-form" class="mt-8 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-900">
                Nama Lengkap<span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Masukkan nama lengkap"
                class="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <p class="mt-1 text-xs text-gray-500">Contoh : Dika Yulianto Prakoso</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-900">
                No Telepon<span class="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Masukkan nomer Telepon"
                class="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <p class="mt-1 text-xs text-gray-500">Contoh : 08xxxxxxxxxx</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-900">
                Email Aktif<span class="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Masukkan alamat email"
                class="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <p class="mt-1 text-xs text-gray-500">Contoh : xxx@gmail.com</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-900">
                Password<span class="text-red-500">*</span>
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
                <button type="button" class="toggle-password absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" data-target="password">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
              <p class="mt-1 text-xs text-gray-500">Password harus berupa Huruf Besar, Huruf Kecil, Angka dan Simbol</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-900">
                Ulangi Password<span class="text-red-500">*</span>
              </label>
              <div class="mt-2 relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  <i class="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Masukkan ulang password"
                  class="w-full rounded-2xl border border-gray-300 pl-12 pr-12 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <button type="button" class="toggle-password absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" data-target="confirmPassword">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
              <p class="mt-1 text-xs text-gray-500">Password harus sama dengan password di atas</p>
            </div>

            <div id="register-error" class="hidden text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg"></div>

            <div class="space-y-3 text-xs text-gray-700">
              <label class="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="terms" required class="mt-1 h-4 w-4 rounded border-gray-300 text-[#14213D] focus:ring-[#14213D]" />
                <span>
                  Saya menyetujui penyediaan produk dan/atau layanan dan pemrosesan yang diperlukan sesuai dengan
                  <a href="#contact" class="text-blue-600 font-semibold hover:underline">Syarat & Ketentuan</a>
                  dan
                  <a href="#contact" class="text-blue-600 font-semibold hover:underline">Pemberitahuan Privasi</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              id="register-btn"
              class="mt-4 w-full rounded-2xl bg-[#14213D] text-white font-semibold py-3 hover:bg-[#1a2a4d] transition-colors"
            >
              Daftar
            </button>

            <div class="mt-4 flex items-center gap-4">
              <span class="h-px flex-1 bg-gray-200"></span>
              <span class="text-xs uppercase tracking-widest text-gray-500">atau daftar dengan</span>
              <span class="h-px flex-1 bg-gray-200"></span>
            </div>

            <button
              type="button"
              id="google-register-btn"
              class="mt-2 w-full rounded-2xl border border-gray-300 py-3 flex items-center justify-center gap-3 font-semibold text-gray-800 hover:border-gray-400 transition-colors"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" class="h-5 w-5" />
              Google
            </button>

            <p class="mt-4 text-center text-sm text-gray-600">
              Ingin menjadi mitra di Renova Mobil?
              <a href="#mitra-register" class="text-blue-600 font-semibold hover:underline">Daftar Jadi Mitra</a>
            </p>

            <div class="mt-4 pt-4 border-t border-gray-200">
              <a href="#admin-login" class="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition">
                <i class="fa-solid fa-user-shield"></i>
                <span>Masuk sebagai Admin</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function mount() {
  const form = document.getElementById('register-form');
  const registerError = document.getElementById('register-error');

  // Toggle password visibility
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetName = btn.dataset.target;
      const input = form.querySelector(`input[name="${targetName}"]`);
      if (input) {
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        const icon = btn.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    registerError.classList.add('hidden');

    const formData = new FormData(form);
    const fullName = formData.get('fullName');
    const phone = formData.get('phone'); // kept for UI only
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Validation
    if (password !== confirmPassword) {
      registerError.textContent = 'Password tidak sama';
      registerError.classList.remove('hidden');
      return;
    }

    try {
      const res = await fetch(
        config.API_BASE_URL + '/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: fullName,
            email,
            phone,
            password
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        registerError.textContent = data.message || 'Registrasi gagal';
        registerError.classList.remove('hidden');
        return;
      }

      // ✅ SUCCESS
      sessionStorage.setItem(
        'pendingToast',
        JSON.stringify({
          message: 'Pendaftaran berhasil! Silakan login.',
          type: 'success'
        })
      );

      window.location.hash = '#login';
      window.location.reload();

    } catch (err) {
      registerError.textContent = 'Server error. Coba lagi nanti.';
      registerError.classList.remove('hidden');
    }
  });


  // Google register placeholder
  const googleBtn = document.getElementById('google-register-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      window.showToast('Fitur daftar dengan Google akan segera tersedia', 'info');
    });
  }
}
