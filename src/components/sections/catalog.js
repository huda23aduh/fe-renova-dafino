// src/components/sections/catalog.js
import { api as brandApi } from "../../services/brand-api.js";
import { api as carApi } from "../../services/car-api.js";

let carsData = [];
let brandsData = [];
let currentIndex = 0;
const itemsPerLoad = 9;
let observer = null;
let selectedBrand = null;
let filteredData = [];
let isLoading = true;

// Track active event listeners to avoid duplication
let activeEventListeners = {
  brandFilters: new Set(),
  detailButtons: new Set(),
  cardClicks: new Set(),
  favoriteButtons: new Set()
};

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
        brand: car.Brand.name,
        brand_id: car.brand_id,
        model_name: car.model_name,
        image: car.image,
        price: car.price,
        fuel_type: car.fuel_type,
        transmission: car.transmission,
        kilometers: car.kilometers,
        description: car.description,
        wishlist_count: car.wishlist_count,
        year: car.year,
        color: car.color,
        engine_capacity: car.engine_capacity,
        location: car.location,
        is_featured: car.is_featured,
        gallery: car.gallery,
        interior: car.interior,
        exterior: car.exterior,
        features: car.features
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}

// Loading skeleton component
function renderLoadingSkeleton(count = itemsPerLoad) {
  return Array.from({ length: count }, (_, i) => `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div class="bg-gray-300 h-40 sm:h-48 md:h-56"></div>
      <div class="p-4">
        <div class="h-4 bg-gray-300 rounded mb-3"></div>
        <div class="w-full overflow-hidden mb-4">
          <img src="images/wave_card.png" alt="wave" class="w-full object-cover" />
        </div>
        <div class="space-y-3">
          <div class="h-3 bg-gray-300 rounded"></div>
          <div class="h-3 bg-gray-300 rounded w-2/3"></div>
          <div class="flex justify-between items-center mt-4">
            <div class="h-4 bg-gray-300 rounded w-1/3"></div>
            <div class="h-8 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Main component
export default function Catalog() {
  return `
    <section class="bg-[#d9d9d9] pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-20">
      <div class="max-w-7xl mx-auto">
        <div class="flex gap-6 lg:gap-8">
          <div class="hidden lg:flex flex-col items-start gap-4 py-4 relative">
            <div class="flex flex-col gap-8 relative z-10 ml-12">
              <div id="brands-container">
                ${renderBrandsSkeleton()}
              </div>
            </div>
          </div>

          <div class="flex-1 lg:border-l-2 lg:border-[#FFB703] lg:pl-6 lg:ml-2 w-full">
            <div class="lg:hidden flex overflow-x-auto gap-3 mb-4 pb-2 scrollbar-hide" id="mobile-brands-container">
              ${renderMobileBrandsSkeleton()}
            </div>

            <h2 class="text-xl font-bold text-[#14213D] mb-4">
              Temukan Mobil Impian Anda
            </h2>

            <div id="catalog-scroll-container" class="max-h-[1200px] overflow-y-auto pr-2 scrollbar-hide">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 catalog-mobile-grid" id="cars-grid">
                ${renderLoadingSkeleton()}
              </div>

              <div id="scroll-sentinel" class="py-8 text-center text-gray-500 text-sm">
                Memuat...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Helper functions for skeletons
function renderBrandsSkeleton(count = 6) {
  return Array.from({ length: count }, (_, i) => `
    <div class="flex flex-col items-center gap-2">
      <div class="w-25 h-25 bg-gray-300 rounded-full animate-pulse"></div>
      <div class="h-3 w-16 bg-gray-300 rounded animate-pulse mt-1"></div>
    </div>
  `).join('');
}

function renderMobileBrandsSkeleton() {
  return Array.from({ length: 6 }, (_, i) => `
    <div class="flex flex-col items-center gap-1">
      <div class="w-14 h-14 sm:w-20 sm:h-20 bg-gray-300 rounded-full animate-pulse"></div>
      <div class="h-3 w-10 sm:w-16 bg-gray-300 rounded animate-pulse mt-1"></div>
    </div>
  `).join('');
}

// Render brands HTML
function renderBrands(brands) {
  return brands.map(brand => {
    const imagePath = brandImageMap[brand.name] || `https://via.placeholder.com/64/14213D/FFFFFF?text=${brand.name.charAt(0)}`;
    return `
    <div class="flex flex-col items-center gap-2 cursor-pointer group brand-filter" data-brand="${brand.name}" data-brand-id="${brand.id}">
      <div class="w-25 h-25 bg-[#14213D] rounded-full flex items-center justify-center transition-transform duration-300 relative z-10 shadow-lg overflow-hidden">
        <img src="${imagePath}" alt="${brand.name}" class="w-16 h-16 object-contain" 
             onerror="this.src='https://via.placeholder.com/64/14213D/FFFFFF?text=${brand.name.charAt(0)}'" />
      </div>
      <div class="absolute w-26 h-26 bg-[#FFB703] rounded-full"></div>
      <span class="text-xs font-bold text-[#14213D] text-center mt-1">${brand.name}</span>
    </div>
  `}).join('');
}

// Render mobile brands HTML
function renderMobileBrands(brands) {
  return brands.map(brand => {
    const imagePath = brandImageMap[brand.name] || `https://via.placeholder.com/64/14213D/FFFFFF?text=${brand.name.charAt(0)}`;
    return `
    <div class="flex flex-col items-center gap-1 cursor-pointer brand-filter" data-brand="${brand.name}" data-brand-id="${brand.id}">
      <div class="relative">
        <div class="w-14 h-14 sm:w-20 sm:h-20 bg-[#14213D] rounded-full flex items-center justify-center transition-opacity duration-300 shadow-lg overflow-hidden relative z-10">
          <img src="${imagePath}" alt="${brand.name}" class="w-6 sm:w-10 object-contain" 
               onerror="this.src='https://via.placeholder.com/64/14213D/FFFFFF?text=${brand.name.charAt(0)}'" />
        </div>
      </div>
      <span class="text-xs font-semibold pt-2 text-[#14213D] text-center">${brand.name}</span>
    </div>
  `}).join('');
}

function renderCars(cars) {
  return cars.map(car => `
    <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group relative border-2 border-[#FFB703] car-card" data-car-id="${car.id}">
      <div class="relative overflow-hidden bg-gray-200 h-40 sm:h-48 md:h-56">
        <img src="${car.image}" alt="${car.brand}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 responsive-image" 
             onerror="this.src='https://via.placeholder.com/400/14213D/FFFFFF?text=${car.brand}'" />
      </div>

      <div class="flex flex-col h-full">
        <div class="px-3 sm:px-4 md:px-5 pt-3 sm:pt-4">
          <h3 class="text-xs sm:text-sm md:text-base font-bold text-[#14213D] mb-1 line-clamp-1">
            ${car.brand}
          </h3>
          <h4 class="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-1">
            ${car.model_name}
          </h4>
        </div>

        <div class="w-full overflow-hidden">
          <img src="images/wave_card.png" alt="wave" class="w-full object-cover select-none pointer-events-none" />
        </div>

        <div class="bg-[#14213D] bg-opacity-60 px-3 sm:px-4 md:px-5 py-2 sm:py-3 -mt-8 sm:-mt-10 relative z-10 flex-1 flex-col">
          <div class="flex justify-between items-start gap-1 sm:gap-2 mb-2 sm:mb-3">
            <p class="text-xs sm:text-sm text-gray-200 flex-1 line-clamp-2">
              ${car.description}
            </p>
            <div class="flex items-center gap-0.5 sm:gap-1">
              <button class="catalog-favorite-btn hover:scale-110 transition" data-car-id="${car.id}" title="Tambah ke Favorit">
                <i class="fa-regular fa-heart text-white text-sm sm:text-lg catalog-heart-icon"></i>
              </button>
              <span class="text-xs font-bold text-white">${car.wishlist_count}</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 text-xs text-gray-300">
            <span class="bg-[#14213D] px-2 py-1 rounded">${car.year}</span>
            <span class="bg-[#14213D] px-2 py-1 rounded">${car.transmission}</span>
            <span class="bg-[#14213D] px-2 py-1 rounded">${car.kilometers} km</span>
            <span class="bg-[#14213D] px-2 py-1 rounded">${car.fuel_type}</span>
          </div>

          <div class="flex items-center justify-between gap-1 sm:gap-2 mt-auto">
            <p class="text-sm sm:text-base md:text-lg font-bold text-[#FFB703]">
              ${car.price}
            </p>
            <button class="catalog-detail-btn px-3 sm:px-4 py-1 sm:py-2 font-semibold bg-transparent text-xs sm:text-sm transition-all duration-300 hover:opacity-90 whitespace-nowrap text-white cursor-pointer relative pb-0.5 sm:pb-1 hover:border-b-2 hover:border-white" data-car-id="${car.id}">
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Load data and update UI
async function loadData() {
  try {
    console.log('Loading data from API...');

    const [brands, cars] = await Promise.all([
      fetchBrands(),
      fetchCars()
    ]);

    console.log('Brands loaded:', brands.length);
    console.log('Cars loaded:', cars.length);

    // Update global variables
    brandsData = brands;
    carsData = cars;
    filteredData = carsData;
    currentIndex = Math.min(itemsPerLoad, carsData.length);
    isLoading = false;

    // Update the UI
    updateUI();

    return { brands, cars };
  } catch (error) {
    console.error('Error loading data:', error);

    // Show error state
    const grid = document.getElementById("cars-grid");
    const sentinel = document.getElementById("scroll-sentinel");

    if (grid) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-12">
          <div class="text-red-500 mb-2">
            <i class="fas fa-exclamation-triangle text-2xl"></i>
          </div>
          <p class="text-gray-600">Gagal memuat data. Silakan coba lagi.</p>
          <button id="retry-load-btn" class="mt-4 px-4 py-2 bg-[#14213D] text-white rounded hover:bg-[#0f1a33] transition">
            Coba Lagi
          </button>
        </div>
      `;

      // Add retry listener
      const retryBtn = document.getElementById("retry-load-btn");
      if (retryBtn) {
        retryBtn.addEventListener("click", loadData);
      }
    }

    if (sentinel) {
      sentinel.textContent = 'Gagal memuat data';
    }

    return { brands: [], cars: [] };
  }
}

// Update UI with loaded data
function updateUI() {
  console.log('Updating UI with loaded data...');

  // Update brands section
  const brandsContainer = document.getElementById("brands-container");
  const mobileBrandsContainer = document.getElementById("mobile-brands-container");

  if (brandsContainer && brandsData.length > 0) {
    brandsContainer.innerHTML = renderBrands(brandsData);
  }

  if (mobileBrandsContainer && brandsData.length > 0) {
    mobileBrandsContainer.innerHTML = renderMobileBrands(brandsData);
  }

  // Update cars grid
  const grid = document.getElementById("cars-grid");
  const sentinel = document.getElementById("scroll-sentinel");

  if (grid) {
    if (filteredData.length > 0) {
      grid.innerHTML = renderCars(filteredData.slice(0, currentIndex));
    } else {
      grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500">Tidak ada mobil tersedia</div>';
    }
  }

  if (sentinel) {
    if (filteredData.length === 0) {
      sentinel.textContent = '';
    } else if (currentIndex >= filteredData.length) {
      sentinel.textContent = 'Semua mobil telah ditampilkan';
    } else {
      sentinel.textContent = 'Scroll untuk memuat lebih banyak';
    }
  }

  // Attach event listeners (with cleanup)
  attachEventListeners(true);

  // Setup infinite scroll
  setupInfiniteScroll();
}

// Mount function
export async function mount() {
  console.log('Mounting catalog component...');

  // Start loading data
  await loadData();

  return cleanup;
}

// Cleanup function
function cleanup() {
  console.log('Cleaning up event listeners...');

  // Clear all active listeners
  Object.values(activeEventListeners).forEach(listenerSet => {
    listenerSet.clear();
  });

  // Disconnect observer
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

// Setup infinite scroll
function setupInfiniteScroll() {
  const scrollContainer = document.getElementById("catalog-scroll-container");
  const sentinel = document.getElementById("scroll-sentinel");
  const grid = document.getElementById("cars-grid");

  if (!sentinel || !grid || !scrollContainer) return;

  // Disconnect old observer
  if (observer) {
    observer.disconnect();
  }

  // Create new observer
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && currentIndex < filteredData.length && !isLoading) {
        // Load next batch
        const nextCars = filteredData.slice(currentIndex, currentIndex + itemsPerLoad);
        if (nextCars.length > 0) {
          const newHTML = renderCars(nextCars);
          grid.insertAdjacentHTML('beforeend', newHTML);
          currentIndex += itemsPerLoad;

          // Attach event listeners for new items (without full re-attachment)
          attachDetailListenersToNewItems();
          attachFavoriteListenersToNewItems();
          attachCardListenersToNewItems();

          // Update sentinel text
          if (sentinel) {
            if (currentIndex >= filteredData.length) {
              sentinel.textContent = 'Semua mobil telah ditampilkan';
            }
          }
        }
      }
    });
  }, {
    root: scrollContainer,
    rootMargin: '500px',
    threshold: 0.01
  });

  observer.observe(sentinel);
}

