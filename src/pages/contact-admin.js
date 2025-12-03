import { contactData } from "../data/mockData.js";

let isEditModalOpen = false;

export default function ContactAdminPage() {
  const cards = contactData;

  return `
    <section class="bg-[#14213D] text-white px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative pb-24 sm:pb-28 md:pb-32">
      <div class="max-w-7xl mx-auto">

        <!-- Cards grid (same style as contact) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 relative z-10 mt-8 sm:mt-12 md:mt-16">
          ${cards
            .map(
              (card, index) => `
            <div class="relative">
              <!-- Yellow Background Card -->
              <div class="absolute -top-2 -left-2 bg-[#FFB703] rounded-lg w-full h-full z-0"></div>
              <!-- Main Card -->
              <div class="bg-white rounded-lg p-4 sm:p-6 md:p-8 relative z-10 shadow-lg min-h-64 sm:min-h-72 md:h-80 flex flex-col justify-between">
                <div>
                  <div class="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-[#FFB703] rounded-md flex items-center justify-center mb-3 sm:mb-4">
                    <i class="fas ${card.icon} text-white text-lg sm:text-xl md:text-2xl"></i>
                  </div>
                  <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b-2 border-[#FFB703] pb-2 inline-block">
                    ${card.title}
                  </h3>
                  <div class="space-y-1.5 sm:space-y-2 pt-2 sm:pt-3 text-xs sm:text-sm">
                    ${card.description ? `<p class="text-gray-700">${card.description}</p>` : ""}
                    ${card.phone ? `<p class="font-bold text-gray-900 break-all">${card.phone}</p>` : ""}
                    ${card.email ? `<p class="text-blue-600 font-medium break-all">${card.email}</p>` : ""}
                  </div>
                </div>

                <!-- Admin Actions -->
                <div class="mt-4 flex justify-end gap-2">
                  <button class="contact-admin-edit-btn px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-xs sm:text-sm font-semibold text-white flex items-center gap-1"
                          data-card-id="${card.id}">
                    <i class="fa-solid fa-pen"></i>
                    Edit
                  </button>
                  <button class="contact-admin-delete-btn px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs sm:text-sm font-semibold text-white flex items-center gap-1"
                          data-card-id="${card.id}">
                    <i class="fa-solid fa-trash"></i>
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Wave Bottom -->
        <div class="absolute bottom-0 left-0 w-full overflow-hidden z-0 pointer-events-none">
          <img src="/images/wave_contact.png" alt="wave" class="w-full h-auto block">
        </div>

        <!-- Edit Modal -->
        <div id="contact-admin-modal"
             class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-3 sm:px-4 z-50 ${
               isEditModalOpen ? "" : "hidden"
             }">
          <div class="bg-[#e4e4e4] rounded-2xl shadow-2xl max-w-4xl w-full p-4 sm:p-6 md:p-7 relative">

            <button id="contact-admin-modal-close"
              class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white">
              <i class="fa-solid fa-xmark"></i>
            </button>

            <!-- Form content -->
            <div class="space-y-4 text-gray-900 text-sm md:text-base">
              
              <!-- Deskripsi + Icon row -->
              <div class="flex flex-col lg:flex-row lg:items-start lg:gap-6">
                <div class="flex-1 mb-3 lg:mb-0">
                <div>
                  <label class="block font-semibold mb-1">Judul<span class="text-red-500">*</span></label>
                  <input type="text" placeholder="Masukkan Judul"
                        class="w-full rounded-xl border border-gray-300 px-4 py-2.5 bg-white text-gray-900">
                </div>
                  <label class="block font-semibold mb-1">Deskripsi<span class="text-red-500">*</span></label>
                  <textarea rows="4" placeholder="Masukkan Deskripsi"
                            class="w-full rounded-xl border border-gray-300 px-4 py-2.5 bg-white text-gray-900 resize-none"></textarea>
                </div>

                <div class="w-full lg:w-56 flex flex-col items-center lg:items-start gap-3 mt-2 lg:mt-0">
                  <label class="block font-semibold mb-1 lg:mb-0 lg:self-start">Icon/Gambar<span class="text-red-500">*</span></label>
                  <div class="flex items-center gap-3">
                    <div class="w-14 h-14 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center bg-white cursor-pointer">
                      <i class="fa-regular fa-image text-xl text-gray-500"></i>
                    </div>
                    <label class="text-[11px] sm:text-xs text-gray-700 border border-gray-400 rounded-full px-3 py-1 cursor-pointer bg-white">
                      Klik <span class="text-blue-600 font-semibold">di sini</span> untuk Unggah
                      <input type="file" class="hidden">
                    </label>
                  </div>
                </div>
              </div>

              <!-- Tautan -->
              <div class="mt-1">
                <label class="block font-semibold mb-2">Tautan<span class="text-red-500">*</span></label>

                ${[1, 2, 3]
                  .map(
                    () => `
                  <div class="flex flex-col md:flex-row gap-2 mb-2">
                    <input type="text" placeholder="Nama Tautan"
                           class="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 bg-white text-gray-900">
                    <div class="flex flex-1">
                      <span class="px-3 flex items-center justify-center rounded-l-xl border border-gray-300 bg-white text-gray-600 text-sm">
                        <i class="fa-solid fa-link"></i>
                      </span>
                      <input type="text" placeholder="Masukkan Link"
                             class="flex-1 rounded-r-xl border border-gray-300 border-l-0 px-4 py-2.5 bg-white text-gray-900">
                    </div>
                  </div>
                `
                  )
                  .join("")}

                <button type="button"
                  class="mt-1 inline-flex items-center justify-center w-7 h-7 rounded-full border border-gray-500 text-gray-800 text-lg leading-none">
                  +
                </button>
              </div>
            </div>

            <!-- Modal footer buttons -->
            <div class="mt-6 flex justify-end gap-3 text-sm md:text-base">
              <button class="px-6 sm:px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                + Tambah
              </button>
              <button class="px-6 sm:px-8 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold">
                Edit
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

export function mount() {
  // Open modal on any edit button
  document.querySelectorAll(".contact-admin-edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = document.getElementById("contact-admin-modal");
      if (!modal) return;
      modal.classList.remove("hidden");
      isEditModalOpen = true;
    });
  });

  // Delete buttons (dummy)
  document.querySelectorAll(".contact-admin-delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.cardId;
      const ok = window.confirm(
        "Hapus kartu kontak ini? (Demo saja, data asli tidak akan berubah)"
      );
      if (ok) {
        alert("Kontak dengan ID " + id + " dihapus (dummy).");
      }
    });
  });

  // Close modal
  const modal = document.getElementById("contact-admin-modal");
  const closeBtn = document.getElementById("contact-admin-modal-close");
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      isEditModalOpen = false;
    });
  }

  // Close on backdrop click
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
        isEditModalOpen = false;
      }
    });
  }

  return () => {};
}


