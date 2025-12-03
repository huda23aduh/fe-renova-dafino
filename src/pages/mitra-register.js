export default function MitraRegisterPage() {
  return `
    <section class="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 flex items-center justify-center px-4 py-6">
      <div class="max-w-6xl w-full grid lg:grid-cols-2 rounded-[32px] shadow-2xl bg-white overflow-hidden">
        <div class="relative bg-gradient-to-br from-[#efefef] via-white to-[#d9d9d9] flex flex-col justify-center items-center text-center p-8 sm:p-12 gap-4">
          <p class="text-xl sm:text-2xl font-semibold tracking-wide text-gray-800">
            Daftarkan Diri Anda Sebagai Agen di
          </p>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-widest text-gray-900">
            RENOVA MOBIL
          </h1>
          <img
            src="/images/car_login.png"
            alt="Renova cars"
            class="w-full max-w-md object-contain drop-shadow-lg mt-4"
          />
        </div>

        <div class="bg-white px-6 sm:px-10 py-10 sm:py-12 overflow-y-auto max-h-[90vh]">
          <div class="space-y-2 text-center">
            <h2 class="text-3xl font-extrabold text-gray-900">Daftar Agen Sekarang</h2>
            <p class="text-sm text-gray-500">
              Sudah punya akun Agen?
              <a href="#mitra-login" class="text-blue-600 font-semibold hover:underline">Masuk</a>
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
                Upload KTP<span class="text-red-500">*</span>
              </label>
              <label class="mt-2 flex items-center justify-center w-full rounded-2xl border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 cursor-pointer hover:border-gray-400">
                <input type="file" class="hidden" />
                Klik <span class="mx-1 text-blue-600 font-semibold">di sini</span> untuk upload file
                <i class="fa-solid fa-upload ml-2 text-gray-400"></i>
              </label>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-900">
                NIK<span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan NIK"
                class="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-900">
                Upload NPWP<span class="text-red-500">*</span>
              </label>
              <label class="mt-2 flex items-center justify-center w-full rounded-2xl border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 cursor-pointer hover:border-gray-400">
                <input type="file" class="hidden" />
                Klik <span class="mx-1 text-blue-600 font-semibold">di sini</span> untuk upload file
                <i class="fa-solid fa-upload ml-2 text-gray-400"></i>
              </label>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-900">
                NPWP<span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan nomor NPWP"
                class="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <p class="mt-1 text-xs text-gray-500">Pastikan npwp valid</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-900">
                Alamat Tinggal<span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan Alamat tinggal"
                class="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
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
                  Saya menyetujui pemrosesan yang diperlukan sesuai dengan
                  <a href="#contact" class="text-blue-600 font-semibold hover:underline">Pemberitahuan Privasi</a>
                </span>
              </label>

              <label class="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" class="mt-1 h-4 w-4 rounded border-gray-300 text-[#14213D] focus:ring-[#14213D]" />
                <span>
                  Saya setuju dengan
                  <a href="#contact" class="text-blue-600 font-semibold hover:underline">Syarat Ketentuan Perjanjian Kemitraan</a>
                  yang berlaku
                </span>
              </label>
            </div>

            <button
              type="button"
              class="mt-4 w-full rounded-2xl bg-[#14213D]/10 text-gray-400 font-semibold py-3 cursor-not-allowed"
            >
              Daftar
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
}


