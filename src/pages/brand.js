//src/pages/brand.js
import { api as brandApi } from "../services/brand-api.js";
import { api as carApi } from "../services/car-api.js";

// STATE
let brandsData = [];
let carsData = [];
let brandCarsCount = {};
let brandCarTypes = {};
let currentBrand = "TOYOTA"; // Default brand
let isLoading = false;

// Brand image mapping
const brandImageMap = {
  'TOYOTA': 'images/toyota.png',
  'HONDA': 'images/honda.png',
  'DAIHATSU': 'images/daihatsu.png',
  'MITSUBISHI': 'images/mitsubishi.png',
  'SUZUKI': 'images/suzuki.png',
  'INNOVA': 'images/99.png'
};

// Car type keywords for classification
const carTypeKeywords = {
  SUV: ['SUV', 'XPANDER', 'TERIOS', 'RAIZE', 'RUSH', 'TARUNA', 'OUTLANDER', 'TRITON', 'PILOT', 'CR-V', 'JIMNY', 'BR-V', 'PAJERO', 'FORTUNER', 'RANGE ROVER', 'X-TRAIL', 'PRADO', 'LAND CRUISER'],
  SEDAN: ['SEDAN', 'CITY', 'ACCORD', 'CAMRY', 'ALTIS', 'VIOS', 'MIRAGE', 'LANCER', 'BALENO', 'KIZASHI', 'CIVIC', 'COROLLA', 'MAZDA3', 'MAZDA6', 'TEANA', 'C-CLASS', '3 SERIES', 'A4', 'VOLTZ'],
  MPV: ['INNOVA', 'FREED', 'ERTIGA', 'SIENTA', 'ODYSSEY', 'XENIA', 'LUXIO', 'MOBILIO', 'GRANDIS', 'APV', 'AVANZA', 'VELOZ', 'RUMION', 'CALYA', 'ALPHARD', 'VELLFIRE', 'BRIO'],
  SPORT: ['SPORT', 'GR', 'GT', 'GTR', 'RS', 'M', 'AMG', 'TYPE-R', 'WRX', 'STI', 'SUPRA', 'MX-5', '86', 'BRZ', 'LFA', 'NSX', 'GTR'],
  HYBRID: ['HYBRID', 'ZENIX', 'PRIUS', 'AQUA', 'INSIGHT', 'CLARITY', 'CR-Z', 'CIVIC HYBRID', 'CAMRY HYBRID', 'ALTIMA HYBRID', 'SONATA HYBRID']
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
        model_name: car.model_name || '',
        image: car.image,
        price: car.price,
        fuel_type: car.fuel_type || 'Bensin',
        transmission: car.transmission || 'Manual',
        kilometers: car.kilometers || '0',
        description: car.description || '',
        year: car.year,
        color: car.color,
        engine_capacity: car.engine_capacity,
        location: car.location,
        is_featured: car.is_featured,
        features: Array.isArray(car.features) ? car.features : []
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}

