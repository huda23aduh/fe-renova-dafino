import { carsData, brandsData } from "../../data/mockData.js";

let currentIndex = 0;
const itemsPerLoad = 9;
let observer = null;
let selectedBrand = null; // Filter state
let filteredData = carsData; // Data yang di-filter

export default function Catalog() {
  currentIndex = itemsPerLoad; // Reset index saat render
  filteredData = carsData; // Reset filter
  const initialCars = filteredData.slice(0, itemsPerLoad);
  return `
    <section class="bg-[#d9d9d9] pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-20">
      <div class="max-w-7xl mx-auto">
        <!-- Main Content with Sidebar -->
        <div class="flex gap-6 lg:gap-8">

          <!-- Left Sidebar - Brand Icons (Filter) - Desktop Only -->
          <div class="hidden lg:flex flex-col items-start gap-4 py-4 relative">
            <div class="flex flex-col gap-8 relative z-10 ml-12">
              ${brandsData.map(brand => `
                <div class="flex flex-col items-center gap-2 cursor-pointer group brand-filter" data-brand="${brand.name}">
                  <!-- Blue circle with brand image-->
                  <div class="w-25 h-25 bg-[#14213D] rounded-full flex items-center justify-center transition-transform duration-300 relative z-10 shadow-lg overflow-hidden">
                    <img src="${brand.image}" alt="${brand.name}" class="w-16 h-16 object-contain" />
                  </div>
                  <div class="absolute w-26 h-26 bg-[#FFB703] rounded-full"></div>
                  
                  <!-- Brand name -->
                  <span class="text-xs font-bold text-[#14213D] text-center mt-1">${brand.name}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right Content - Cars Container dengan Scroll -->
          <div class="flex-1 lg:border-l-2 lg:border-[#FFB703] lg:pl-6 lg:ml-2 w-full">

            <!-- Mobile/Tablet Filter - Horizontal Scroll -->
            <div class="lg:hidden flex overflow-x-auto gap-3 mb-4 pb-2 scrollbar-hide">
              ${brandsData.map(brand => `
                <div class="flex flex-col items-center gap-1 cursor-pointer  brand-filter" data-brand="${brand.name}">
                  <div class="relative">
                    <div class="w-14 h-14 sm:w-20 sm:h-20 bg-[#14213D] rounded-full flex items-center justify-center transition-opacity duration-300 shadow-lg overflow-hidden relative z-10">
                      <img src="${brand.image}" alt="${brand.name}" class="w-6 sm:w-10 object-contain" />
                    </div>
                  </div>
                  <span class="text-xs font-semibold pt-2 text-[#14213D] text-center">${brand.name}</span>
                </div>
              `).join('')}
            </div>

            <!-- Section Title (di atas card, di kanan garis) -->
            <h2 class="text-xl font-bold text-[#14213D] mb-4">
              Temukan Mobil Impian Anda
            </h2>

            <!-- Scrollable Container untuk Grid (hidden scrollbar) -->
            <div id="catalog-scroll-container" class="max-h-[1200px] overflow-y-auto pr-2 scrollbar-hide">
            <!-- Grid Container -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8" id="cars-grid">
                ${renderCars(initialCars)}
              </div>

              <!-- Sentinel untuk infinite scroll -->
              <div id="scroll-sentinel" class="py-8 text-center text-gray-500 text-sm"></div>

            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCars(cars) {
  return cars.map(car => `
    <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group relative border-2 border-[#FFB703]">
      <!-- Image Container -->
      <div class="relative overflow-hidden bg-gray-200 h-40 sm:h-48 md:h-56">
        <img src="${car.image}" alt="${car.brand}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
      </div>

      <!-- Content -->
      <div class="flex flex-col h-full">

        <!-- Brand Name -->
        <h3 class="text-xs sm:text-sm md:text-base font-bold text-[#14213D] mb-1 sm:mb-2 line-clamp-2 text-center px-3 sm:px-4 md:px-5 pt-3 sm:pt-4">
          ${car.brand}
        </h3>

        <!-- Wave Image FIXED -->
        <div class="w-full overflow-hidden">
          <img src="images/wave_card.png" alt="wave" class="w-full object-cover select-none pointer-events-none" />
        </div>

        <!-- Description, Whistlist, Price -->
        <div class="bg-[#14213D] bg-opacity-60 px-3 sm:px-4 md:px-5 py-2 sm:py-3 -mt-8 sm:-mt-10 relative z-10 flex-1 flex-col">
          <div class="flex justify-between items-start gap-1 sm:gap-2 mb-2 sm:mb-3">
            <p class="text-xs sm:text-sm text-gray-200 flex-1 line-clamp-2">
              ${car.description}
            </p>
            <div class="flex items-center gap-0.5 sm:gap-1">
              <i class="fa-regular fa-heart text-white text-sm sm:text-lg"></i>
              <span class="text-xs font-bold text-white">${car.whistlist}</span>
            </div>
          </div>

          <div class="flex items-center justify-between gap-1 sm:gap-2 mt-auto">
            <p class="text-sm sm:text-base md:text-lg font-bold text-[#FFB703]">
              ${car.price}
            </p>
            <button class="px-3 sm:px-4 py-1 sm:py-2 font-semibold bg-transparent text-xs sm:text-sm transition-all duration-300 hover:opacity-90 whitespace-nowrap text-white cursor-pointer relative pb-0.5 sm:pb-1 hover:border-b-2 hover:border-white">
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}


// Mount function untuk infinite scroll dan brand filtering
export function mount() {
  const scrollContainer = document.getElementById("catalog-scroll-container");
  const sentinel = document.getElementById("scroll-sentinel");
  const grid = document.getElementById("cars-grid");
  const brandFilters = document.querySelectorAll(".brand-filter");
  
  if (!sentinel || !grid || !scrollContainer) {
    return;
  }

  // Brand filter click handler
  brandFilters.forEach(filter => {
    filter.addEventListener("click", () => {
      const brand = filter.dataset.brand;
      
      if (selectedBrand === brand) {
        // Klik ulang untuk remove filter
        selectedBrand = null;
        filteredData = carsData;
        
        // Reset semua button ke opacity-100
        brandFilters.forEach(btn => {
          btn.classList.remove("opacity-50");
          btn.classList.add("opacity-100");
        });
      } else {
        // Filter berdasarkan brand
        selectedBrand = brand;
        filteredData = carsData.filter(car => car.brand.includes(brand));
        
        // Update all filter buttons
        brandFilters.forEach(btn => {
          if (btn.dataset.brand === brand) {
            btn.classList.remove("opacity-80");
            btn.classList.add("opacity-100");
          } else {
            btn.classList.add("opacity-80");
            btn.classList.remove("opacity-100");
          }
        });
      }
      
      // Reset scroll container dan render filtered data
      scrollContainer.scrollTop = 0;
      currentIndex = itemsPerLoad;
      grid.innerHTML = renderCars(filteredData.slice(0, itemsPerLoad));
    });
  });

  // Disconnect observer lama jika ada
  if (observer) {
    observer.disconnect();
  }

  // Intersection Observer untuk infinite scroll (hanya di dalam container)
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && currentIndex < filteredData.length) {
        // Load next batch dari filteredData
        const nextCars = filteredData.slice(currentIndex, currentIndex + itemsPerLoad);
        if (nextCars.length > 0) {
          const newHTML = renderCars(nextCars);
          grid.insertAdjacentHTML('beforeend', newHTML);
          currentIndex += itemsPerLoad;
        }
      }
    });
  }, {
    root: scrollContainer, // Observer hanya di dalam scroll container ini
    rootMargin: '500px',
    threshold: 0.01
  });

  observer.observe(sentinel);

  // Cleanup function
  return () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };
}
