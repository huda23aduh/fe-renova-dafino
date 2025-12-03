export default function RegisterPage() {
  return `
    <section class="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 flex items-center justify-center px-4 py-6">
      <div class="max-w-6xl w-full grid lg:grid-cols-2 rounded-[32px] shadow-2xl bg-white overflow-hidden">
        <div class="relative bg-gradient-to-br from-[#efefef] via-white to-[#d9d9d9] flex flex-col justify-center items-center text-center p-8 sm:p-12 gap-4">
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

          <form class="mt-8 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-900">
                Nama Lengkap<span class="text-red-500">*</span>
              </label>
              <input
                type="text"
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
                  placeholder="Masukkan password"
                  class="w-full rounded-2xl border border-gray-300 pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <p class="mt-1 text-xs text-gray-500">Password harus berupa Huruf Besar, Huruf Kecil, Angka dan Simbol</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-900">
                Ulangi Password<span class="text-red-500">*</span>
                <span class="ml-1 text-gray-400"><i class="fa-regular fa-circle-question"></i></span>
              </label>
              <div class="mt-2 relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  <i class="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  placeholder="Masukkan ulang password"
                  class="w-full rounded-2xl border border-gray-300 pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <p class="mt-1 text-xs text-gray-500">Password harus berupa Huruf Besar, Huruf Kecil, Angka dan Simbol</p>
            </div>

            <div class="space-y-3 text-xs text-gray-700">
              <label class="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" class="mt-1 h-4 w-4 rounded border-gray-300 text-[#14213D] focus:ring-[#14213D]" />
                <span>
                  Saya menyetujui penyediaan produk dan/atau layanan dan pemrosesan yang diperlukan sesuai dengan
                  <a href="#contact" class="text-blue-600 font-semibold hover:underline">Syarat & Ketentuan</a>
                  dan
                  <a href="#contact" class="text-blue-600 font-semibold hover:underline">Pemberitahuan Privasi</a>
                </span>
              </label>
            </div>

            <button
              type="button"
              class="mt-4 w-full rounded-2xl bg-[#14213D]/10 text-gray-400 font-semibold py-3 cursor-not-allowed"
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
              class="mt-2 w-full rounded-2xl border border-gray-300 py-3 flex items-center justify-center gap-3 font-semibold text-gray-800 hover:border-gray-400 transition-colors"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" class="h-5 w-5" />
              Google
            </button>

            <p class="mt-4 text-center text-sm text-gray-600">
              Ingin menjadi mitra di Renova Mobil?
              <a href="#mitra-register" class="text-blue-600 font-semibold hover:underline">Daftar Jadi Mitra</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  `;
}