// Function to attach event listeners
function attachEventListeners(fullCleanup = false) {
  if (fullCleanup) {
    // Clean up all existing listeners before attaching new ones
    cleanupBrandFilterListeners();
  }
  attachBrandFilterListeners();
  attachDetailListeners();
  attachFavoriteListeners();
  attachCardListeners();
}

// Brand filter click handler with better event delegation
function handleBrandFilterClick(e) {
  e.stopPropagation();

  const brand = e.currentTarget.dataset.brand;

  if (selectedBrand === brand) {
    // Remove filter
    selectedBrand = null;
    filteredData = carsData;

    // Update all brand buttons
    document.querySelectorAll(".brand-filter").forEach(btn => {
      btn.classList.remove("opacity-50");
      btn.classList.add("opacity-100");
    });
  } else {
    // Apply filter
    selectedBrand = brand;
    filteredData = carsData.filter(car => car.brand === brand);

    // Update button states
    document.querySelectorAll(".brand-filter").forEach(btn => {
      if (btn.dataset.brand === brand) {
        btn.classList.remove("opacity-50");
        btn.classList.add("opacity-100");
      } else {
        btn.classList.add("opacity-50");
        btn.classList.remove("opacity-100");
      }
    });
  }

  const scrollContainer = document.getElementById("catalog-scroll-container");
  const grid = document.getElementById("cars-grid");
  const sentinel = document.getElementById("scroll-sentinel");

  if (scrollContainer && grid) {
    scrollContainer.scrollTop = 0;
    currentIndex = Math.min(itemsPerLoad, filteredData.length);

    if (filteredData.length > 0) {
      grid.innerHTML = renderCars(filteredData.slice(0, currentIndex));
    } else {
      grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500">Tidak ada mobil dari brand ini</div>';
    }
  }

  if (sentinel) {
    if (filteredData.length === 0) {
      sentinel.textContent = '';
    } else if (currentIndex >= filteredData.length) {
      sentinel.textContent = filteredData.length > 0 ?
        'Semua mobil telah ditampilkan' :
        'Tidak ada mobil tersedia';
    } else {
      sentinel.textContent = 'Scroll untuk memuat lebih banyak';
    }
  }

  // Only attach basic listeners, not brand filters (to avoid duplication)
  attachDetailListeners();
  attachFavoriteListeners();
  attachCardListeners();
  setupInfiniteScroll();
}