// Function to determine car type based on model name and features
function determineCarType(car) {
  const modelUpper = car.model_name ? car.model_name.toUpperCase() : '';
  const brandUpper = car.brand ? car.brand.toUpperCase() : '';
  const descriptionUpper = car.description ? car.description.toUpperCase() : '';
  const features = car.features || [];
  const featuresUpper = features.map(f => f.toUpperCase()).join(' ');

  // Combine all text for type detection
  const allText = `${brandUpper} ${modelUpper} ${descriptionUpper} ${featuresUpper}`;

  // Check each car type
  for (const [type, keywords] of Object.entries(carTypeKeywords)) {
    for (const keyword of keywords) {
      if (allText.includes(keyword.toUpperCase())) {
        return type;
      }
    }
  }

  // Default based on some common patterns
  if (modelUpper.includes('SUV') || modelUpper.includes('4X4') || modelUpper.includes('OFFROAD')) {
    return 'SUV';
  } else if (modelUpper.includes('SEDAN')) {
    return 'SEDAN';
  } else if (modelUpper.includes('MPV') || modelUpper.includes('MINIVAN') || modelUpper.includes('FAMILY')) {
    return 'MPV';
  } else if (modelUpper.includes('SPORT') || modelUpper.includes('COUPE') || modelUpper.includes('CONVERTIBLE')) {
    return 'SPORT';
  } else if (modelUpper.includes('HYBRID') || modelUpper.includes('ELECTRIC') || modelUpper.includes('EV')) {
    return 'HYBRID';
  }

  // Fallback: Based on brand/model common knowledge
  const sedanBrands = ['CITY', 'ACCORD', 'CAMRY', 'VIOS', 'CIVIC', 'COROLLA'];
  const suvBrands = ['RAIZE', 'RUSH', 'TERIOS', 'CR-V', 'JIMNY', 'BR-V'];
  const mpvBrands = ['AVANZA', 'XENIA', 'ERTIGA', 'VELOZ', 'MOBILIO'];

  for (const brand of sedanBrands) {
    if (modelUpper.includes(brand)) return 'SEDAN';
  }
  for (const brand of suvBrands) {
    if (modelUpper.includes(brand)) return 'SUV';
  }
  for (const brand of mpvBrands) {
    if (modelUpper.includes(brand)) return 'MPV';
  }

  // Final fallback
  return 'SUV'; // Most common type in Indonesia
}

// Function to process and categorize cars by brand
function processCarData(brands, cars) {
  console.log('Processing car data...');

  // Initialize data structures
  brandCarsCount = {};
  brandCarTypes = {};

  // Initialize for all brands
  brands.forEach(brand => {
    brandCarsCount[brand.name] = 0;
    brandCarTypes[brand.name] = {
      SUV: 0,
      SEDAN: 0,
      MPV: 0,
      SPORT: 0,
      HYBRID: 0
    };
  });

  // Process each car
  cars.forEach(car => {
    const carBrand = car.brand;
    const brand = brands.find(b => b.name.toUpperCase() === carBrand.toUpperCase());

    if (brand) {
      // Count total cars for this brand
      brandCarsCount[brand.name]++;

      // Determine car type
      const carType = determineCarType(car);

      // Increment the appropriate type counter
      if (brandCarTypes[brand.name][carType] !== undefined) {
        brandCarTypes[brand.name][carType]++;
      } else {
        // Fallback to SUV if type is unknown
        brandCarTypes[brand.name]['SUV']++;
      }
    }
  });

  console.log('Processed brand data:', {
    brandCarsCount,
    brandCarTypes
  });
}

// Load data function
async function loadData() {
  try {
    isLoading = true;

    console.log('Loading brand page data...');

    // Fetch brands and cars in parallel
    const [brands, cars] = await Promise.all([
      fetchBrands(),
      fetchCars()
    ]);

    console.log(`Loaded ${brands.length} brands and ${cars.length} cars`);

    // Update global state
    brandsData = brands;
    carsData = cars;

    // Process the data
    processCarData(brands, cars);

    // Set default brand (first one or TOYOTA if exists)
    const toyotaBrand = brands.find(b => b.name.toUpperCase() === 'TOYOTA');
    currentBrand = toyotaBrand ? toyotaBrand.name : (brands.length > 0 ? brands[0].name : 'TOYOTA');

    isLoading = false;

    // Update UI if mounted
    updateUI();

    return { brands, cars };

  } catch (error) {
    console.error('Error loading brand page data:', error);
    isLoading = false;

    // Fallback to mock data structure
    brandsData = [
      { id: '1', name: 'TOYOTA', image: brandImageMap['TOYOTA'] },
      { id: '2', name: 'HONDA', image: brandImageMap['HONDA'] },
      { id: '3', name: 'DAIHATSU', image: brandImageMap['DAIHATSU'] },
      { id: '4', name: 'MITSUBISHI', image: brandImageMap['MITSUBISHI'] },
      { id: '5', name: 'SUZUKI', image: brandImageMap['SUZUKI'] }
    ];

    // Initialize with zeros
    processCarData(brandsData, []);

    // Update UI if mounted
    updateUI();

    return { brands: brandsData, cars: [] };
  }
}

