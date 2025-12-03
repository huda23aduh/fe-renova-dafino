import { carsData, brandsData } from "../data/mockData.js";

let adminCurrentBrand = "TOYOTA";
let adminIsEditing = true; // default show form like design

export default function BrandCatalogAdminPage() {
  const brandCars = carsData.filter((car) =>
    car.brand.toUpperCase().includes(adminCurrentBrand.toUpperCase())
  );

  const totalCars = brandCars.length;

  return `
  <section class="bg-[#0b1427] text-white px-4 md:px-6 py-8 md:py-12 relative overflow-hidden min-h-screen mt-20">
    <div class="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 relative">

      <!-- LEFT SIDE (Brand & Big Car like catalog) -->
      <div class="flex flex-col items-center justify-start relative z-10 px-0 md:px-4">

        <!-- Brand Icons Horizontal -->
        <div class="flex gap-2 md:gap-4 mb-4 md:mb-6 overflow-x-auto pb-2 scrollbar-hide">
          ${brandsData
            .map(
              (b) => `
            <button class="admin-brand-filter-btn shrink-0 flex flex-col items-center gap-1 cursor-pointer" data-brand="${b.name}">
              <div class="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg"
                style="background: ${
                  b.name === adminCurrentBrand
                    ? "linear-gradient(45deg, #FFB703 0%, #FFA500 100%)"
                    : "linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)"
                };">
                <img src="${b.image}" class="w-6 h-6 md:w-8 md:h-8 object-contain"
                     style="filter: ${
                       b.name === adminCurrentBrand
                         ? "brightness(0)"
                         : "brightness(1)"
                     };">
              </div>
            </button>
          `
            )
            .join("")}
        </div>

        <!-- Brand Title -->
        <h1 class="text-4xl md:text-6xl lg:text-8xl font-black bg-linear-to-b from-[#FFB703] to-transparent bg-clip-text text-transparent tracking-tight leading-none md:-mb-6 lg:-mb-10">
          ${adminCurrentBrand}
        </h1>

        <!-- Big Car Image -->
        <div class="relative w-full h-[180px] md:h-[280px] lg:h-[380px] flex items-center justify-center">
          <img src="/images/${adminCurrentBrand.toLowerCase()}_car.png" class="h-full w-auto drop-shadow-2xl">
        </div>

        <!-- Total Mobil + Admin Buttons -->
        <div class="mt-4 md:mt-6 flex flex-col gap-3 items-center w-full">
          <div class="rounded-xl p-3 md:p-5 text-center"
               style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
            <p class="text-2xl md:text-4xl font-bold">${totalCars}</p>
            <p class="text-xs md:text-sm font-bold mt-1">TOTAL MOBIL</p>
          </div>

          <div class="flex gap-3">
            <button id="admin-toggle-form-btn"
              class="px-5 py-2 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold shadow-lg flex items-center gap-2 text-sm md:text-base">
              <i class="fa-solid fa-car-side"></i>
              ${adminIsEditing ? "Batal/Kembali" : "Tambah/Edit Mobil"}
            </button>
            <button id="admin-delete-global-btn"
              class="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg flex items-center gap-2 text-sm md:text-base">
              <i class="fa-solid fa-trash"></i>
              Hapus Mobil
            </button>
          </div>
        </div>

      </div>

      <!-- YELLOW DIVIDER -->
      <div class="hidden lg:block absolute left-1/2 top-0 w-[3px] bg-[#FFB703] h-full transform -translate-x-1/2"></div>

      <!-- RIGHT SIDE (List or Detail Form) -->
      <div class="flex flex-col lg:pl-10 relative px-0 md:px-4">
        ${adminIsEditing ? renderAdminDetailForm() : renderAdminList(brandCars)}
      </div>
    </div>
  </section>
  `;
}

function renderAdminList(cars) {
  return `
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <h2 class="text-xl md:text-2xl lg:text-3xl font-bold">Pilihan Mobil ${adminCurrentBrand}</h2>
      <span class="text-xs md:text-sm text-gray-300">Klik tombol Tambah/Edit Mobil untuk mengubah data.</span>
    </div>

    <div class="max-h-[520px] md:max-h-[640px] overflow-y-auto pr-2 md:pr-4 scrollbar-hide">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        ${
          cars.length
            ? cars
                .map(
                  (car) => `
          <div class="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#FFB703]">
            <div class="h-28 md:h-40 bg-gray-200 overflow-hidden">
              <img src="${car.image}" class="w-full h-full object-cover">
            </div>
            <div class="bg-[#14213D] text-white px-3 py-2 flex justify-between items-center">
              <div>
                <p class="text-xs uppercase tracking-wide opacity-70">${car.brand}</p>
                <h3 class="text-sm md:text-base font-bold line-clamp-1">${car.model || "Model"}</h3>
              </div>
              <p class="text-xs md:text-sm font-semibold">${car.price || "Rp 0"}</p>
            </div>
          </div>
        `
                )
                .join("")
            : `<p class="col-span-1 md:col-span-2 text-center text-yellow-300 text-sm md:text-base">Belum ada mobil untuk brand ini.</p>`
        }
      </div>
    </div>
  `;
}