// Attach brand filter listeners with tracking
function attachBrandFilterListeners() {
  const brandFilters = document.querySelectorAll(".brand-filter");

  brandFilters.forEach(filter => {
    // Generate a unique ID for this element
    const filterId = `${filter.dataset.brand}-${Date.now()}`;

    // Only attach if not already attached
    if (!activeEventListeners.brandFilters.has(filterId)) {
      filter.addEventListener("click", handleBrandFilterClick);
      activeEventListeners.brandFilters.add(filterId);
    }
  });
}

// Clean up brand filter listeners
function cleanupBrandFilterListeners() {
  const brandFilters = document.querySelectorAll(".brand-filter");

  brandFilters.forEach(filter => {
    // Clone the element to remove all event listeners
    const newFilter = filter.cloneNode(true);
    filter.parentNode.replaceChild(newFilter, filter);
  });

  // Clear the tracking set
  activeEventListeners.brandFilters.clear();
}

// Detail button handler
function handleDetailClick(e) {
  e.stopPropagation();
  e.preventDefault();

  const carId = e.currentTarget.dataset.carId;
  console.log('Detail button clicked for car ID:', carId);

  if (carId) {
    sessionStorage.setItem('selectedCarId', carId);

    e.currentTarget.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    e.currentTarget.disabled = true;

    window.location.hash = '#car-detail';

    setTimeout(() => {
      e.currentTarget.innerHTML = 'Detail';
      e.currentTarget.disabled = false;
    }, 1000);
  }
}

