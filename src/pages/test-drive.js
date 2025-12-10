import { carsData } from "../data/mockData.js";

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
  const form = document.getElementById('test-drive-form');
  const successModal = document.getElementById('success-modal');

  // Set minimum date to today
  const dateInput = form.querySelector('input[name="testDate"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check if user is logged in
    const userSession = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    const isLoggedIn = userSession ? JSON.parse(userSession) : null;
    
    if (!isLoggedIn) {
      // Show login requirement message
      showLoginRequiredModal();
      return;
    }

    const formData = new FormData(form);
    const carId = formData.get('carId');
    
    // Get car info from carsData
    const car = carsData.find(c => c.id === parseInt(carId));
    
    const data = {
      fullName: formData.get('fullName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      testDate: formData.get('testDate'),
      testTime: formData.get('testTime'),
      message: formData.get('message'),
      carId: carId,
      carName: car ? car.brand : 'Tidak disebutkan',
      carBrand: car ? car.type : '',
      carImage: car ? car.image : ''
    };

    // Save to localStorage (simulating backend)
    const testDriveRequests = JSON.parse(localStorage.getItem('testDriveRequests') || '[]');
    testDriveRequests.push({
      ...data,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('testDriveRequests', JSON.stringify(testDriveRequests));

    // Show success modal
    successModal.classList.remove('hidden');
  });

  function showLoginRequiredModal() {
    // Create login required modal
    const loginModal = document.createElement('div');
    loginModal.id = 'login-required-modal';
    loginModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm';
    
    loginModal.innerHTML = `
      <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa-solid fa-user-lock text-blue-500 text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Login Diperlukan</h3>
          <p class="text-gray-600 mb-6">Untuk melanjutkan pendaftaran test drive, Anda perlu login terlebih dahulu.</p>
          <div class="flex gap-3">
            <button id="login-cancel-btn" class="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-300 transition">
              Batal
            </button>
            <a href="#login" class="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-600 transition text-center">
              Login
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(loginModal);

    // Event listeners
    document.getElementById('login-cancel-btn').addEventListener('click', () => {
      loginModal.remove();
    });

    // Close on outside click
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.remove();
      }
    });
  }
}
