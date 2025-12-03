import { carsData, brandsData } from "../data/mockData.js";
import router from "../router.js";

let currentCarId = null;
let selectedBrand = null;
let filteredBrandData = carsData;
let currentBrand = null;

// Global function for button navigation
window.goToCarDetail = function(carId) {
  sessionStorage.setItem('selectedCarId', carId);
  router();
};

export default function CarDetail() {
  // Get carId dari sessionStorage
  const carId = sessionStorage.getItem('selectedCarId');
  
  currentCarId = carId;
  const parsedId = parseInt(currentCarId);
  const car = carsData.find(c => c.id === parsedId);

  if (!car) {
    return `<section class="bg-[#14213D] text-white px-6 py-12 min-h-screen mt-20">
      <div class="max-w-[1450px] mx-auto">
        <h1 class="text-4xl font-black mb-4">Mobil tidak ditemukan</h1>
        <a href="#brand-catalog" class="text-[#FFB703] font-bold">← Kembali ke Katalog</a>
      </div>
    </section>`;
  }

  // Mock images - using same image for demo
  const images = car.gallery && car.gallery.length > 0 ? car.gallery : [car.image, car.image, car.image, car.image];

  return `
  <section class="bg-[#14213D] text-white px-4 md:px-6 py-6 md:py-12 relative min-h-screen mt-20">

    <div class="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

      <!-- LEFT SIDE - GALLERY & DESCRIPTION -->
      <div class="lg:col-span-2 space-y-4 md:space-y-6">

        <!-- Gallery Card - 3 Images Grid Only -->
        <div class="rounded-xl overflow-visible space-y-3">
          <!-- 3 Image Cards Grid with Swiper -->
          <div class="swiper gallery-swiper w-full">
            <div class="swiper-wrapper">
              ${images.map((img, idx) => `
                <div class="swiper-slide w-auto">
                  <div class="rounded-lg overflow-hidden h-50">
                    <img src="${img}" alt="car-${idx}" class="w-full h-full object-cover">
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Dots Pagination - Separated Below -->
          <div class="swiper-pagination relative! flex justify-center py-2!"></div>
        </div>

        <!-- Title Card -->
        <div class="bg-[#FFB703] text-[#14213D] rounded-xl p-4 md:p-6 -mt-6">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h1 class="text-2xl md:text-3xl font-black">${car.brand}</h1>
            </div>
            <div class="flex gap-3">
              <button class="car-share-detail hover:scale-110 transition text-lg md:text-2xl" data-car-id="${car.id}" title="Share">
                <i class="fas fa-share-alt"></i>
              </button>
              <button class="car-like-detail hover:scale-110 transition text-lg md:text-2xl" data-car-id="${car.id}" title="Like">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3 md:gap-4 text-xs md:text-sm font-semibold">
            <div class="flex items-center gap-2">
              <i class="fas fa-gas-pump text-lg"></i>
              <span>${car.fuelType || 'Bensin'}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-road text-lg"></i>
              <span>${car.kilometers || '0'} KM</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-gears text-lg"></i>
              <span>${car.transmission || 'Manual'}</span>
            </div>
          </div>
        </div>

        <!-- Description Card -->
        <div class="bg-[#FFB703] text-[#14213D] rounded-xl p-4 md:p-6 h-48 md:h-70 overflow-y-auto scrollbar-hide">
          <h2 class="text-xl md:text-2xl font-black mb-4">Deskripsi</h2>
          <p class="text-xs md:text-sm leading-relaxed">${car.description || 'Mobil berkualitas, terawat dengan baik'}</p>
        </div>

        <!-- Features Section - 3 Cards Below Description -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Interior Card -->
          <div class="bg-[#FFB703] text-[#14213D] rounded-xl p-4">
            <h3 class="text-lg font-black mb-3">Interior</h3>
            <div class="space-y-2">
              ${car.interior && car.interior.length > 0 ? car.interior.map(item => `<div class="py-2 border-b border-[#14213D] text-xs"><span>${item}</span></div>`).join('') : '<p class="text-xs">Fitur tidak tersedia</p>'}
            </div>
          </div>

          <!-- Eksterior Card -->
          <div class="bg-[#FFB703] text-[#14213D] rounded-xl p-4">
            <h3 class="text-lg font-black mb-3">Eksterior</h3>
            <div class="space-y-2">
              ${car.exterior && car.exterior.length > 0 ? car.exterior.map(item => `<div class="py-2 border-b border-[#14213D] text-xs"><span>${item}</span></div>`).join('') : '<p class="text-xs">Fitur tidak tersedia</p>'}
            </div>
          </div>

          <!-- Fasilitas Card -->
          <div class="bg-[#FFB703] text-[#14213D] rounded-xl p-4">
            <h3 class="text-lg font-black mb-3">Fasilitas</h3>
            <div class="space-y-2">
              ${car.fasilitas && car.fasilitas.length > 0 ? car.fasilitas.map(item => `<div class="py-2 border-b border-[#14213D] text-xs"><span>${item}</span></div>`).join('') : '<p class="text-xs">Fitur tidak tersedia</p>'}
            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT SIDE - PRICE & CTA -->
      <div class="space-y-4 md:space-y-6">

        <!-- Price Card with Gradient -->
        <div class="bg-linear-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-[#14213D] rounded-xl p-4 md:p-6">
          <p class="text-lg md:text-2xl font-black mb-6">${car.price}</p>

          <!-- Credit Estimation -->
          <div class="space-y-2 text-xs md:text-sm">
            <p class="font-bold">Estimasi Perhitungan Kredit :</p>
            <div class="flex justify-between">
              <span>Down Payment</span>
              <span class="font-bold">Rp 22.878.000,00</span>
            </div>
            <div class="flex justify-between">
              <span>Cicilan</span>
              <span class="font-bold">Rp 3.432.000,00 x 60 Bulan</span>
            </div>
          </div>
        </div>

        <!-- CTA Card Separated -->
        <div class="bg-linear-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-[#14213D] rounded-xl p-4 md:p-6">
          <p class="text-xs md:text-sm font-semibold mb-4 leading-snug">
            <span class="font-bold">Suka mobil ini?</span> Tanyakan Staf Ahli kami untuk cara beli bebas ribet
          </p>
          
          <!-- CTA Buttons - Side by Side with Gradient -->
          <div class="flex gap-3">
            <button class="car-chat-btn flex-1 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition text-xs md:text-sm shadow-lg hover:shadow-xl" style="background: linear-gradient(150deg, #00985B 0%, #333F47 50%, #00985B 100%);">
              <i class="fas fa-comments"></i>
              <span>Chat</span>
            </button>
            <button class="car-testdrive-btn flex-1  text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition text-xs md:text-sm shadow-lg" style="background: linear-gradient(150deg, #EE0F0F 0%, #E76F51 50%, #EE0F0F 100%);>
              <i class="fas fa-car"></i>
              <span>Test Drive</span>
            </button>
          </div>
        </div>

        <!-- Location Card with Gradient -->
        <div class="bg-linear-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-[#14213D] rounded-xl p-4 md:p-6">
          <div class="space-y-3 md:space-y-4">
            
            <!-- Address & Map Section -->
            <div class="grid grid-cols-2 gap-3">
              <!-- Address -->
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <i class="fas fa-map-marker-alt text-[#14213D]"></i>
                  <p class="text-xs md:text-sm font-bold">Alamat</p>
                </div>
                <p class="text-xs md:text-sm leading-snug">Rukan Puri Mansion Blok A No.38, Jl. Lingkar Luar Barat, Kembangan Selatan, Jakarta Barat</p>
              </div>
              <!-- Map Preview -->
              <div class="bg-[#14213D] bg-opacity-20 rounded-lg h-32 md:h-40 flex items-center justify-center">
                <i class="fas fa-map text-2xl md:text-3xl text-[#14213D] opacity-50"></i>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t-2 border-[#14213D] opacity-50"></div>

            <!-- Hours & Days Section -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <i class="fas fa-clock text-[#14213D]"></i>
                  <p class="text-xs md:text-sm font-bold">Jam</p>
                </div>
                <p class="text-xs md:text-sm">09:00 - 17:00</p>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <i class="fas fa-calendar text-[#14213D]"></i>
                  <p class="text-xs md:text-sm font-bold">Hari</p>
                </div>
                <p class="text-xs md:text-sm">Senin - Minggu</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>

    <!-- Brand / Merek Lain Section -->
    <div class="mt-12 pt-8 ">
      <div class="max-w-[1400px] border-t-2 border-[#FFB703] mx-auto">
        <h2 class="text-3xl font-bold text-white my-8">Brand / Merek Lain</h2>
        
        <!-- Brand Icons Row - Left Aligned -->
        <div class="flex gap-2 md:gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          ${brandsData.map(b => `
            <button class="brand-filter-detail shrink-0 flex flex-col items-center gap-1 cursor-pointer" data-brand="${b.name}">
              <div class="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg"
                style="background: ${b.name === currentBrand ? "linear-gradient(45deg, #FFB703 0%, #FFA500 100%)" : "linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)"};">
                <img src="${b.image}" class="w-6 h-6 md:w-8 md:h-8 object-contain"
                     style="filter: ${b.name === currentBrand ? "brightness(0)" : "brightness(1)"};">
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Iklan Terkait Section -->
        <div class="bg-[#FFB703] rounded-2xl p-6 md:p-8">
          <h3 class="text-2xl font-bold text-[#14213D] mb-6">Iklan Terkait</h3>
          
          <!-- Cars Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="related-cars-grid">
            ${filteredBrandData.slice(0, 3).map(c => `
              <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col">
                <div class="flex flex-1">
                  <!-- Image Left -->
                  <div class="w-2/5 shrink-0">
                    <img src="${c.image}" alt="${c.brand}" class="w-full h-full object-cover">
                  </div>
                  <!-- Info Right -->
                  <div class="w-3/5 p-3 md:p-4 flex flex-col justify-between">
                    <div>
                      <h4 class="text-sm md:text-base font-bold text-[#14213D] line-clamp-2">${c.brand}</h4>
                      <p class="text-xs text-gray-600 mt-1">${c.fuelType} | ${c.kilometers} km</p>
                      <p class="text-lg md:text-xl font-bold text-[#14213D] mt-2">${c.price}</p>
                    </div>
                    <!-- Button Bottom Right -->
                    <button type="button" class="car-detail-btn bg-[#14213D] text-white font-bold py-2 px-3 rounded-lg hover:bg-opacity-80 transition self-end cursor-pointer" data-car-id="${c.id}">
                      <i class="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

  </section>
  `;
}

export function mount() {
  // Initialize Swiper Gallery - 3 slides visible
  const swiper = new Swiper('.gallery-swiper', {
    loop: true,
    spaceBetween: 12,
    slidesPerView: 3,
    effect: 'slide',
    autoplay: false,
    speed: 300,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active'
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 12,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 12,
      }
    }
  });

  // Share button
  document.querySelectorAll('.car-share-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const carId = btn.dataset.carId;
      const shareText = `Lihat mobil pilihan saya di Renova Mobil! Car ID: ${carId}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Renova Mobil',
          text: shareText
        }).catch(err => {});
      } else {
        navigator.clipboard.writeText(shareText).then(() => {
          // Success: link copied silently
        });
      }
    });
  });

  // Like button
  document.querySelectorAll('.car-like-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('liked');
      const icon = btn.querySelector('i');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
      if (icon.classList.contains('fas')) {
        btn.style.color = '#d32f2f';
      } else {
        btn.style.color = 'inherit';
      }
    });
  });

  // Chat button
  document.querySelectorAll('.car-chat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Chat feature placeholder
    });
  });

  // Test Drive button
  document.querySelectorAll('.car-testdrive-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Test Drive feature placeholder
    });
  });

  // Car detail button - navigate to related car detail
  const attachCarDetailListeners = () => {
    const carDetailButtons = document.querySelectorAll('.car-detail-btn');
    
    carDetailButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const carId = btn.dataset.carId;
        sessionStorage.setItem('selectedCarId', carId);
        // Trigger hash change to force router to re-execute
        window.location.hash = '#car-detail';
        // Force router call immediately in case hash didn't change
        setTimeout(() => {
          router();
          // Scroll to top after data loads
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
      });
    });
  };

  // Initial attach
  attachCarDetailListeners();

  // Brand filter for Merek Lain section
  const brandFilters = document.querySelectorAll('.brand-filter-detail');
  const relatedCarsGrid = document.getElementById('related-cars-grid');

  brandFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      const brand = filter.dataset.brand;

      if (selectedBrand === brand) {
        // Klik ulang untuk remove filter
        selectedBrand = null;
        currentBrand = null;
        filteredBrandData = carsData;
      } else {
        // Filter berdasarkan brand
        selectedBrand = brand;
        currentBrand = brand;
        filteredBrandData = carsData.filter(car => car.brand.includes(brand));
      }

      // Update brand filter button styles
      brandFilters.forEach(btn => {
        const btnBrand = btn.dataset.brand;
        const divStyle = btn.querySelector('div');
        const imgStyle = btn.querySelector('img');
        if (btnBrand === currentBrand) {
          divStyle.style.background = "linear-gradient(45deg, #FFB703 0%, #FFA500 100%)";
          imgStyle.style.filter = "brightness(0)";
        } else {
          divStyle.style.background = "linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)";
          imgStyle.style.filter = "brightness(1)";
        }
      });

      // Render filtered cars
      relatedCarsGrid.innerHTML = filteredBrandData.slice(0, 3).map(c => `
        <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col">
          <div class="flex flex-1">
            <!-- Image Left -->
            <div class="w-2/5 shrink-0">
              <img src="${c.image}" alt="${c.brand}" class="w-full h-full object-cover">
            </div>
            <!-- Info Right -->
            <div class="w-3/5 p-3 md:p-4 flex flex-col justify-between">
              <div>
                <h4 class="text-sm md:text-base font-bold text-[#14213D] line-clamp-2">${c.brand}</h4>
                <p class="text-xs text-gray-600 mt-1">${c.fuelType} | ${c.kilometers} km</p>
                <p class="text-lg md:text-xl font-bold text-[#14213D] mt-2">${c.price}</p>
              </div>
              <!-- Button Bottom Right -->
              <button type="button" class="car-detail-btn bg-[#14213D] text-white font-bold py-2 px-3 rounded-lg hover:bg-opacity-80 transition self-end cursor-pointer" data-car-id="${c.id}">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');

      // Re-attach event listeners ke button yang baru
      attachCarDetailListeners();
      
      // Scroll ke Merek Lain section
      const merekSection = document.querySelector('section.bg-\\[\\#14213D\\]');
      if (merekSection) {
        const merekLainSection = merekSection.querySelector('[id*="related"]')?.closest('div').parentElement;
        if (merekLainSection) {
          merekLainSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}
