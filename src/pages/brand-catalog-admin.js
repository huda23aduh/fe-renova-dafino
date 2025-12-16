import config from '../config/config.js';
import AdminSidebar, { mount as adminSidebarMount } from "../components/sections/admin-sidebar.js";

// API Configuration
const CARS_API_URL = config.CARS_API_URL;
const BRANDS_API_URL = config.BRANDS_API_URL;

// STATE
let adminCurrentBrand = "SUZUKI"; // Changed from TOYOTA to match your car's brand
let adminSelectedCarImage = `/images/${adminCurrentBrand.toLowerCase()}_car.png`;
let adminIsEditing = false;
let adminEditingCarId = null;
let carsData = []; // Will be loaded from API
let brandsDataFromAPI = []; // Will be loaded from API
let isLoading = false;

// Temporary mock brands data (fallback if API fails)
const mockBrandsData = [
  { id: 'brand-1', name: 'TOYOTA', image: '/images/toyota.png' },
  { id: 'brand-2', name: 'HONDA', image: '/images/honda.png' },
  { id: 'brand-3', name: 'DAIHATSU', image: '/images/daihatsu.png' },
  { id: 'brand-4', name: 'SUZUKI', image: '/images/suzuki.png' },
  { id: 'brand-5', name: 'MITSUBISHI', image: '/images/mitsubishi.png' },
];