function attachDetailListeners() {
  document.querySelectorAll('.catalog-detail-btn').forEach(btn => {
    btn.removeEventListener('click', handleDetailClick);
    btn.addEventListener('click', handleDetailClick);
  });
}

// Attach detail listeners only to new items (for infinite scroll)
function attachDetailListenersToNewItems() {
  const newDetailButtons = document.querySelectorAll('.catalog-detail-btn:not([data-has-listener])');

  newDetailButtons.forEach(btn => {
    btn.setAttribute('data-has-listener', 'true');
    btn.addEventListener('click', handleDetailClick);
  });
}

// Card click handler
function handleCardClick(e) {
  if (e.target.closest('.catalog-favorite-btn') || e.target.closest('.catalog-detail-btn')) {
    return;
  }

  const carCard = e.currentTarget;
  const carId = carCard.dataset.carId;

  if (carId) {
    sessionStorage.setItem('selectedCarId', carId);
    window.location.hash = '#car-detail';
  }
}

function attachCardListeners() {
  document.querySelectorAll('.car-card').forEach(card => {
    card.removeEventListener('click', handleCardClick);
    card.addEventListener('click', handleCardClick);
    card.style.cursor = 'pointer';
  });
}

// Attach card listeners only to new items (for infinite scroll)
function attachCardListenersToNewItems() {
  const newCards = document.querySelectorAll('.car-card:not([data-has-listener])');

  newCards.forEach(card => {
    card.setAttribute('data-has-listener', 'true');
    card.addEventListener('click', handleCardClick);
    card.style.cursor = 'pointer';
  });
}

