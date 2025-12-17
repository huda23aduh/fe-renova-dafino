import { contactData } from "../data/mockData.js";
import config from '../config/config.js';
import { getAuth } from '../utils/auth.js';
import { showLoginRequiredModal } from "../utils/modals/loginRequiredModal.js";

function getUser() {
  const auth = getAuth();
  return auth ? auth.user : null;
}

export default function Contact() {
  const topCards = contactData.slice(0, 3);
  const bottomCards = contactData.slice(3);

  return `
    <section class="bg-[#14213D] text-white px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative pb-24 sm:pb-28 md:pb-32">
      <div class="max-w-7xl mx-auto">
        
        <!-- Top Cards Section -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative z-10 mt-8 sm:mt-12 md:mt-16">
          ${topCards.map((card, index) => `
          <!-- Card ${index + 1} -->
          <div class="relative">
            <!-- Yellow Background Card -->
            <div class="absolute -top-2 -left-2 bg-[#FFB703] rounded-lg w-full h-full z-0"></div>
            <!-- Main Card -->
            <div class="bg-white rounded-lg p-4 sm:p-6 md:p-8 relative z-10 shadow-lg min-h-64 sm:min-h-72 md:h-80 flex flex-col justify-between">
              <div>
                <div class="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-[#FFB703] rounded-md flex items-center justify-center mb-3 sm:mb-4">
                  <i class="fas ${card.icon} text-white text-lg sm:text-xl md:text-2xl"></i>
                </div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b-2 border-[#FFB703] pb-2" style="display: inline-block;">${card.title}</h3>
                ${card.id === 2 ? `
                <!-- Chat dengan kami layout -->
                <div class="flex gap-3 sm:gap-4 pt-2 sm:pt-3">
                  <div class="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gray-300 rounded-lg shrink-0 flex items-center justify-center">
                    <span class="text-xs text-gray-600">QR Code</span>
                  </div>
                  <div class="flex flex-col justify-center">
                    <p class="text-xs sm:text-sm font-semibold text-gray-800 mb-1">WhatsApp ID</p>
                    <p class="text-xs sm:text-sm text-blue-600 font-medium break-all">${card.whatsapp || card.whatsappId}</p>
                  </div>
                </div>
                ` : `
                <div class="space-y-1.5 sm:space-y-2 pt-2 sm:pt-3 text-xs sm:text-sm">
                  ${card.phone ? `<p class="font-bold text-gray-900 break-all">${card.phone}</p>` : ''}
                  ${card.hours ? `<p class="text-xs text-gray-600">${card.hours}</p>` : ''}
                  ${card.email ? `<p class="text-blue-600 font-medium break-all">${card.email}</p>` : ''}
                  ${card.subtitle ? `<p class="font-semibold text-gray-800">${card.subtitle}</p>` : ''}
                  ${card.link ? `<p class="text-gray-600">${card.link}</p>` : ''}
                </div>
                `}
              </div>
            </div>
          </div>
          `).join('')}
        </div>

        <!-- Bottom Cards Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative z-10 mt-8 sm:mt-10 md:mt-12">
          ${bottomCards.map((card, index) => `
          <!-- Card ${index + 1} -->
          <div class="relative ${index === 0 ? 'lg:col-span-1' : 'lg:col-span-2'}">
            <!-- Yellow Background Card -->
            <div class="absolute -top-2 -left-2 bg-[#FFB703] rounded-lg w-full h-full z-0"></div>
            <!-- Main Card -->
            <div class="bg-white rounded-lg p-4 sm:p-6 md:p-8 relative z-10 shadow-lg min-h-64 sm:min-h-72 md:h-80 flex flex-col justify-between">
              <div>
                <div class="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-[#FFB703] rounded-md flex items-center justify-center mb-3 sm:mb-4">
                  <i class="fas ${card.icon} text-white text-lg sm:text-xl md:text-2xl"></i>
                </div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b-2 border-[#FFB703] pb-2" style="display: inline-block;">${card.title}</h3>
                ${index === 0 ? `
                <div class="space-y-1.5 sm:space-y-2 pt-2 sm:pt-3 text-xs sm:text-sm">
                  ${card.name ? `<p class="font-semibold text-gray-900">${card.name}</p>` : ''}
                  ${card.address ? `<p class="text-xs text-gray-600 leading-relaxed">${card.address}</p>` : ''}
                  ${card.phone ? `<p class="text-blue-600 font-medium mt-1.5 sm:mt-2 break-all">${card.phone}</p>` : ''}
                </div>
                ` : `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-3 text-xs sm:text-sm">
                  <div class="space-y-1.5 sm:space-y-2">
                    ${card.company ? `<p class="font-semibold text-gray-900">${card.company}</p>` : ''}
                    ${card.phone ? `<p class="text-xs text-gray-600 mt-1.5 sm:mt-2">No. Telp : <span class="text-blue-600 font-medium break-all"><a href="tel:${card.phone.replace(/[^0-9]/g, '')}">${card.phone}</a></span></p>` : ''}
                    ${card.email ? `<p class="text-xs text-gray-600">Email : <span class="text-blue-600 font-medium break-all">${card.email}</span></p>` : ''}
                  </div>
                  <div class="space-y-1.5 sm:space-y-2">
                    ${card.info ? `<p class="text-xs text-gray-600">${card.info}</p>` : ''}
                    ${card.whatsapp ? `<p class="text-xs text-gray-600 mt-1.5 sm:mt-2">WhatsApp : <span class="text-blue-600 font-medium break-all">${card.whatsapp}</span></p>` : ''}
                  </div>
                </div>
                `}
              </div>
            </div>
          </div>
          `).join('')}
        </div>

        <!-- Admin Replies Section -->
        <div id="admin-replies-section" class="relative z-10 mt-12 max-w-4xl mx-auto hidden">
          <div class="relative">
            <div class="absolute -top-2 -left-2 bg-[#FFB703] rounded-lg w-full h-full z-0"></div>
            <div class="bg-white rounded-lg p-6 md:p-8 relative z-10 shadow-lg">
              <h3 class="text-xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                <i class="fa-solid fa-comments text-[#FFB703]"></i>
                Balasan dari Admin
              </h3>
              <div id="replies-container" class="space-y-4">
                <!-- Replies will be populated here -->
              </div>
              <div id="no-replies-message" class="text-center text-gray-500 py-8 hidden">
                <i class="fa-solid fa-envelope-open text-4xl text-gray-300 mb-4"></i>
                <p>Belum ada balasan dari admin</p>
                <p class="text-sm text-gray-400">Kirimi kami pesan dan tunggu balasan dari tim kami</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form Section -->
        <div class="relative z-10 mt-12 max-w-2xl mx-auto">
          <div class="relative">
            <div class="absolute -top-2 -left-2 bg-[#FFB703] rounded-lg w-full h-full z-0"></div>
            <div class="bg-white rounded-lg p-6 md:p-8 relative z-10 shadow-lg">
              <h3 class="text-xl font-bold text-gray-800 mb-6 text-center">Kirim Pesan</h3>
              <form id="contact-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap <span class="text-red-500">*</span></label>
                    <input type="text" name="name" required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB703] text-gray-800"
                      placeholder="Masukkan nama Anda">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email <span class="text-red-500">*</span></label>
                    <input type="email" name="email" required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB703] text-gray-800"
                      placeholder="email@example.com">
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Pesan <span class="text-red-500">*</span></label>
                  <textarea name="message" rows="5" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB703] text-gray-800 resize-none"
                    placeholder="Tulis pesan Anda..."></textarea>
                </div>
                <button type="submit" class="w-full bg-[#FFB703] text-[#14213D] font-bold py-3 rounded-lg hover:bg-yellow-500 transition">
                  <i class="fa-solid fa-paper-plane mr-2"></i>Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Wave Bottom - Overlapping -->
        <div class="absolute bottom-0 left-0 w-full overflow-hidden z-0 pointer-events-none">
          <img src="/images/wave_contact.png" alt="wave" class="w-full h-auto block">
        </div>

      </div>
    </section>

    <!-- Success Modal -->
    <div id="contact-success-modal" class="fixed inset-0 z-[100] hidden">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div class="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div class="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl text-center">
          <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-check text-white text-3xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Pesan Terkirim!</h3>
          <p class="text-gray-600 mb-6">Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.</p>
          <button id="close-contact-modal" class="bg-[#FFB703] text-[#14213D] font-bold py-3 px-8 rounded-xl hover:bg-yellow-500 transition">
            Tutup
          </button>
        </div>
      </div>
    </div>
  `;
}

export function mount() {
  const user = getUser();

  const form = document.getElementById('contact-form');
  const successModal = document.getElementById('contact-success-modal');
  const closeModalBtn = document.getElementById('close-contact-modal');

  // Load and display admin replies
  loadAdminReplies();

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!user) {
        showLoginRequiredModal();
        return;
      }

      // 2. Collect form data
      const formData = new FormData(form);

      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        userId: user.id,
      };

      try {
        // 3. Call backend
        const res = await fetch(config.CONTACTMESSAGE_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Gagal kirim message");
        }

        // 4. Success
        successModal.classList.remove("hidden");
        form.reset();

      } catch (err) {
        alert(err.message);
      }
    });
  }

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
    });
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.add('hidden');
      }
    });
  }

  // Check for replies periodically (every 30 seconds)
  setInterval(() => {
    loadAdminReplies();
  }, 30000);

  return null;
}