// Helper function to parse JSON fields
// Helper function to parse JSON fields - FIXED VERSION
function parseJsonField(field) {
  if (!field) return [];
  if (Array.isArray(field)) return field;

  try {
    // First, try to clean up malformed JSON with extra quotes
    let cleanedField = field;

    // Remove extra quotes (like """[]""")
    if (typeof cleanedField === 'string') {
      // Remove triple quotes
      cleanedField = cleanedField.replace(/^\"\"\"/, '').replace(/\"\"\"$/, '');
      // Remove double quotes if still present
      cleanedField = cleanedField.replace(/^\"|\"$/g, '');
      // Unescape escaped quotes
      cleanedField = cleanedField.replace(/\\\"/g, '"');
    }

    // Now try to parse
    const parsed = JSON.parse(cleanedField);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    console.error('Error parsing JSON field:', e, 'Original field:', field);
    // Try a fallback: extract array-like content
    if (typeof field === 'string') {
      // Try to extract array content from malformed string
      const arrayMatch = field.match(/\[(.*?)\]/);
      if (arrayMatch) {
        const content = arrayMatch[1];
        if (content.trim() === '') return [];
        // Split by comma and clean up
        return content.split(',').map(item => {
          // Remove quotes and extra spaces
          return item.replace(/[\"\\]/g, '').trim();
        }).filter(item => item !== '');
      }
    }
    return [];
  }
}

// Helper function to get available brands
function getAvailableBrands() {
  if (brandsDataFromAPI && brandsDataFromAPI.length > 0) {
    // Map API brands to expected format
    return brandsDataFromAPI.map(brand => ({
      id: brand.id,
      name: brand.brand_name || brand.name || 'Unknown',
      image: brand.image || `/images/${(brand.brand_name || brand.name || 'unknown').toLowerCase()}.png`
    }));
  }
  // Use mock data if API returns nothing
  console.log('Using mock brands data');
  return mockBrandsData;
}

// Helper function to get brand name from car
function getBrandName(car) {
  if (!car) return 'N/A';

  // Check if car has brand data
  if (car.brand) {
    return car.brand.brand_name || car.brand.name || 'N/A';
  }

  // If no brand object, try to get brand from API response structure
  if (car.Brand) {
    return car.Brand.brand_name || car.Brand.name || 'N/A';
  }

  return 'N/A';
}

// Function to load data from API
async function loadData() {
  try {
    isLoading = true;
    console.log('=== Loading Data ===');

    // Load cars data
    console.log('Loading cars from:', CARS_API_URL);
    const carsResponse = await fetch(CARS_API_URL);
    console.log('Cars response status:', carsResponse.status);

    if (carsResponse.ok) {
      const carsResult = await carsResponse.json();
      console.log('Cars API response structure:', carsResult);

      if (carsResult && carsResult.success) {
        // Parse JSON fields in each car
        carsData = (carsResult.data || []).map(car => ({
          ...car,
          gallery: parseJsonField(car.gallery),
          interior: parseJsonField(car.interior),
          exterior: parseJsonField(car.exterior),
          features: parseJsonField(car.features)
        }));
        console.log(`Loaded ${carsData.length} cars`);
        console.log('First car:', carsData[0]);
      }
    } else {
      console.error('Cars API error status:', carsResponse.status);
    }

    // Load brands data
    console.log('\nLoading brands from:', BRANDS_API_URL);
    try {
      const brandsResponse = await fetch(BRANDS_API_URL);
      console.log('Brands response status:', brandsResponse.status);

      if (brandsResponse.ok) {
        const brandsResult = await brandsResponse.json();
        console.log('Brands API response:', brandsResult);

        // Handle different response formats
        if (brandsResult && Array.isArray(brandsResult)) {
          brandsDataFromAPI = brandsResult;
        } else if (brandsResult && brandsResult.success && Array.isArray(brandsResult.data)) {
          brandsDataFromAPI = brandsResult.data;
        } else if (brandsResult && brandsResult.data) {
          brandsDataFromAPI = Array.isArray(brandsResult.data) ? brandsResult.data : [];
        } else {
          brandsDataFromAPI = [];
        }

        console.log(`Loaded ${brandsDataFromAPI.length} brands from API`);
      } else {
        console.error('Brands API error status:', brandsResponse.status);
        brandsDataFromAPI = [];
      }
    } catch (brandsError) {
      console.error('Error fetching brands:', brandsError);
      brandsDataFromAPI = [];
    }

    console.log('=== Finished Loading Data ===');
  } catch (error) {
    console.error('Error loading data:', error);
    window.showToast("Gagal memuat data dari server", "error");
  } finally {
    isLoading = false;
  }
}

// Function to re-render the component
async function rerender() {
  await loadData();
  const container = document.getElementById('app');
  container.innerHTML = BrandCatalogAdminPage();
  mount();
}

// COMPONENT
export default function BrandCatalogAdminPage() {
  // Filter cars for current brand
  const brandCars = carsData.filter((car) => {
    const brandName = getBrandName(car);
    console.log(`Filtering: Car brand="${brandName}", Current brand="${adminCurrentBrand}"`);
    const matches = brandName.toUpperCase() === adminCurrentBrand.toUpperCase();
    console.log(`  Matches: ${matches}`);
    return matches;
  });

  // Show total cars for current brand and all cars
  const totalBrandCars = brandCars.length;
  const totalAllCars = carsData.length;
  const editingCar = adminEditingCarId ? carsData.find(c => c.id === adminEditingCarId) : null;

  return `
  <div class="min-h-screen bg-gray-100">
    ${AdminSidebar('brand-catalog-admin')}

    <!-- Main Content -->
    <main class="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
      <section class="bg-[#0b1427] text-white px-4 md:px-6 py-8 md:py-12 relative overflow-hidden min-h-screen">
        <div class="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 relative">

          <!-- LEFT SIDE (Brand & Big Car) -->
          <div class="flex flex-col items-center justify-start relative z-10 px-0 md:px-4">
            
            <!-- Back to Dashboard Button -->
            <div class="w-full flex justify-start mb-4">
                <button id="admin-back-to-dashboard-btn" class="px-5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-semibold shadow-lg flex items-center gap-2 text-sm md:text-base">
                    <i class="fa-solid fa-gauge-high"></i>
                    Kembali ke Dashboard
                </button>
            </div>

            <!-- Loading Indicator -->
            ${isLoading ? `
              <div class="flex items-center justify-center my-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                <span class="ml-2 text-yellow-400">Memuat data...</span>
              </div>
            ` : ''}

            <!-- Debug Info (remove in production) -->
            <div class="text-xs text-gray-400 mb-2">
              Total cars in DB: ${carsData.length}, Filtered for ${adminCurrentBrand}: ${brandCars.length}
              ${carsData.length > 0 ? `<br>First car brand: ${getBrandName(carsData[0])}` : ''}
            </div>

            <!-- Brand Icons Horizontal -->
           <!-- Grid Layout for Brands (alternative) -->
            <div class="mb-4 md:mb-6">
              <h3 class="text-sm md:text-base font-semibold mb-3 text-gray-300">Pilih Merek:</h3>
              <div class="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2 md:gap-3">
                ${getAvailableBrands()
      .map(
        (b) => `
                      <button class="admin-brand-filter-btn flex flex-col items-center gap-1 cursor-pointer p-1 hover:bg-gray-800/20 rounded-lg transition-all" 
                              data-brand="${b.name}"
                              title="${b.name}">
                        <div class="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                          style="background: ${b.name.toUpperCase() === adminCurrentBrand.toUpperCase()
            ? "linear-gradient(45deg, #FFB703 0%, #FFA500 100%)"
            : "linear-gradient(45deg, rgba(255, 183, 3, 0.7) 0%, rgba(20, 33, 61, 0.7) 50%, rgba(255, 183, 3, 0.7) 100%)"
          };">
                          <img src="${b.image}" 
                              class="w-6 h-6 md:w-7 md:h-7 object-contain transition-all duration-300"
                              style="filter: ${b.name.toUpperCase() === adminCurrentBrand.toUpperCase()
            ? "brightness(0) contrast(1.2)"
            : "brightness(1) contrast(1)"
          };" 
                              onerror="this.src='/images/car-default.png'"
                              alt="${b.name}">
                        </div>
                        <span class="text-xs mt-1 text-center font-medium truncate w-full">${b.name}</span>
                      </button>
                    `
      )
      .join("")}
              </div>
            </div>

            <!-- Brand Title -->
            <h1 class="text-4xl md:text-6xl lg:text-8xl font-black bg-linear-to-b from-[#FFB703] to-transparent bg-clip-text text-transparent tracking-tight leading-none md:-mb-6 lg:-mb-10">
              ${adminCurrentBrand}
            </h1>

            <!-- Big Car Image -->
            <div class="relative w-full h-[180px] md:h-[280px] lg:h-[380px] flex items-center justify-center">
              <img src="${adminSelectedCarImage}" class="h-full w-auto drop-shadow-2xl transition-all duration-300" 
                   onerror="this.src='https://picsum.photos/400/300?random=1'">
            </div>

            <!-- Total Mobil + Admin Buttons -->
            <div class="mt-4 md:mt-6 flex flex-col gap-3 items-center w-full">
              <div class="rounded-xl p-3 md:p-5 text-center"
                   style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
                <p class="text-2xl md:text-4xl font-bold">${totalBrandCars}</p>
                <p class="text-xs md:text-sm font-bold mt-1">MOBIL ${adminCurrentBrand}</p>
              </div>

              <div class="flex gap-3">
                <button id="admin-toggle-form-btn"
                  class="px-5 py-2 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold shadow-lg flex items-center gap-2 text-sm md:text-base">
                  <i class="fa-solid fa-car-side"></i>
                  ${adminIsEditing ? "Batal/Kembali" : "Tambah Mobil"}
                </button>
              </div>
            </div>

          </div>

          <!-- YELLOW DIVIDER -->
          <div class="hidden lg:block absolute left-1/2 top-0 w-[3px] bg-[#FFB703] h-full transform -translate-x-1/2"></div>

          <!-- RIGHT SIDE (List or Detail Form) -->
          <div class="flex flex-col lg:pl-10 relative px-0 md:px-4">
            ${adminIsEditing ? renderAdminDetailForm(editingCar) : renderAdminList(brandCars)}
          </div>
        </div>
      </section>
    </main>
  </div>
  `;
}

function renderAdminList(cars) {
  return `
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <h2 class="text-xl md:text-2xl lg:text-3xl font-bold">Pilihan Mobil ${adminCurrentBrand}</h2>
      <span class="text-xs md:text-sm text-gray-300">Klik mobil untuk melihat, lalu edit/hapus.</span>
    </div>

    <div class="max-h-[520px] md:max-h-[640px] overflow-y-auto pr-2 md:pr-4 scrollbar-hide">
      ${cars.length === 0 ? `
        <div class="text-center py-8">
          <i class="fa-solid fa-car text-gray-400 text-4xl mb-2"></i>
          <p class="text-gray-300">Belum ada mobil untuk brand ${adminCurrentBrand}.</p>
          ${carsData.length > 0 ? `
            <p class="text-gray-400 text-xs mt-2">
              Total mobil di database: ${carsData.length}<br>
              Mobil tersedia untuk brand: ${Array.from(new Set(carsData.map(car => getBrandName(car)))).join(', ')}
            </p>
          ` : ''}
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          ${cars
      .map(
        (car) => `
            <div class="admin-car-item bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#FFB703] cursor-pointer" data-image="${car.image}">
              <div class="h-28 md:h-40 bg-gray-200 overflow-hidden relative">
                <img src="${car.image}" class="w-full h-full object-cover" 
                     onerror="this.src='https://picsum.photos/400/300?random=1'">
                ${car.gallery && car.gallery.length > 1 ? `
                  <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <i class="fa-solid fa-images"></i>
                    ${car.gallery.length}
                  </div>
                ` : ''}
              </div>
              <div class="bg-[#14213D] text-white px-3 py-2">
                <p class="text-xs uppercase tracking-wide opacity-70">${getBrandName(car)}</p>
                <h3 class="text-sm md:text-base font-bold line-clamp-1">${car.model_name || "Model"}</h3>
                <p class="text-xs md:text-sm font-semibold mt-1">${formatPrice(car.price)}</p>
                <div class="mt-2 pt-2 border-t border-white/20 text-xs">
                  <p><i class="fa-solid fa-gas-pump mr-1"></i> ${car.fuel_type || 'Bensin'}</p>
                  <p><i class="fa-solid fa-cog mr-1"></i> ${car.transmission || 'Manual'}</p>
                  <p><i class="fa-solid fa-road mr-1"></i> ${car.kilometers || '0'} km</p>
                  <p><i class="fa-solid fa-calendar mr-1"></i> ${car.year || 'N/A'}</p>
                </div>
              </div>
              <div class="bg-gray-800/50 p-2 flex justify-end gap-2">
                  <button class="admin-edit-car-btn text-xs bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded" data-id="${car.id}">
                      <i class="fa-solid fa-pencil"></i> Edit
                  </button>
                  <button class="admin-delete-car-btn text-xs bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-id="${car.id}">
                      <i class="fa-solid fa-trash"></i> Hapus
                  </button>
              </div>
            </div>
          `
      )
      .join("")}
        </div>
      `}
    </div>
  `;
}

// Helper function to format price
function formatPrice(price) {
  if (!price) return "Rp 0";
  if (typeof price === 'string' && price.startsWith('Rp')) return price;

  // Convert number to Indonesian currency format
  const num = parseInt(price.replace(/\D/g, '') || 0);
  return 'Rp ' + num.toLocaleString('id-ID');
}

function renderAdminDetailForm(car = null) {
  const isEditMode = car !== null;

  // Get existing images from car data
  const existingImages = isEditMode ? (car.gallery || []) : [];

  // Get brand ID for current brand
  const currentBrand = getAvailableBrands().find(b => b.name.toUpperCase() === adminCurrentBrand.toUpperCase()) || null;
  const availableBrands = getAvailableBrands();

  return `
    <div class="max-h-[520px] md:max-h-[640px] overflow-y-auto pr-2 md:pr-4 scrollbar-hide">
    <form id="admin-car-form" data-id="${isEditMode ? car.id : ''}">
      <!-- Upload Foto section -->
      <div class="mb-6">
        <h2 class="text-xl md:text-2xl font-bold mb-1">${isEditMode ? 'Edit' : 'Unggah'} Foto Iklan/Mobil Anda</h2>
        <p class="text-xs md:text-sm text-gray-300 mb-4">Foto Anda akan menjadi foto sampul/thumbnail</p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          ${["Sampul", "Foto 1", "Foto 2", "Foto 3"]
      .map(
        (label, index) => `
            <div class="image-upload-container">
              <label class="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-2xl bg-[#101a30] py-8 cursor-pointer hover:border-[#FFB703] transition-colors relative">
                <input type="file" class="hidden image-input" data-image-index="${index}" accept="image/*">
                <div class="image-preview-wrapper">
                  ${existingImages[index] ? `
                    <img src="${existingImages[index]}" alt="${label}" class="w-full h-20 object-cover rounded-lg mb-2">
                  ` : `
                    <span class="text-3xl mb-2 text-gray-400"><i class="fa-regular fa-image"></i></span>
                  `}
                </div>
                <span class="text-xs md:text-sm text-gray-300 font-semibold">${label}</span>
                ${existingImages[index] ? `
                  <button type="button" class="remove-image-btn absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600" data-image-index="${index}">
                    <i class="fa-solid fa-times"></i>
                  </button>
                ` : ''}
              </label>
            </div>
          `
      )
      .join("")}
        </div>
      </div>

      <!-- Detail item form -->
      <div class="border-t border-[#FFB703]/60 pt-6 mt-2">
        <p class="text-xs text-red-400 font-semibold mb-1">Wajib diisi</p>
        <h3 class="text-lg md:text-xl font-bold mb-4">Berikan Detail Item</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-semibold mb-1">Merek*</label>
            <select name="brand_id" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white" required>
              <option value="">-- Pilih Merek --</option>
              ${availableBrands
      .map(b => `
                  <option value="${b.id}" 
                    ${(isEditMode && car.brand_id === b.id) || (!isEditMode && currentBrand && b.id === currentBrand.id) ? 'selected' : ''}>
                    ${b.name}
                  </option>
                `)
      .join('')}
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Model*</label>
            <input name="model_name" type="text" placeholder="e.g., Avanza, Brio" 
                   value="${isEditMode ? car.model_name || '' : ''}" 
                   class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white" required>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Tahun*</label>
            <input name="year" type="number" placeholder="e.g., 2022" 
                   value="${isEditMode ? car.year || '' : ''}" 
                   class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white" required
                   min="1900" max="2030">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Harga*</label>
            <input name="price" type="text" placeholder="e.g., Rp150.000.000" 
                   value="${isEditMode ? formatPrice(car.price) : ''}" 
                   class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white" required>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Tipe Bahan Bakar*</label>
            <select name="fuel_type" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white" required>
              <option value="Bensin" ${isEditMode && car.fuel_type === 'Bensin' ? 'selected' : ''}>Bensin</option>
              <option value="Diesel" ${isEditMode && car.fuel_type === 'Diesel' ? 'selected' : ''}>Diesel</option>
              <option value="Elektrik" ${isEditMode && car.fuel_type === 'Elektrik' ? 'selected' : ''}>Elektrik</option>
              <option value="Hybrid" ${isEditMode && car.fuel_type === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Transmisi*</label>
            <select name="transmission" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white" required>
              <option value="Manual" ${isEditMode && car.transmission === 'Manual' ? 'selected' : ''}>Manual</option>
              <option value="Automatic" ${isEditMode && car.transmission === 'Automatic' ? 'selected' : ''}>Automatic</option>
              <option value="CVT" ${isEditMode && car.transmission === 'CVT' ? 'selected' : ''}>CVT</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Kilometer*</label>
            <input name="kilometers" type="text" placeholder="e.g., 95.000 km" 
                   value="${isEditMode ? car.kilometers || '' : ''}" 
                   class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white" required>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Warna</label>
            <input name="color" type="text" placeholder="e.g., Hitam" 
                   value="${isEditMode ? car.color || '' : ''}" 
                   class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Kapasitas Mesin</label>
            <input name="engine_capacity" type="text" placeholder="e.g., 1.5L" 
                   value="${isEditMode ? car.engine_capacity || '' : ''}" 
                   class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Lokasi</label>
            <input name="location" type="text" placeholder="e.g., Jakarta" 
                   value="${isEditMode ? car.location || '' : ''}" 
                   class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div class="md:col-span-2">
            <label class="flex items-center gap-2">
              <input type="checkbox" name="is_featured" ${isEditMode && car.is_featured ? 'checked' : ''} 
                     class="rounded border-gray-400">
              <span class="text-sm font-semibold">Tampilkan sebagai mobil unggulan</span>
            </label>
          </div>
        </div>

        <div class="border-t border-[#FFB703]/60 pt-6 mt-4">
          <h3 class="text-lg md:text-xl font-bold mb-3">Fitur Mobil</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label class="block text-sm font-semibold mb-1">Fitur Interior (pisahkan dengan koma)</label>
              <textarea name="interior" rows="3" placeholder="Jok kulit, power steering, AC"
                        class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white resize-none">${isEditMode ? (Array.isArray(car.interior) ? car.interior.join(', ') : car.interior) : ''}</textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1">Fitur Eksterior (pisahkan dengan koma)</label>
              <textarea name="exterior" rows="3" placeholder="Alloy wheels, sunroof, fog lights"
                        class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white resize-none">${isEditMode ? (Array.isArray(car.exterior) ? car.exterior.join(', ') : car.exterior) : ''}</textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1">Fitur Keselamatan & Lainnya (pisahkan dengan koma)</label>
              <textarea name="features" rows="3" placeholder="ABS, airbag, alarm"
                        class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white resize-none">${isEditMode ? (Array.isArray(car.features) ? car.features.join(', ') : car.features) : ''}</textarea>
            </div>
          </div>
        </div>

        <div class="border-t border-[#FFB703]/60 pt-6 mt-4">
          <h3 class="text-lg md:text-xl font-bold mb-3">Deskripsi*</h3>
          <div>
            <textarea name="description" rows="4" placeholder="Sertakan kondisi, fitur, dan alasan penjualan" 
                      class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white resize-none" required>${isEditMode ? car.description || '' : ''}</textarea>
          </div>
        </div>

        <div class="flex justify-end mt-6">
            <button type="submit"
              class="px-8 md:px-10 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm md:text-base tracking-wide shadow-lg">
              ${isEditMode ? 'SIMPAN PERUBAHAN' : 'TAMBAH MOBIL'}
            </button>
        </div>
      </div>
    </form>
    </div>
  `;
}

// API FUNCTIONS
async function deleteCar(carId) {
  try {
    const response = await fetch(`${CARS_API_URL}/${carId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (response.ok && result.success) {
      window.showToast("Mobil berhasil dihapus!", "success");
      return true;
    } else {
      throw new Error(result.message || 'Gagal menghapus mobil');
    }
  } catch (error) {
    console.error('Error deleting car:', error);
    window.showToast(error.message || "Gagal menghapus mobil", "error");
    return false;
  }
}

async function createCar(carData) {
  try {
    console.log('Creating car with data:', carData);
    const response = await fetch(CARS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    const result = await response.json();
    console.log('Create car response:', result);

    if (response.ok && result.success) {
      window.showToast("Mobil berhasil ditambahkan!", "success");
      return result.data;
    } else {
      throw new Error(result.message || 'Gagal menambahkan mobil');
    }
  } catch (error) {
    console.error('Error creating car:', error);
    window.showToast(error.message || "Gagal menambahkan mobil", "error");
    return null;
  }
}

async function updateCar(carId, carData) {
  try {
    const response = await fetch(`${CARS_API_URL}/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      window.showToast("Data mobil berhasil disimpan!", "success");
      return result.data;
    } else {
      throw new Error(result.message || 'Gagal memperbarui mobil');
    }
  } catch (error) {
    console.error('Error updating car:', error);
    window.showToast(error.message || "Gagal memperbarui mobil", "error");
    return null;
  }
}

// LOGIC HANDLERS
async function handleDeleteCar(carId) {
  const car = carsData.find(c => c.id === carId);
  if (!car) {
    window.showToast("Mobil tidak ditemukan!", "error");
    return;
  }

  window.showConfirm(
    `Apakah Anda yakin ingin menghapus mobil ${getBrandName(car)} ${car.model_name || ''}?`,
    async () => {
      const success = await deleteCar(carId);
      if (success) {
        await rerender();
      }
    }
  );
}

function handleStartEdit(carId) {
  adminIsEditing = true;
  adminEditingCarId = carId;
  rerender();
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const carId = adminEditingCarId;
  const formData = new FormData(form);

  // Get car data for confirmation message
  const brandName = form.querySelector('select[name="brand_id"]').selectedOptions[0]?.text || adminCurrentBrand;
  const carModel = formData.get('model_name');
  const isEditMode = !!carId;

  // Show confirmation dialog
  window.showConfirm(
    `Apakah Anda yakin ingin ${isEditMode ? 'mengubah' : 'menambah'} mobil ${brandName} ${carModel || ''}?`,
    async () => {
      // User clicked "Yes" - proceed with save
      await proceedWithSave(form, carId, formData);
    },
    () => {
      // User clicked "No" - cancel
      window.showToast("Penyimpanan dibatalkan", "info");
    }
  );
}

async function proceedWithSave(form, carId, formData) {
  // Collect uploaded images
  const images = [];
  const imageInputs = form.querySelectorAll('.image-input');

  // Process images synchronously
  for (let index = 0; index < imageInputs.length; index++) {
    const input = imageInputs[index];
    if (input.files && input.files[0]) {
      // Convert to base64
      const imageData = await convertFileToBase64(input.files[0]);
      images[index] = imageData;
    } else if (carId) {
      // Keep existing image if editing
      const existingCar = carsData.find(c => c.id === carId);
      if (existingCar && existingCar.gallery && existingCar.gallery[index]) {
        images[index] = existingCar.gallery[index];
      }
    }
  }

  // Prepare car data for API
  const carData = {
    brand_id: formData.get('brand_id'),
    model_name: formData.get('model_name'),
    year: parseInt(formData.get('year')),
    price: formData.get('price'),
    fuel_type: formData.get('fuel_type'),
    transmission: formData.get('transmission'),
    kilometers: formData.get('kilometers'),
    description: formData.get('description'),
    color: formData.get('color'),
    engine_capacity: formData.get('engine_capacity'),
    location: formData.get('location'),
    is_featured: formData.get('is_featured') === 'on',
    // Convert comma-separated strings to arrays
    interior: formData.get('interior') ? formData.get('interior').split(',').map(item => item.trim()).filter(item => item) : [],
    exterior: formData.get('exterior') ? formData.get('exterior').split(',').map(item => item.trim()).filter(item => item) : [],
    features: formData.get('features') ? formData.get('features').split(',').map(item => item.trim()).filter(item => item) : [],
    // Use first image as main image, or default
    image: images[0] || 'https://picsum.photos/400/300?random=' + Math.floor(Math.random() * 100),
    gallery: images.filter(img => img !== undefined),
  };

  console.log('Sending car data to API:', carData);

  let success = false;
  let result = null;

  if (carId) {
    // Update existing car
    result = await updateCar(carId, carData);
    success = result !== null;
  } else {
    // Add new car
    result = await createCar(carData);
    success = result !== null;
  }

  if (success) {
    adminIsEditing = false;
    adminEditingCarId = null;
    await rerender();
  }
}

function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// IMAGE HANDLERS
async function handleImageUpload(event) {
  const input = event.target;
  const imageIndex = input.dataset.imageIndex;
  const file = input.files[0];

  if (file) {
    if (!file.type.startsWith('image/')) {
      window.showToast('File harus berupa gambar!', 'error');
      resetFileInput(input);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      window.showToast('Ukuran file maksimal 5MB!', 'error');
      resetFileInput(input);
      return;
    }

    const container = input.closest('.image-upload-container');
    const existingPreview = container.querySelector('.image-preview-wrapper img');

    if (existingPreview) {
      showLoadingState(container);
      await waitForImageDeletion(container, imageIndex, file);
    } else {
      await processImageUpload(imageIndex, file, input);
    }
  }
}

async function waitForImageDeletion(container, imageIndex, newFile) {
  return new Promise((resolve) => {
    window.showConfirm(
      'Gambar sudah ada. Apakah Anda ingin menggantinya?',
      async () => {
        await processImageUpload(imageIndex, newFile, container.querySelector('.image-input'));
        resolve();
      },
      () => {
        const input = container.querySelector('.image-input');
        resetFileInput(input);
        hideLoadingState(container);
        window.showToast('Upload dibatalkan', 'info');
        resolve();
      }
    );
  });
}

async function processImageUpload(imageIndex, file, input) {
  const reader = new FileReader();
  reader.onload = function (e) {
    updateImagePreview(imageIndex, e.target.result);
    hideLoadingState(input.closest('.image-upload-container'));
    window.showToast('Gambar berhasil diupload!', 'success');
  };
  reader.onerror = function () {
    window.showToast('Gagal memuat file!', 'error');
    resetFileInput(input);
    hideLoadingState(input.closest('.image-upload-container'));
  };
  reader.readAsDataURL(file);
}

function showLoadingState(container) {
  const wrapper = container.querySelector('.image-preview-wrapper');
  wrapper.innerHTML = `
    <div class="w-full h-20 object-cover rounded-lg mb-2 bg-gray-700 flex items-center justify-center">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
      <span class="ml-2 text-yellow-400 text-xs">Memproses...</span>
    </div>
  `;
}

function hideLoadingState(container) {
  // Loading state will be replaced by actual image in updateImagePreview
}

function resetFileInput(input) {
  const newInput = input.cloneNode(true);
  input.parentNode.replaceChild(newInput, input);
  newInput.addEventListener('change', handleImageUpload);
}

function updateImagePreview(imageIndex, imageSrc) {
  const container = document.querySelector(`[data-image-index="${imageIndex}"]`).closest('.image-upload-container');
  const previewWrapper = container.querySelector('.image-preview-wrapper');

  previewWrapper.innerHTML = '';

  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = `Foto ${parseInt(imageIndex) + 1}`;
  img.className = 'w-full h-20 object-cover rounded-lg mb-2';

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'remove-image-btn absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600';
  removeBtn.dataset.imageIndex = imageIndex;
  removeBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
  removeBtn.addEventListener('click', handleRemoveImage);

  previewWrapper.appendChild(img);
  previewWrapper.appendChild(removeBtn);
}

function handleRemoveImage(event) {
  event.stopPropagation();
  const imageIndex = event.currentTarget.dataset.imageIndex;
  const container = event.currentTarget.closest('.image-upload-container');
  const input = container.querySelector('.image-input');
  const previewWrapper = container.querySelector('.image-preview-wrapper');

  resetFileInput(input);

  previewWrapper.innerHTML = `
    <span class="text-3xl mb-2 text-gray-400"><i class="fa-regular fa-image"></i></span>
  `;

  window.showToast('Foto berhasil dihapus', 'success');
}

// MOUNT
export async function mount() {
  // Load initial data
  await loadData();

  // Mount sidebar functionality
  adminSidebarMount();

  // Back to dashboard button with confirmation
  const backBtn = document.getElementById("admin-back-to-dashboard-btn");
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.showConfirm(
        "Apakah Anda yakin ingin kembali ke dashboard? Perubahan yang belum disimpan akan hilang jika ada.",
        () => {
          window.location.hash = "#admin-dashboard";
          window.location.reload();
        }
      );
    });
  }

  // Car item click to change image
  document.querySelectorAll('.admin-car-item').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('button')) {
        return;
      }
      adminSelectedCarImage = e.currentTarget.dataset.image;
      rerender();
    })
  });

  // Brand change
  document.querySelectorAll(".admin-brand-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      adminCurrentBrand = btn.dataset.brand;
      adminSelectedCarImage = `/images/${adminCurrentBrand.toLowerCase()}_car.png`;
      adminIsEditing = false;
      adminEditingCarId = null;
      rerender();
    });
  });

  // Toggle form / list with cancel confirmation
  const toggleBtn = document.getElementById("admin-toggle-form-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (adminIsEditing) {
        window.showConfirm(
          "Apakah Anda yakin ingin membatalkan? Perubahan yang belum disimpan akan hilang.",
          () => {
            window.showToast("Perubahan dibatalkan.", "info");
            adminIsEditing = false;
            adminEditingCarId = null;
            rerender();
          }
        );
      } else {
        adminIsEditing = true;
        adminEditingCarId = null;
        rerender();
      }
    });
  }

  // Image upload handlers
  document.querySelectorAll('.image-input').forEach(input => {
    const newInput = input.cloneNode(true);
    input.parentNode.replaceChild(newInput, input);
    newInput.addEventListener('change', handleImageUpload);
  });

  // Remove image handlers
  document.querySelectorAll('.remove-image-btn').forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', handleRemoveImage);
  });

  // Add/Edit Form submission
  const carForm = document.getElementById("admin-car-form");
  if (carForm) {
    carForm.addEventListener('submit', handleFormSubmit);
  }

  // Delete car buttons
  document.querySelectorAll('.admin-delete-car-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const carId = e.currentTarget.dataset.id;
      handleDeleteCar(carId);
    });
  });

  // Edit car buttons
  document.querySelectorAll('.admin-edit-car-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const carId = e.currentTarget.dataset.id;
      handleStartEdit(carId);
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
});