function renderAdminDetailForm() {
  return `
    <div class="max-h-[520px] md:max-h-[640px] overflow-y-auto pr-2 md:pr-4 scrollbar-hide">
      <!-- Upload Foto section -->
      <div class="mb-6">
        <h2 class="text-xl md:text-2xl font-bold mb-1">Unggah Foto Iklan/Mobil Anda <span class="text-sm text-gray-300"><i class="fa-regular fa-circle-question ml-1"></i></span></h2>
        <p class="text-xs md:text-sm text-gray-300 mb-4">Foto Anda akan menjadi foto sampul/thumbnail</p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          ${["Sampul", "Foto 1", "Foto 2", "Foto 3"]
            .map(
              (label) => `
            <label class="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-2xl bg-[#101a30] py-8 cursor-pointer hover:border-[#FFB703] transition-colors">
              <input type="file" class="hidden">
              <span class="text-3xl mb-2 text-gray-400"><i class="fa-regular fa-image"></i></span>
              <span class="text-xs md:text-sm text-gray-300 font-semibold">${label}</span>
            </label>
          `
            )
            .join("")}
        </div>
      </div>

      <!-- Detail item form -->
      <div class="border-t border-[#FFB703]/60 pt-6 mt-2">
        <p class="text-xs text-red-400 font-semibold mb-1">Wajib diisi</p>
        <h3 class="text-lg md:text-xl font-bold mb-4">Berikan Detail Item</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-semibold mb-1">Merek*</label>
            <input type="text" value="${adminCurrentBrand}" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white" readonly>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Model*</label>
            <input type="text" placeholder="-PILIH-" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Tahun*</label>
            <input type="text" placeholder="-PILIH-" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Warna*</label>
            <input type="text" placeholder="-PILIH-" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Jarak Tempuh*</label>
            <input type="text" placeholder="-PILIH-" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Tipe Bahan Bakar*</label>
            <input type="text" placeholder="-PILIH-" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Type Body*</label>
            <input type="text" placeholder="-PILIH-" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Kapasitas Mesin*</label>
            <input type="text" placeholder="-PILIH-" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
        </div>

        <!-- Judul & deskripsi -->
        <div class="border-t border-[#FFB703]/60 pt-6 mt-4">
          <h3 class="text-lg md:text-xl font-bold mb-3">Harap berikan judul dan deskripsi</h3>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Judul Iklan*</label>
            <input type="text" placeholder="Sebutkan fitur utama dari barang Anda" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Deskripsi*</label>
            <textarea rows="4" placeholder="Sertakan kondisi, fitur, dan alasan penjualan" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white resize-none"></textarea>
          </div>
        </div>

        <!-- Harga -->
        <div class="border-t border-[#FFB703]/60 pt-6 mt-4">
          <h3 class="text-lg md:text-xl font-bold mb-3">Tentukan Harga</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-1">Harga*</label>
              <input type="text" placeholder="Masukkan harga" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1">Harga Setelah Diskon*</label>
              <input type="text" placeholder="Masukkan harga setelah diskon" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
            </div>
          </div>
        </div>

        <!-- Rekening -->
        <div class="border-t border-[#FFB703]/60 pt-6 mt-4">
          <h3 class="text-lg md:text-xl font-bold mb-3">Rekening Anda</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-semibold mb-1">Nama Bank*</label>
              <input type="text" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1">Nomer Rekening*</label>
              <input type="text" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1">Pemilik Rekening*</label>
              <input type="text" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
            </div>
            <div class="flex items-end">
              <button type="button" class="w-full md:w-auto px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm md:text-base">
                VERIFIKASI
              </button>
            </div>
          </div>
        </div>

        <!-- Lokasi & submit -->
        <div class="border-t border-[#FFB703]/60 pt-6 mt-4">
          <h3 class="text-lg md:text-xl font-bold mb-3">Detail Lokasi</h3>
          <div class="mb-6">
            <label class="block text-sm font-semibold mb-1">Lokasi*</label>
            <input type="text" placeholder="Masukkan lokasi" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>

          <div class="flex justify-end">
            <button type="button"
              class="px-8 md:px-10 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm md:text-base tracking-wide shadow-lg">
              PASANG SEKARANG
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function mount() {
  // Brand change
  document.querySelectorAll(".admin-brand-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.brand;
      adminCurrentBrand = selected;
      window.location.reload();
    });
  });

  // Toggle form / list
  const toggleBtn = document.getElementById("admin-toggle-form-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      adminIsEditing = !adminIsEditing;
      window.location.reload();
    });
  }

  // Global delete button (dummy)
  const deleteBtn = document.getElementById("admin-delete-global-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      const ok = window.confirm(
        "Hapus salah satu mobil dari brand ini? (Demo saja, data asli tidak akan berubah)"
      );
      if (ok) {
        alert("Mobil berhasil dihapus (dummy).");
      }
    });
  }
}