function loadAdminReplies() {
  const repliesSection = document.getElementById('admin-replies-section');
  const repliesContainer = document.getElementById('replies-container');
  const noRepliesMessage = document.getElementById('no-replies-message');

  if (!repliesSection || !repliesContainer || !noRepliesMessage) return;

  // Get contact messages from localStorage
  const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');

  // Filter messages that have replies
  const messagesWithReplies = contactMessages.filter(msg => msg.reply && msg.reply.trim() !== '');

  if (messagesWithReplies.length > 0) {
    // Show replies section
    repliesSection.classList.remove('hidden');
    noRepliesMessage.classList.add('hidden');

    // Sort by repliedAt date (newest first)
    messagesWithReplies.sort((a, b) => new Date(b.repliedAt) - new Date(a.repliedAt));

    // Render replies
    repliesContainer.innerHTML = messagesWithReplies.map((message, index) => `
      <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-[#FFB703] rounded-full flex items-center justify-center flex-shrink-0">
            <i class="fa-solid fa-user-tie text-white text-lg"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-2">
              <h4 class="font-semibold text-gray-800">Tim Renova</h4>
              <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Admin
              </span>
            </div>
            <p class="text-sm text-gray-500 mb-2">Untuk: ${message.name} (${message.email})</p>
            <div class="bg-gray-50 rounded-lg p-4 mb-3">
              <p class="text-sm text-gray-600 mb-2 font-medium">Pesan Asli:</p>
              <p class="text-sm text-gray-700 italic">"${message.message}"</p>
            </div>
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p class="text-sm text-gray-700">${message.reply}</p>
            </div>
            <p class="text-xs text-gray-400 mt-3">
              <i class="fa-solid fa-clock mr-1"></i>
              Dibalas pada: ${message.repliedAt ? new Date(message.repliedAt).toLocaleString('id-ID') : '-'}
            </p>
          </div>
        </div>
      </div>
    `).join('');
  } else {
    // Show no replies message
    repliesSection.classList.remove('hidden');
    noRepliesMessage.classList.remove('hidden');
    repliesContainer.innerHTML = '';
  }
}