// Update UI function
function updateUI() {
  console.log('Updating brand page UI...');

  if (isLoading) return;

  const brand = brandsData.find(b => b.name.toUpperCase() === currentBrand.toUpperCase()) || brandsData[0];
  if (!brand) return;

  const totalCars = brandCarsCount[brand.name] || 0;
  const carTypes = brandCarTypes[brand.name] || { SUV: 0, SEDAN: 0, MPV: 0, SPORT: 0, HYBRID: 0 };

  // Update brand title
  document.querySelectorAll('#brandTitle').forEach(el => {
    el.textContent = brand.name;
  });

  // Update brand image
  document.querySelectorAll('#brandImage').forEach(el => {
    el.src = `/images/${brand.name.toLowerCase()}_car.png`;
    el.onerror = function () {
      this.src = brand.image || 'https://via.placeholder.com/600x400/14213D/FFFFFF?text=' + brand.name;
    };
  });

  // Update stats
  document.querySelectorAll('#statTotalCars').forEach(el => {
    el.textContent = totalCars;
  });
  document.querySelectorAll('#statSUV').forEach(el => {
    el.textContent = carTypes.SUV || 0;
  });
  document.querySelectorAll('#statSedan').forEach(el => {
    el.textContent = carTypes.SEDAN || 0;
  });
  document.querySelectorAll('#statMPV').forEach(el => {
    el.textContent = carTypes.MPV || 0;
  });
  document.querySelectorAll('#statSport').forEach(el => {
    el.textContent = carTypes.SPORT || 0;
  });
  document.querySelectorAll('#statHybrid').forEach(el => {
    el.textContent = carTypes.HYBRID || 0;
  });

  // Update brand icons
  document.querySelectorAll('.brand-icon-btn').forEach(btn => {
    const btnBrand = btn.dataset.brand;
    const icon = btn.querySelector('.brand-icon');
    const img = btn.querySelector('.brand-icon-img');

    if (btnBrand.toUpperCase() === currentBrand.toUpperCase()) {
      icon.style.background = 'linear-gradient(45deg, #FFB703 0%, #FFA500 100%)';
      img.style.filter = 'brightness(0)';
    } else {
      icon.style.background = 'linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)';
      img.style.filter = 'brightness(1)';
    }
  });
}

