// src/pages/brand-catalog.js
import { api as brandApi } from "../services/brand-api.js";
import { api as carApi } from "../services/car-api.js";

// STATE
let currentBrand = sessionStorage.getItem('selectedBrand') || 'TOYOTA';
let currentCars = [];
let brandsData = [];
let carsData = [];
let isLoading = false;
let selectedBrand = null;

// Brand image mapping
const brandImageMap = {
  'INNOVA': 'images/99.png',
  'HONDA': 'images/honda.png',
  'DAIHATSU': 'images/daihatsu.png',
  'MITSUBISHI': 'images/mitsubishi.png',
  'TOYOTA': 'images/toyota.png',
  'SUZUKI': 'images/suzuki.png'
};

// Function to fetch brands from API
async function fetchBrands() {
  try {
    const brands = await brandApi.brands.getAll();

    return brands.map(brand => ({
      id: brand.id,
      name: brand.name,
      image: brandImageMap[brand.name] || `https://via.placeholder.com/64/14213D/FFFFFF?text=${brand.name.charAt(0)}`
    }));
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

// Function to fetch cars from API
async function fetchCars() {
  try {
    const result = await carApi.cars.getAll();

    if (result.success) {
      return result.data.map(car => ({
        id: car.id,
        brand: car.Brand ? car.Brand.name : 'Unknown',
        brand_id: car.brand_id,
        model_name: car.model_name,
        image: car.image,
        price: car.price,
        fuel_type: car.fuel_type || 'Bensin',
        transmission: car.transmission || 'Manual',
        kilometers: car.kilometers || '0',
        description: car.description,
        wishlist_count: car.wishlist_count || 0,
        year: car.year,
        color: car.color,
        engine_capacity: car.engine_capacity,
        location: car.location,
        is_featured: car.is_featured,
        gallery: car.gallery || [],
        interior: car.interior || [],
        exterior: car.exterior || [],
        features: car.features || []
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}

// Helper function to get brand name from brand ID
function getBrandNameFromId(brandId) {
  const brand = brandsData.find(b => b.id === brandId);
  return brand ? brand.name : 'Unknown';
}

// Load data function
async function loadData() {
  try {
    isLoading = true;

    console.log('Loading brand catalog data from API...');

    // Fetch brands and cars in parallel
    const [brands, cars] = await Promise.all([
      fetchBrands(),
      fetchCars()
    ]);

    console.log(`Loaded ${brands.length} brands and ${cars.length} cars`);

    // Update global state
    brandsData = brands;
    carsData = cars;

    // Filter cars by selected brand
    currentBrand = sessionStorage.getItem('selectedBrand') || 'TOYOTA';
    selectedBrand = currentBrand;

    // Find the brand object
    const brandObj = brandsData.find(b => b.name.toUpperCase() === currentBrand.toUpperCase());

    if (brandObj) {
      currentCars = carsData.filter(car => {
        // First try to get brand from brand_id
        if (car.brand_id) {
          const brandName = getBrandNameFromId(car.brand_id);
          return brandName.toUpperCase() === currentBrand.toUpperCase();
        }
        // Fallback to car.brand
        return car.brand && car.brand.toUpperCase() === currentBrand.toUpperCase();
      });
    } else {
      currentCars = [];
      console.warn(`Brand ${currentBrand} not found in API data`);
    }

    console.log(`Found ${currentCars.length} cars for brand ${currentBrand}`);

    isLoading = false;

    // Update the UI
    updateUI();

    return { brands, cars };

  } catch (error) {
    console.error('Error loading brand catalog data:', error);
    isLoading = false;

    // Show error state
    const carsGrid = document.getElementById("cars-grid");
    if (carsGrid) {
      carsGrid.innerHTML = `
        <div class="col-span-2 text-center py-12">
          <div class="text-red-500 mb-2">
            <i class="fas fa-exclamation-triangle text-2xl"></i>
          </div>
          <p class="text-gray-300">Gagal memuat data. Silakan coba lagi.</p>
          <button id="retry-load-btn" class="mt-4 px-4 py-2 bg-[#FFB703] text-[#14213D] rounded font-semibold hover:bg-yellow-500 transition">
            Coba Lagi
          </button>
        </div>
      `;

      // Add retry listener
      const retryBtn = document.getElementById("retry-load-btn");
      if (retryBtn) {
        retryBtn.addEventListener("click", () => {
          loadData();
        });
      }
    }

    return { brands: [], cars: [] };
  }
}

// Update UI function
function updateUI() {
  console.log('Updating brand catalog UI...');

  // Update brands section if exists
  const brandsContainer = document.querySelector('.flex.overflow-x-auto');
  if (brandsContainer && brandsData.length > 0) {
    brandsContainer.innerHTML = brandsData.map(b => `
      <button class="brand-filter-btn shrink-0 flex flex-col items-center gap-1 cursor-pointer" data-brand="${b.name}">
        <div class="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg"
          style="background: ${b.name.toUpperCase() === currentBrand.toUpperCase()
        ? "linear-gradient(45deg, #FFB703 0%, #FFA500 100%)"
        : "linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)"};">
          <img src="${b.image}" class="w-6 h-6 md:w-8 md:h-8 object-contain"
               style="filter: ${b.name.toUpperCase() === currentBrand.toUpperCase() ? "brightness(0)" : "brightness(1)"};"
               onerror="this.src='https://via.placeholder.com/64/14213D/FFFFFF?text=${b.name.charAt(0)}'">
        </div>
        <span class="text-xs mt-1 text-white">${b.name}</span>
      </button>
    `).join('');
  }

  // Update car count and title
  const carCountElement = document.querySelector('.text-2xl.md\\:text-4xl.font-bold');
  const brandTitle = document.querySelector('.text-4xl.md\\:text-6xl.lg\\:text-8xl.font-black');

  if (carCountElement) {
    carCountElement.textContent = currentCars.length;
  }

  if (brandTitle && selectedBrand) {
    brandTitle.textContent = selectedBrand;
  }

  // Update big car image
  const bigCarImage = document.querySelector('.relative.w-full img');
  if (bigCarImage) {
    const brand = brandsData.find(b => b.name.toUpperCase() === currentBrand.toUpperCase());
    if (brand) {
      bigCarImage.src = `/images/${currentBrand.toLowerCase()}_car.png`;
      bigCarImage.onerror = function () {
        this.src = brand.image;
        this.onerror = function () {
          this.src = 'https://via.placeholder.com/600x400/14213D/FFFFFF?text=' + currentBrand;
        };
      };
    }
  }

  // Update cars grid
  const carsGrid = document.getElementById("cars-grid");
  if (carsGrid) {
    if (currentCars.length > 0) {
      carsGrid.innerHTML = renderCarsDesktop(currentCars);
    } else {
      carsGrid.innerHTML = `
        <div class="col-span-2 text-center py-12">
          <i class="fas fa-car text-gray-400 text-4xl mb-3"></i>
          <p class="text-gray-300">Tidak ada mobil untuk brand ${currentBrand}.</p>
        </div>
      `;
    }
  }

  // Re-attach event listeners
  attachEventListeners();
}

// Main component
export default function BrandCatalog() {
  return `
  <section class="bg-[#14213D] text-white px-4 md:px-6 py-8 md:py-12 relative overflow-hidden min-h-screen mt-20">
    <div class="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 relative">

      <!-- LEFT SIDE -->
      <div class="flex flex-col items-center justify-start relative z-10 px-0 md:px-4">

        <!-- Loading Indicator -->
        ${isLoading ? `
          <div class="flex items-center justify-center my-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
            <span class="ml-2 text-yellow-400">Memuat data...</span>
          </div>
        ` : ''}

        <!-- Brand Icons Horizontal -->
        <div class="flex gap-2 md:gap-4 mb-4 md:mb-6 overflow-x-auto pb-2 scrollbar-hide">
          ${brandsData.length > 0 ? brandsData.map(b => `
            <button class="brand-filter-btn shrink-0 flex flex-col items-center gap-1 cursor-pointer" data-brand="${b.name}">
              <div class="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg"
                style="background: ${b.name.toUpperCase() === currentBrand.toUpperCase()
      ? "linear-gradient(45deg, #FFB703 0%, #FFA500 100%)"
      : "linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)"};">
                <img src="${b.image}" class="w-6 h-6 md:w-8 md:h-8 object-contain"
                     style="filter: ${b.name.toUpperCase() === currentBrand.toUpperCase() ? "brightness(0)" : "brightness(1)"};"
                     onerror="this.src='https://via.placeholder.com/64/14213D/FFFFFF?text=${b.name.charAt(0)}'">
              </div>
              <span class="text-xs mt-1 text-white">${b.name}</span>
            </button>
          `).join('') : `
            <!-- Loading skeleton for brands -->
            ${Array.from({ length: 6 }, (_, i) => `
              <div class="shrink-0 flex flex-col items-center gap-1">
                <div class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-700 animate-pulse"></div>
                <div class="w-10 h-3 bg-gray-700 rounded animate-pulse mt-1"></div>
              </div>
            `).join('')}
          `}
        </div>

        <!-- Brand Title -->
        <h1 class="text-4xl md:text-6xl lg:text-8xl font-black bg-linear-to-b from-[#FFB703] to-transparent bg-clip-text text-transparent tracking-tight leading-none md:-mb-6 lg:-mb-10">
          ${currentBrand}
        </h1>

        <!-- Big Car Image -->
        <div class="relative w-full h-[180px] md:h-[280px] lg:h-[380px] flex items-center justify-center">
          <img src="/images/${currentBrand.toLowerCase()}_car.png" class="h-full w-auto drop-shadow-2xl"
               onerror="this.src='https://via.placeholder.com/600x400/14213D/FFFFFF?text=${currentBrand}'">
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
            ${isLoading ?
      // Loading skeleton for cars
      Array.from({ length: 4 }, (_, i) => `
                <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-gray-700 animate-pulse">
                  <div class="h-28 md:h-40 bg-gray-700"></div>
                  <div class="p-4 space-y-3">
                    <div class="h-4 bg-gray-700 rounded"></div>
                    <div class="h-4 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              `).join('')
      :
      (currentCars.length > 0 ? renderCarsDesktop(currentCars) :
        '<p class="col-span-2 text-center text-gray-300">Tidak ada mobil untuk brand ini.</p>'
      )
    }
          </div>

        </div>
      </div>
    </div>
  </section>
  `;
}

function renderCarsDesktop(cars) {
  return cars.map(car => `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#FFB703] hover:shadow-2xl transition cursor-pointer car-card" data-car-id="${car.id}">

      <div class="h-28 md:h-40 bg-gray-200 overflow-hidden">
        <img src="${car.image}" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
             onerror="this.src='https://via.placeholder.com/400x300/14213D/FFFFFF?text=${car.brand}'">
      </div>

      <div class="bg-[#14213D] text-white px-2 py-2 md:py-3 text-center flex items-center justify-center gap-2 relative z-20">
        <h3 class="text-xs md:text-base font-bold line-clamp-1">${car.brand} ${car.model_name}</h3>
      </div>

      <img src="/images/wave_card_yellow.png" class="w-full -mt-2 md:-mt-3 relative z-30">

      <div class="bg-[#FFB703] text-[#14213D] p-2 md:p-4 -mt-4 md:-mt-8 relative z-40 overflow-hidden">

        <div class="flex justify-between mb-2 md:mb-3 text-xs md:text-sm font-semibold gap-1">
          <div class="flex gap-2 md:gap-4 flex-wrap">
            <span title="Bahan Bakar"><i class="fas fa-gas-pump"></i> <span class="hidden md:inline">${car.fuel_type?.toUpperCase() || 'BENSIN'}</span><span class="md:hidden">${(car.fuel_type?.toUpperCase() || 'BENSIN').substring(0, 1)}</span></span>
            <span title="Transmisi"><i class="fas fa-gears"></i> <span class="hidden md:inline">${car.transmission?.toUpperCase() || 'AUTO'}</span><span class="md:hidden">${(car.transmission?.toUpperCase() || 'AUTO').substring(0, 1)}</span></span>
          </div>
          <div class="flex gap-1">
            <button class="car-share-btn hover:scale-125 transition text-xs md:text-base" data-car-id="${car.id}" title="Share"><i class="fas fa-share-alt"></i></button>
            <button class="car-love-btn hover:scale-125 transition text-xs md:text-base" data-car-id="${car.id}" title="Add to Wishlist">
              <i class="fas ${isCarFavorited(car.id) ? 'fa-heart text-red-600' : 'fa-heart'}"></i>
            </button>
          </div>
        </div>

        <p class="text-xs md:text-sm font-semibold mb-2 md:mb-3"><i class="fas fa-road"></i> ${car.kilometers || '0'} KM</p>
        
        <p class="text-xs md:text-sm mb-2 line-clamp-1 text-gray-800 font-medium">${car.description || 'Mobil dalam kondisi baik'}</p>

        <div class="flex justify-between items-end gap-1">
          <p class="text-xs md:text-lg font-black">${formatPrice(car.price)}</p>
          <button class="car-detail-btn bg-[#14213D] text-[#FFB703] px-1.5 md:px-2 py-1 md:py-2 rounded font-black text-xs md:text-xl -mr-2 md:-mr-3 -mb-2 md:-mb-3 hover:bg-gray-800 transition" data-car-id="${car.id}">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>

      </div>
    </div>
  `).join('');
}

// Helper function to check if car is favorited
function isCarFavorited(carId) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return favorites.includes(carId.toString());
}

// Helper function to format price
function formatPrice(price) {
  if (!price) return "Rp 0";
  if (typeof price === 'string' && price.startsWith('Rp')) return price;

  // Convert number to Indonesian currency format
  const num = parseInt(price.replace(/\D/g, '') || 0);
  return 'Rp ' + num.toLocaleString('id-ID');
}

// Attach event listeners function
function attachEventListeners() {
  // Brand filter buttons
  const brandButtons = document.querySelectorAll('.brand-filter-btn');

  brandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.brand;
      sessionStorage.setItem('selectedBrand', selected);
      currentBrand = selected;
      selectedBrand = selected;

      // Filter cars for selected brand
      const brandObj = brandsData.find(b => b.name.toUpperCase() === selected.toUpperCase());
      if (brandObj) {
        currentCars = carsData.filter(car => {
          if (car.brand_id) {
            const brandName = getBrandNameFromId(car.brand_id);
            return brandName.toUpperCase() === selected.toUpperCase();
          }
          return car.brand && car.brand.toUpperCase() === selected.toUpperCase();
        });
      } else {
        currentCars = [];
      }

      // Update UI without reload
      updateUI();
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

  // Car card click handler
  const carCards = document.querySelectorAll('.car-card');
  carCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked on buttons
      if (e.target.closest('button')) return;

      const carId = card.dataset.carId;
      sessionStorage.setItem('selectedCarId', carId);
      window.location.hash = '#car-detail';
    });
  });

  // Love button interaction - save to localStorage
  const loveButtons = document.querySelectorAll('.car-love-btn');

  loveButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const carId = btn.dataset.carId;
      const heartIcon = btn.querySelector('i');
      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

      if (favorites.includes(carId)) {
        // Remove from favorites
        favorites = favorites.filter(id => id !== carId);
        heartIcon.classList.remove('text-red-600');
      } else {
        // Add to favorites
        favorites.push(carId);
        heartIcon.classList.add('text-red-600');
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));

      // Update navbar favorite count
      if (window.updateFavoriteCount) {
        window.updateFavoriteCount();
      }
    });
  });

  // Share button interaction
  const shareButtons = document.querySelectorAll('.car-share-btn');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const carId = btn.dataset.carId;
      const car = carsData.find(c => c.id.toString() === carId.toString());
      const shareText = `Lihat mobil ${car?.brand || ''} ${car?.model_name || ''} di Renova Mobil! Harga: ${car?.price || ''}`;
      const shareUrl = window.location.origin + window.location.pathname + '#car-detail';

      if (navigator.share) {
        navigator.share({
          title: `Mobil ${car?.brand || ''} ${car?.model_name || ''}`,
          text: shareText,
          url: shareUrl
        }).catch(err => {
          console.log('Share cancelled:', err);
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${shareText} - ${shareUrl}`).then(() => {
          window.showToast?.('Link berhasil disalin ke clipboard!', 'success');
        }).catch(err => {
          console.error('Failed to copy:', err);
        });
      }
    });
  });
}

// Mount function
export async function mount() {
  console.log('Mounting brand catalog component...');

  // Start loading data
  await loadData();

  // Return cleanup function
  return () => {
    console.log('Cleaning up brand catalog component...');
    // Cleanup logic if needed
  };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  // If we're on the brand catalog page, load data
  if (window.location.hash.includes('brand-catalog')) {
    await loadData();
  }
});