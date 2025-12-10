import { carsData, brandsData } from "../data/mockData.js";

let currentBrand = sessionStorage.getItem('selectedBrand') || 'TOYOTA';
let currentCars = [];
let isLoading = false;

export default function BrandCatalog() {
  currentBrand = sessionStorage.getItem('selectedBrand') || 'TOYOTA';
  isLoading = true;

  // Filter cars by selected brand
  currentCars = carsData.filter(car =>
    car.brand.toUpperCase().includes(currentBrand.toUpperCase())
  );
  
  // Fast operation - mark loading as complete
  isLoading = false;

  return `
  <section class="bg-[#14213D] text-white px-4 md:px-6 py-8 md:py-12 relative overflow-hidden min-h-screen mt-20">
    <div class="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 relative">

      <!-- LEFT SIDE -->
      <div class="flex flex-col items-center justify-start relative z-10 px-0 md:px-4">

        <!-- Brand Icons Horizontal -->
        <div class="flex gap-2 md:gap-4 mb-4 md:mb-6 overflow-x-auto pb-2 scrollbar-hide">
          ${brandsData.map(b => `
            <button class="brand-filter-btn shrink-0 flex flex-col items-center gap-1 cursor-pointer" data-brand="${b.name}">
              <div class="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg"
                style="background: ${b.name === currentBrand ? "linear-gradient(45deg, #FFB703 0%, #FFA500 100%)" : "linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)"};">
                <img src="${b.image}" class="w-6 h-6 md:w-8 md:h-8 object-contain"
                     style="filter: ${b.name === currentBrand ? "brightness(0)" : "brightness(1)"};">
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Brand Title -->
        <h1 class="text-4xl md:text-6xl lg:text-8xl font-black bg-linear-to-b from-[#FFB703] to-transparent bg-clip-text text-transparent tracking-tight leading-none md:-mb-6 lg:-mb-10">
          ${currentBrand}
        </h1>

        <!-- Big Car Image -->
        <div class="relative w-full h-[180px] md:h-[280px] lg:h-[380px] flex items-center justify-center">
          <img src="/images/${currentBrand.toLowerCase()}_car.png" class="h-full w-auto drop-shadow-2xl">
        </div>

        <!-- Total Mobil Badge -->
        <div class="mt-4 md:mt-6 rounded-xl p-3 md:p-5 text-center"
             style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
          <p class="text-2xl md:text-4xl font-bold">${currentCars.length}</p>
          <p class="text-xs md:text-sm font-bold mt-1">TOTAL MOBIL</p>
        </div>

      </div>

      <!-- YELLOW DIVIDER -->
      <div class="hidden lg:block absolute left-1/2 top-0 w-[3px] bg-[#FFB703] h-full transform -translate-x-1/2"></div>

      <!-- RIGHT SIDE -->
      <div class="flex flex-col lg:pl-10 relative px-0 md:px-4">

        <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">Pilihan Mobil ${currentBrand}</h2>

        <div id="cars-scroll-container" class="max-h-[400px] md:max-h-[600px] lg:max-h-[900px] overflow-y-auto pr-2 md:pr-4 scrollbar-hide">

          <div id="cars-grid" class="grid grid-cols-2 gap-2 md:gap-4 lg:gap-5">
            ${currentCars.length > 0 ? renderCarsDesktop(currentCars) : '<p class="col-span-2 text-center text-yellow-300">Memuat data...</p>'}
          </div>

        </div>
      </div>
    </div>
  </section>
  `;
}

function renderCarsDesktop(cars) {
  return cars.map(car => `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#FFB703] hover:shadow-2xl transition cursor-pointer">

      <div class="h-28 md:h-40 bg-gray-200 overflow-hidden">
        <img src="${car.image}" class="w-full h-full object-cover transition-transform hover:scale-110">
      </div>

      <div class="bg-[#14213D] text-white px-2 py-2 md:py-3 text-center flex items-center justify-center gap-2 relative z-20">
        <h3 class="text-xs md:text-base font-bold line-clamp-1">${car.brand}</h3>
      </div>

      <img src="/images/wave_card_yellow.png" class="w-full -mt-2 md:-mt-3 relative z-30">

      <div class="bg-[#FFB703] text-[#14213D] p-2 md:p-4 -mt-4 md:-mt-8 relative z-40 overflow-hidden">

        <div class="flex justify-between mb-2 md:mb-3 text-xs md:text-sm font-semibold gap-1">
          <div class="flex gap-2 md:gap-4 flex-wrap">
            <span><i class="fas fa-gas-pump"></i> <span class="hidden md:inline">${car.fuelType?.toUpperCase() || 'BENSIN'}</span><span class="md:hidden">${(car.fuelType?.toUpperCase() || 'BENSIN').substring(0, 1)}</span></span>
            <span><i class="fas fa-gears"></i> <span class="hidden md:inline">${car.transmission?.toUpperCase() || 'AUTO'}</span><span class="md:hidden">${(car.transmission?.toUpperCase() || 'AUTO').substring(0, 1)}</span></span>
          </div>
          <div class="flex gap-1">
            <button class="car-share-btn hover:scale-125 transition text-xs md:text-base" data-car-id="${car.id}" title="Share"><i class="fas fa-share-alt"></i></button>
            <button class="car-love-btn hover:scale-125 transition text-xs md:text-base" data-car-id="${car.id}" title="Add to Wishlist"><i class="fas fa-heart text-black"></i></button>
          </div>
        </div>

        <p class="text-xs md:text-sm font-semibold mb-2 md:mb-3"><i class="fas fa-road"></i> ${car.kilometers || '0'} KM</p>

        <div class="flex justify-between items-end gap-1">
          <p class="text-xs md:text-lg font-black">${car.price}</p>
          <button class="car-detail-btn bg-[#14213D] text-[#FFB703] px-1.5 md:px-2 py-1 md:py-2 rounded font-black text-xs md:text-xl -mr-2 md:-mr-3 -mb-2 md:-mb-3 hover:bg-gray-800 transition" data-car-id="${car.id}">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>

      </div>
    </div>
  `).join('');
}

export function mount() {
  
  // Immediately attach event listeners to existing DOM elements
  // No delay or setTimeout needed - DOM is already rendered

  // Brand filter buttons
  const brandButtons = document.querySelectorAll('.brand-filter-btn');
  
  brandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.brand;
      sessionStorage.setItem('selectedBrand', selected);
      location.reload();
    });
  });

  // Car detail button - navigate to detail page
  const carDetailButtons = document.querySelectorAll('.car-detail-btn');
  
  carDetailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const carId = btn.dataset.carId;
      sessionStorage.setItem('selectedCarId', carId);
      window.location.hash = '#car-detail';
    });
  });

  // Love button interaksi - save to localStorage
  const loveButtons = document.querySelectorAll('.car-love-btn');
  
  // Initialize heart icons based on localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  loveButtons.forEach(btn => {
    const carId = btn.dataset.carId;
    const heartIcon = btn.querySelector('i');
    if (favorites.includes(carId)) {
      heartIcon.classList.remove('far');
      heartIcon.classList.add('fas');
      btn.style.color = '#d32f2f';
    }
  });

  loveButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const carId = btn.dataset.carId;
      const heartIcon = btn.querySelector('i');
      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      if (favorites.includes(carId)) {
        // Remove from favorites
        favorites = favorites.filter(id => id !== carId);
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        btn.style.color = 'inherit';
      } else {
        // Add to favorites
        favorites.push(carId);
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        btn.style.color = '#d32f2f';
      }
      
      localStorage.setItem('favorites', JSON.stringify(favorites));
      
      // Update navbar favorite count
      if (window.updateFavoriteCount) {
        window.updateFavoriteCount();
      }
    });
  });

  // Share button interaksi
  const shareButtons = document.querySelectorAll('.car-share-btn');
  shareButtons.forEach(btn => {
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
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
          // Success: link copied silently
        });
      }
    });
  });
}
