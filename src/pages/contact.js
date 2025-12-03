import { contactData } from "../data/mockData.js";

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

        <!-- Wave Bottom - Overlapping -->
        <div class="absolute bottom-0 left-0 w-full overflow-hidden z-0 pointer-events-none">
          <img src="/images/wave_contact.png" alt="wave" class="w-full h-auto block">
        </div>

      </div>
    </section>
  `;
}

export function mount() {
  return null;
}
