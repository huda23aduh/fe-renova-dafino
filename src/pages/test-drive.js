import { carsData } from "../data/mockData.js";
import config from '../config/config.js';
import { getAuth } from '../utils/auth.js';
import { showLoginRequiredModal } from "../utils/modals/loginRequiredModal.js";

function getUser() {
  const auth = getAuth();
  return auth ? auth.user : null;
}

export default function TestDrive() {

  const carId = sessionStorage.getItem('selectedCarId');
  const car = carsData.find(c => c.id === parseInt(carId));

  return `
  <section class="bg-[#14213D] text-white px-4 md:px-6 py-8 md:py-12 min-h-screen mt-20">
    <div class="max-w-[800px] mx-auto">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-black text-[#FFB703] mb-2">Daftar Test Drive</h1>
        <p class="text-gray-300">Isi formulir di bawah untuk menjadwalkan test drive</p>
      </div>

      <!-- Selected Car Info -->
      ${car ? `
      <div class="bg-[#FFB703] text-[#14213D] rounded-xl p-4 mb-6 flex items-center gap-4">
        <img src="${car.image}" alt="${car.brand}" class="w-24 h-16 object-cover rounded-lg">
        <div>
          <h3 class="font-bold text-lg">${car.brand}</h3>
          <p class="text-sm">${car.price}</p>
        </div>
      </div>
      ` : ''}

      <!-- Form -->
      <form id="test-drive-form" class="space-y-6">
        
        <!-- Nama Lengkap -->
        <div>
          <label class="block text-sm font-semibold mb-2">Nama Lengkap <span class="text-red-500">*</span></label>
          <input type="text" name="fullName" required
            class="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#FFB703] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB703]"
            placeholder="Masukkan nama lengkap">
        </div>

        <!-- No. Telepon -->
        <div>
          <label class="block text-sm font-semibold mb-2">No. Telepon <span class="text-red-500">*</span></label>
          <input type="tel" name="phone" required
            class="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#FFB703] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB703]"
            placeholder="08xxxxxxxxxx">
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold mb-2">Email <span class="text-red-500">*</span></label>
          <input type="email" name="email" required
            class="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#FFB703] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB703]"
            placeholder="email@example.com">
        </div>

        <!-- Tanggal Test Drive -->
        <div>
          <label class="block text-sm font-semibold mb-2">Tanggal Test Drive <span class="text-red-500">*</span></label>
          <input type="date" name="testDate" required
            class="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#FFB703] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB703]">
        </div>

        <!-- Waktu Test Drive -->
        <div>
          <label class="block text-sm font-semibold mb-2">Waktu Test Drive <span class="text-red-500">*</span></label>
          <select name="testTime" required
            class="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#FFB703] text-white focus:outline-none focus:ring-2 focus:ring-[#FFB703]">
            <option value="" class="bg-[#14213D]">Pilih waktu</option>
            <option value="09:00" class="bg-[#14213D]">09:00 - 10:00</option>
            <option value="10:00" class="bg-[#14213D]">10:00 - 11:00</option>
            <option value="11:00" class="bg-[#14213D]">11:00 - 12:00</option>
            <option value="13:00" class="bg-[#14213D]">13:00 - 14:00</option>
            <option value="14:00" class="bg-[#14213D]">14:00 - 15:00</option>
            <option value="15:00" class="bg-[#14213D]">15:00 - 16:00</option>
            <option value="16:00" class="bg-[#14213D]">16:00 - 17:00</option>
          </select>
        </div>

        <!-- Catatan -->
        <div>
          <label class="block text-sm font-semibold mb-2">Catatan (Opsional)</label>
          <textarea name="message" rows="3"
            class="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#FFB703] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB703]"
            placeholder="Tambahkan catatan jika ada"></textarea>
        </div>

        <!-- Hidden Car ID -->
        <input type="hidden" name="carId" value="${carId || ''}">

        <!-- Submit Button -->
        <div class="flex gap-4">
          <a href="#car-detail" class="flex-1 bg-gray-600 text-white font-bold py-3 rounded-xl text-center hover:bg-gray-700 transition">
            <i class="fas fa-arrow-left mr-2"></i>Kembali
          </a>
          <button type="submit" class="flex-1 bg-[#FFB703] text-[#14213D] font-bold py-3 rounded-xl hover:bg-yellow-500 transition">
            <i class="fas fa-calendar-check mr-2"></i>Daftar Test Drive
          </button>
        </div>

      </form>

    </div>
  </section>

  <!-- Success Modal -->
  <div id="success-modal" class="fixed inset-0 z-[100] hidden">
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
    <div class="relative z-10 flex items-center justify-center min-h-screen px-4">
      <div class="bg-[#14213D] rounded-2xl p-8 w-full max-w-md shadow-2xl border-2 border-[#FFB703] text-center">
        <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check text-white text-3xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">Pendaftaran Berhasil!</h3>
        <p class="text-gray-300 mb-6">Tim kami akan menghubungi Anda untuk konfirmasi jadwal test drive.</p>
        <a href="#home" class="inline-block bg-[#FFB703] text-[#14213D] font-bold py-3 px-8 rounded-xl hover:bg-yellow-500 transition">
          Kembali ke Beranda
        </a>
      </div>
    </div>
  </div>
  `;
}

export function mount() {
  const user = getUser();

  const form = document.getElementById('test-drive-form');
  const successModal = document.getElementById('success-modal');

  // Set minimum date to today
  const dateInput = form.querySelector('input[name="testDate"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!user) {
      showLoginRequiredModal();
      return;
    }

    // 2. Collect form data
    const formData = new FormData(form);

    const payload = {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      testDate: formData.get("testDate"),
      testTime: formData.get("testTime"),
      message: formData.get("message"),
      carId: formData.get("carId"),
      userId: user.id,
    };

    try {
      // 3. Call backend
      const res = await fetch(config.TESTDRIVE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal mendaftar test drive");
      }

      // 4. Success
      successModal.classList.remove("hidden");
      form.reset();

    } catch (err) {
      alert(err.message);
    }
  });

}
