import { login as loginApi } from "../services/api.js";

export default function AdminLoginPage() {
  // attach login handler AFTER DOM is rendered
  setTimeout(() => initLoginHandler(), 0);

  return `
    <section class="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 flex items-center justify-center px-4 py-2">
      <div class="max-w-6xl w-full grid lg:grid-cols-2 rounded-[32px] shadow-2xl bg-white overflow-hidden">

        <div class="relative bg-gradient-to-br from-[#efefef] via-white to-[#d9d9d9] flex flex-col justify-center items-center text-center p-8 sm:p-12 gap-6">
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

          <form id="loginForm" class="mt-8 space-y-6">
            <div>
              <label class="flex items-center justify-between text-sm font-semibold text-gray-900">
                <span>Email atau No Telepon<span class="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                value="admin@example.com"
                name="username"
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
                  value="admin123"
                  name="password"
                  placeholder="Masukkan password"
                  class="w-full rounded-2xl border border-gray-300 pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <p class="mt-2 text-xs text-gray-500">Password harus berupa huruf besar, huruf kecil, angka dan simbol.</p>
            </div>

            <div class="flex flex-wrap items-center justify-between text-sm text-gray-600 gap-3">
              <label class="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-[#14213D] focus:ring-[#14213D]" />
                Ingat Saya
              </label>
              <a href="#forgot-password" class="text-blue-600 font-semibold hover:underline">Lupa Password?</a>
            </div>

            <button
              type="submit"
              class="w-full rounded-2xl bg-[#14213D] text-white font-semibold py-3 hover:bg-[#0f1a33] transition"
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
              class="w-full rounded-2xl border border-gray-300 py-3 flex items-center justify-center gap-3 font-semibold text-gray-800 hover:border-gray-400 transition-colors"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" class="h-5 w-5" />
              Google
            </button>

            <p class="text-center text-sm text-gray-600">
              Sudah menjadi mitra di Renova Mobil?
              <a href="#mitra-login" class="text-blue-600 font-semibold hover:underline">Masuk Jadi Mitra</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  `;
}

function initLoginHandler() {
  const form = document.getElementById("loginForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value.trim();

    if (!username || !password) {
      alert("Harap isi semua field.");
      return;
    }

    try {
      const result = await loginApi({ email: username, password });

      if (result.token) {

        // FIX: save using SAME KEY as your router
        localStorage.setItem("token", result.token);

        alert("Login sukses!");

        // FIX: use hash router (NO page reload)
        window.location.hash = "#home";   // or "#dashboard"

      } else {
        alert(result.message || "Login gagal.");
      }

    } catch (err) {
      alert("Kesalahan server. Coba lagi.");
      console.error("Login Error:", err);
    }
  });
}