// Main component
export default function Brand() {
  return `
    <!-- Section Brand -->
    <section class="mt-10 bg-[#14213D] text-white px-3 sm:px-6 md:px-8 py-8 sm:py-12 md:py-20 relative overflow-hidden min-h-screen flex items-center">
      <div class="max-w-8xl mx-auto w-full">
        
        <!-- Loading Overlay -->
        ${isLoading ? `
          <div class="absolute inset-0 bg-[#14213D] bg-opacity-90 flex items-center justify-center z-50">
            <div class="text-center">
              <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mx-auto mb-4"></div>
              <p class="text-yellow-400 text-lg font-semibold">Memuat data mobil...</p>
            </div>
          </div>
        ` : ''}
        
        <!-- MOBILE & TABLET LAYOUT (< md) -->
        <div class="md:hidden">
          <!-- Brand Title -->
          <h1 id="brandTitle" class="text-3xl sm:text-4xl font-black
                    bg-linear-to-b from-[#FFB703] via-[#FFB703] to-transparent
                    text-transparent bg-clip-text
                    tracking-tight leading-tight text-center mb-0 sm:-mb-6"
              style="text-shadow: 0px 0px 8px rgba(0,0,0,0.25);">
            ${currentBrand}
          </h1>

          <!-- Car Image - Full Width Responsive -->
          <div class="relative w-full h-48 sm:h-64 flex items-center justify-center mb-6 sm:mb-8 -mt-8 sm:mt-0 z-10">
            <img 
              id="brandImage" 
              src="/images/${currentBrand.toLowerCase()}_car.png" 
              alt="Featured Car" 
              class="h-full w-auto object-contain drop-shadow-2xl"
              onerror="this.src='${brandsData.find(b => b.name === currentBrand)?.image || 'https://via.placeholder.com/600x400/14213D/FFFFFF?text=' + currentBrand}'"
            >
          </div>

          <!-- Brand Icons - Horizontal Scroll -->
          <div class="flex gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 overflow-x-auto pb-2">
            ${brandsData.length > 0 ? brandsData.map((brand) => `
            <button class="brand-icon-btn shrink-0 group cursor-pointer transition-all" data-brand="${brand.name}">
              <div class="brand-icon rounded-full w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center hover:shadow-xl transition-all shadow-lg"
                   style="background: ${brand.name === currentBrand ? 'linear-gradient(45deg, #FFB703 0%, #FFA500 100%)' : 'linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)'};">
                <img 
                  src="${brand.image}" 
                  alt="${brand.name}" 
                  class="brand-icon-img w-9 sm:w-11 h-9 sm:h-11 object-contain transition-all"
                  style="filter: ${brand.name === currentBrand ? 'brightness(0)' : 'brightness(1)'};"
                  onerror="this.src='https://via.placeholder.com/64/14213D/FFFFFF?text=${brand.name.charAt(0)}'"
                >
              </div>
            </button>
            `).join('') :
      // Loading skeleton for brands
      Array.from({ length: 5 }, (_, i) => `
              <div class="shrink-0 flex flex-col items-center">
                <div class="rounded-full w-16 sm:w-20 h-16 sm:h-20 bg-gray-700 animate-pulse"></div>
              </div>
            `).join('')}
          </div>

          <!-- Stats Section - 2 Columns Grid for Mobile & Tablet -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            <!-- Total Mobil -->
            <div class="rounded-lg p-3 sm:p-4 text-center hover:shadow-lg transition-shadow" 
                 style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
              <p id="statTotalCars" class="text-xl sm:text-2xl font-bold text-white">${brandCarsCount[currentBrand] || 0}</p>
              <p class="text-xs sm:text-sm text-white font-semibold mt-2">TOTAL</p>
              <p class="text-[10px] sm:text-xs text-yellow-300 font-medium">MOBIL</p>
            </div>

            <!-- Mobil SUV -->
            <div class="rounded-lg p-3 sm:p-4 text-center hover:shadow-lg transition-shadow"
                 style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
              <p id="statSUV" class="text-xl sm:text-2xl font-bold text-white">${(brandCarTypes[currentBrand]?.SUV || 0)}</p>
              <p class="text-xs sm:text-sm text-white font-semibold mt-2">MOBIL</p>
              <p class="text-[10px] sm:text-xs text-yellow-300 font-medium">SUV</p>
            </div>

            <!-- White Card - TAMPILKAN SEMUA JENIS -->
            <div class="rounded-lg bg-white p-3 sm:p-4 text-center hover:shadow-lg transition-shadow flex items-center justify-center cursor-pointer tampilkan-semua-btn"
                 style="clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);">
              <div>
                <p class="text-[11px] sm:text-xs font-bold text-[#14213D] leading-tight">TAMPILKAN</p>
                <p class="text-[10px] sm:text-xs font-bold text-[#14213D] leading-tight">SEMUA</p>
                <p class="text-[10px] sm:text-xs font-bold text-[#14213D] leading-tight">JENIS</p>
              </div>
            </div>

            <!-- Mobil Sedan -->
            <div class="rounded-lg p-3 sm:p-4 text-center hover:shadow-lg transition-shadow"
                 style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
              <p id="statSedan" class="text-xl sm:text-2xl font-bold text-white">${(brandCarTypes[currentBrand]?.SEDAN || 0)}</p>
              <p class="text-xs sm:text-sm text-white font-semibold mt-2">MOBIL</p>
              <p class="text-[10px] sm:text-xs text-yellow-300 font-medium">SEDAN</p>
            </div>

            <!-- Mobil MPV -->
            <div class="rounded-lg p-3 sm:p-4 text-center hover:shadow-lg transition-shadow"
                 style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
              <p id="statMPV" class="text-xl sm:text-2xl font-bold text-white">${(brandCarTypes[currentBrand]?.MPV || 0)}</p>
              <p class="text-xs sm:text-sm text-white font-semibold mt-2">MOBIL</p>
              <p class="text-[10px] sm:text-xs text-yellow-300 font-medium">MPV</p>
            </div>

            <!-- Mobil Sport -->
            <div class="rounded-lg p-3 sm:p-4 text-center hover:shadow-lg transition-shadow"
                 style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
              <p id="statSport" class="text-xl sm:text-2xl font-bold text-white">${(brandCarTypes[currentBrand]?.SPORT || 0)}</p>
              <p class="text-xs sm:text-sm text-white font-semibold mt-2">MOBIL</p>
              <p class="text-[10px] sm:text-xs text-yellow-300 font-medium">SPORT</p>
            </div>

            <!-- Mobil Hybrid -->
            <div class="rounded-lg p-3 sm:p-4 text-center hover:shadow-lg transition-shadow"
                 style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
              <p id="statHybrid" class="text-xl sm:text-2xl font-bold text-white">${(brandCarTypes[currentBrand]?.HYBRID || 0)}</p>
              <p class="text-xs sm:text-sm text-white font-semibold mt-2">MOBIL</p>
              <p class="text-[10px] sm:text-xs text-yellow-300 font-medium">HYBRID</p>
            </div>
          </div>
        </div>

        <!-- LAPTOP LAYOUT (>= md) - ORIGINAL -->
        <div class="hidden md:block relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center relative">
            <!-- Left: Empty Space -->
            <div class="lg:col-span-1"></div>

            <!-- Center: Brand Name + Car Image -->
            <div class="lg:col-span-7 flex flex-col items-center justify-center order-1 relative lg:ml-86">
              <!-- Brand Name -->
              <h1 id="brandTitle" class="text-6xl md:text-7xl lg:text-9xl font-black
                        bg-linear-to-b from-[#FFB703] via-[#FFB703] to-transparent
                        text-transparent bg-clip-text
                        tracking-[0] leading-none mb-2 md:mb-0 text-center
                        relative z-20"
                  style="text-shadow: 0px 0px 8px rgba(0,0,0,0.25);">
                ${currentBrand}
              </h1>

              <!-- Featured Car Image Container - Fixed Size -->
              <div class="relative z-30 w-full h-80 md:h-96 lg:h-[500px] flex items-center justify-center -mt-12 md:-mt-16 lg:-mt-20">
                <img 
                  id="brandImage" 
                  src="/images/${currentBrand.toLowerCase()}_car.png" 
                  alt="Featured Car" 
                  class="h-full w-auto object-contain drop-shadow-2xl"
                  onerror="this.src='${brandsData.find(b => b.name === currentBrand)?.image || 'https://via.placeholder.com/600x400/14213D/FFFFFF?text=' + currentBrand}'"
                >
              </div>
            </div>

            <!-- Right: Brand Icons Vertical -->
            <div class="lg:col-span-4 flex lg:flex-col justify-center items-end lg:items-end gap-4 order-3 lg:order-3 lg:pl-6 xl:pl-10 mt-6 lg:mt-0 mr-12">
              ${brandsData.length > 0 ? brandsData.map((brand) => `
              <button class="brand-icon-btn flex flex-col items-center gap-1.5 group cursor-pointer transition-all" data-brand="${brand.name}">
                <div class="brand-icon rounded-full w-20 h-20 flex items-center justify-center hover:shadow-2xl transition-all shadow-lg"
                     style="background: ${brand.name === currentBrand ? 'linear-gradient(45deg, #FFB703 0%, #FFA500 100%)' : 'linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)'};">
                  <img 
                    src="${brand.image}" 
                    alt="${brand.name}" 
                    class="brand-icon-img w-12 h-12 object-contain transition-all"
                    style="filter: ${brand.name === currentBrand ? 'brightness(0)' : 'brightness(1)'};"
                    onerror="this.src='https://via.placeholder.com/64/14213D/FFFFFF?text=${brand.name.charAt(0)}'"
                  >
                </div>
              </button>
              `).join('') :
      // Loading skeleton for brands
      Array.from({ length: 5 }, (_, i) => `
                <div class="flex flex-col items-center">
                  <div class="rounded-full w-20 h-20 bg-gray-700 animate-pulse"></div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Bottom Stats Section -->
          <div class="max-w-7xl mx-auto relative z-50 mt-2">
            <div class="grid grid-cols-6 gap-4">
              <!-- Total Mobil -->
              <div class="rounded-lg p-6 text-center hover:shadow-lg transition-shadow" 
                   style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
                <p id="statTotalCars" class="text-2xl font-bold text-white">${brandCarsCount[currentBrand] || 0}</p>
                <p class="text-xs text-white font-bold mt-1">TOTAL MOBIL</p>
              </div>

              <!-- Mobil SUV -->
              <div class="rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                   style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
                <p id="statSUV" class="text-2xl font-bold text-white">${(brandCarTypes[currentBrand]?.SUV || 0)}</p>
                <p class="text-xs text-white font-bold mt-1">MOBIL SUV</p>
              </div>

              <!-- White Card - TAMPILKAN SEMUA JENIS -->
              <div class="bg-white p-6 text-center hover:shadow-lg transition-shadow mx-6 cursor-pointer tampilkan-semua-btn"
                   style="clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);">
                <p class="text-sm font-bold text-[#14213D]">TAMPILKAN</p>
                <p class="text-sm font-bold text-[#14213D]">SEMUA JENIS</p>
              </div>

              <!-- Mobil Sedan -->
              <div class="rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                   style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
                <p id="statSedan" class="text-2xl font-bold text-white">${(brandCarTypes[currentBrand]?.SEDAN || 0)}</p>
                <p class="text-xs text-white font-bold mt-1">MOBIL SEDAN</p>
              </div>

              <!-- Mobil Sport -->
              <div class="rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                   style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
                <p id="statSport" class="text-2xl font-bold text-white">${(brandCarTypes[currentBrand]?.SPORT || 0)}</p>
                <p class="text-xs text-white font-bold mt-1">MOBIL SPORT</p>
              </div>

              <!-- Mobil Hybrid -->
              <div class="rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                   style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
                <p id="statHybrid" class="text-2xl font-bold text-white">${(brandCarTypes[currentBrand]?.HYBRID || 0)}</p>
                <p class="text-xs text-white font-bold mt-1">MOBIL HYBRID</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Mount function
export async function mount() {
  console.log('Mounting brand component...');

  // Start loading data
  await loadData();

  // Set up event listeners
  setupEventListeners();

  // Return cleanup function
  return () => {
    console.log('Cleaning up brand component...');
    // Cleanup if needed
  };
}

// Setup event listeners
function setupEventListeners() {
  // Add click listeners to brand icons
  document.querySelectorAll('.brand-icon-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (isLoading) return;

      const selectedBrand = this.dataset.brand;
      if (selectedBrand && selectedBrand !== currentBrand) {
        currentBrand = selectedBrand;
        updateUI();
      }
    });
  });

  // Add click listeners to "TAMPILKAN SEMUA JENIS" button
  document.querySelectorAll('.tampilkan-semua-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (isLoading) return;

      // Store brand in sessionStorage
      sessionStorage.setItem('selectedBrand', currentBrand);

      // Navigate to brand catalog
      window.location.hash = '#brand-catalog';
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  // If we're on the brand page, load data
  if (window.location.hash.includes('brand')) {
    await loadData();
  }
});