export default function ForgotPasswordPage() {
  return `
    <section class="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 flex items-center justify-center px-4 py-6">
      <div class="max-w-4xl w-full grid lg:grid-cols-2 rounded-[32px] shadow-2xl bg-white overflow-hidden">
        <div class="relative bg-gradient-to-br from-[#efefef] via-white to-[#d9d9d9] hidden lg:flex flex-col justify-center items-center text-center p-8 sm:p-12 gap-4">
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-widest text-gray-800">RENOVA MOBIL</h1>
          <img
            src="/images/car_login.png"
            alt="Renova cars"
            class="w-full max-w-md object-contain drop-shadow-lg"
          />
        </div>

        <div class="bg-white px-6 sm:px-10 py-10 sm:py-14">
          <div class="space-y-2 text-center">
            <h2 class="text-3xl font-extrabold text-gray-900">Lupa Password</h2>
            <p class="text-sm text-gray-500">
              Masukkan email terdaftar Anda dan kami akan mengirimkan link untuk mengatur ulang password.
            </p>
          </div>

          <form class="mt-8 space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-900">
                Email Terdaftar<span class="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Masukkan alamat email"
                class="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <p class="mt-2 text-xs text-gray-500">Contoh : xxxx@gmail.com</p>
            </div>

            <button
              type="button"
              class="w-full rounded-2xl bg-[#14213D]/10 text-gray-400 font-semibold py-3 cursor-not-allowed"
            >
              Kirim Link Reset
            </button>

            <p class="text-center text-sm text-gray-600">
              Kembali ke
              <a href="#login" class="text-blue-600 font-semibold hover:underline">Halaman Login</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  `;
}