// Favorite button handlers
function attachFavoriteListeners() {
  const favoriteButtons = document.querySelectorAll('.catalog-favorite-btn');

  // Initialize heart icons based on localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favoriteButtons.forEach(btn => {
    const carId = btn.dataset.carId;
    const heartIcon = btn.querySelector('.catalog-heart-icon');
    if (heartIcon) {
      if (favorites.includes(carId.toString())) {
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
        heartIcon.style.color = '#FFB703';
      } else {
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
        heartIcon.style.color = 'white';
      }
    }
  });

  favoriteButtons.forEach(btn => {
    btn.removeEventListener('click', handleFavoriteClick);
    btn.addEventListener('click', handleFavoriteClick);
  });
}

// Attach favorite listeners only to new items (for infinite scroll)
function attachFavoriteListenersToNewItems() {
  const newFavoriteButtons = document.querySelectorAll('.catalog-favorite-btn:not([data-has-fav-listener])');

  // Initialize heart icons based on localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  newFavoriteButtons.forEach(btn => {
    const carId = btn.dataset.carId;
    const heartIcon = btn.querySelector('.catalog-heart-icon');

    // Set initial state
    if (heartIcon) {
      if (favorites.includes(carId.toString())) {
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
        heartIcon.style.color = '#FFB703';
      } else {
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
        heartIcon.style.color = 'white';
      }
    }

    btn.setAttribute('data-has-fav-listener', 'true');
    btn.addEventListener('click', handleFavoriteClick);
  });
}

// Separate favorite click handler
function handleFavoriteClick(e) {
  e.stopPropagation();
  const btn = e.currentTarget;
  const carId = btn.dataset.carId;
  const heartIcon = btn.querySelector('.catalog-heart-icon');
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (favorites.includes(carId.toString())) {
    favorites = favorites.filter(id => id !== carId.toString());
    if (heartIcon) {
      heartIcon.classList.remove('fa-solid');
      heartIcon.classList.add('fa-regular');
      heartIcon.style.color = 'white';
    }
  } else {
    favorites.push(carId.toString());
    if (heartIcon) {
      heartIcon.classList.remove('fa-regular');
      heartIcon.classList.add('fa-solid');
      heartIcon.style.color = '#FFB703';
    }
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  if (window.updateFavoriteCount) {
    window.updateFavoriteCount();
  }
}