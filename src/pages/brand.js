import { brandsData, carsData } from "../data/mockData.js";

export default function Brand() {
  // Create a map of brand names to their data and stats
  const brandMap = {};
  const brandCarsCount = {};
  const brandCarTypes = {};
  
  brandsData.forEach(brand => {
    brandMap[brand.name] = brand;
    brandCarsCount[brand.name] = 0;
    brandCarTypes[brand.name] = { SUV: 0, Sedan: 0, MPV: 0, Sport: 0, Hybrid: 0 };
  });
  
  // Group cars by brand and count car types
  carsData.forEach(car => {
    let brandName = null;
    const carBrand = car.brand.toUpperCase();
    
    // Match brand name from the beginning of car.brand
    for (let brand of brandsData) {
      const brandUpper = brand.name.toUpperCase();
      if (carBrand.startsWith(brandUpper)) {
        brandName = brand.name;
        break;
      }
    }
    
    if (brandName) {
      brandCarsCount[brandName]++;
      
      if (carBrand.includes('SUV') || carBrand.includes('XPANDER') || carBrand.includes('TERIOS') || 
          carBrand.includes('RAIZE') || carBrand.includes('RUSH') || carBrand.includes('TARUNA') || 
          carBrand.includes('OUTLANDER') || carBrand.includes('TRITON') || carBrand.includes('PILOT') ||
          carBrand.includes('CR-V') || carBrand.includes('JIMNY')) {
        brandCarTypes[brandName].SUV++;
      } else if (carBrand.includes('SEDAN') || carBrand.includes('CITY') || carBrand.includes('ACCORD') || 
                 carBrand.includes('CAMRY') || carBrand.includes('ALTIS') || carBrand.includes('VIOS') || 
                 carBrand.includes('MIRAGE') || carBrand.includes('LANCER') || carBrand.includes('BALENO') || 
                 carBrand.includes('KIZASHI') || carBrand.includes('CIVIC') || carBrand.includes('COROLLA')) {
        brandCarTypes[brandName].Sedan++;
      } else if (carBrand.includes('INNOVA') || carBrand.includes('FREED') || carBrand.includes('ERTIGA') || 
                 carBrand.includes('SIENTA') || carBrand.includes('ODYSSEY') || carBrand.includes('XENIA') || 
                 carBrand.includes('LUXIO') || carBrand.includes('MOBILIO') || carBrand.includes('GRANDIS') || 
                 carBrand.includes('APV')) {
        brandCarTypes[brandName].MPV++;
      } else if (carBrand.includes('SPORT')) {
        brandCarTypes[brandName].Sport++;
      } else if (carBrand.includes('HYBRID') || carBrand.includes('ZENIX')) {
        brandCarTypes[brandName].Hybrid++;
      }
    }
  });

  // Get first brand as default (TOYOTA)
  const defaultBrand = brandsData[0].name;
  
  // Store data for access in mount()
  Brand.brandCarsCount = brandCarsCount;
  Brand.brandCarTypes = brandCarTypes;

  return `
    <!-- Section Brand -->
    <section class="mt-10 bg-[#14213D] text-white px-3 sm:px-6 md:px-8 py-8 sm:py-12 md:py-20 relative overflow-hidden min-h-screen flex items-center">
      <div class="max-w-8xl mx-auto w-full">
        <!-- MOBILE & TABLET LAYOUT (< md) -->
        <div class="md:hidden">
          <!-- Brand Title -->
          <h1 id="brandTitle" class="text-3xl sm:text-4xl font-black
                    bg-linear-to-b from-[#FFB703] via-[#FFB703] to-transparent
                    text-transparent bg-clip-text
                    tracking-tight leading-tight text-center mb-0 sm:-mb-6"
              style="text-shadow: 0px 0px 8px rgba(0,0,0,0.25);">
            ${defaultBrand}
          </h1>

          <!-- Car Image - Full Width Responsive -->
          <div class="relative w-full h-48 sm:h-64 flex items-center justify-center mb-6 sm:mb-8 -mt-8 sm:mt-0 z-10">
            <img 
              id="brandImage" 
              src="/images/${defaultBrand.toLowerCase()}_car.png" 
              alt="Featured Car" 
              class="h-full w-auto object-contain drop-shadow-2xl"
            >
          </div>

          <!-- Brand Icons - Horizontal Scroll -->
          <div class="flex gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 overflow-x-auto pb-2">
            ${brandsData.map((brand) => `
            <button class="brand-icon-btn shrink-0 group cursor-pointer transition-all" data-brand="${brand.name}">
              <div class="brand-icon rounded-full w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center hover:shadow-xl transition-all shadow-lg"
                   style="background: ${brand.name === defaultBrand ? 'linear-gradient(45deg, #FFB703 0%, #FFA500 100%)' : 'linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)'};">
                <img 
                  src="${brand.image}" 
                  alt="${brand.name}" 
                  class="brand-icon-img w-9 sm:w-11 h-9 sm:h-11 object-contain transition-all"
                  style="filter: ${brand.name === defaultBrand ? 'brightness(0)' : 'brightness(1)'};"
                >
              </div>
            </button>
            `).join('')}
          </div>

          <!-- Stats Section - 2 Columns Grid for Mobile & Tablet -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            <!-- Total Mobil -->
            <div class="rounded-lg p-3 sm:p-4 text-center hover:shadow-lg transition-shadow" 
                 style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
              <p id="statTotalCars" class="text-xl sm:text-2xl font-bold text-white">${brandCarsCount[defaultBrand]}</p>
              <p class="text-xs sm:text-sm text-white font-semibold mt-2">TOTAL</p>
              <p class="text-[10px] sm:text-xs text-yellow-300 font-medium">MOBIL</p>
            </div>

            <!-- Mobil SUV -->
            <div class="rounded-lg p-3 sm:p-4 text-center hover:shadow-lg transition-shadow"
                 style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
              <p id="statSUV" class="text-xl sm:text-2xl font-bold text-white">${brandCarTypes[defaultBrand].SUV}</p>
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
              <p id="statSedan" class="text-xl sm:text-2xl font-bold text-white">${brandCarTypes[defaultBrand].Sedan}</p>
              <p class="text-xs sm:text-sm text-white font-semibold mt-2">MOBIL</p>
              <p class="text-[10px] sm:text-xs text-yellow-300 font-medium">SEDAN</p>
            </div>

            <!-- Mobil MPV -->
            <div class="rounded-lg p-3 sm:p-4 text-center hover:shadow-lg transition-shadow"
                 style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
              <p id="statMPV" class="text-xl sm:text-2xl font-bold text-white">${brandCarTypes[defaultBrand].MPV || 0}</p>
              <p class="text-xs sm:text-sm text-white font-semibold mt-2">MOBIL</p>
              <p class="text-[10px] sm:text-xs text-yellow-300 font-medium">MPV</p>
            </div>

            <!-- Mobil Sport -->
            <div class="rounded-lg p-3 sm:p-4 text-center hover:shadow-lg transition-shadow"
                 style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
              <p id="statSport" class="text-xl sm:text-2xl font-bold text-white">${brandCarTypes[defaultBrand].Sport}</p>
              <p class="text-xs sm:text-sm text-white font-semibold mt-2">MOBIL</p>
              <p class="text-[10px] sm:text-xs text-yellow-300 font-medium">SPORT</p>
            </div>

            <!-- Mobil Hybrid -->
            <div class="rounded-lg p-3 sm:p-4 text-center hover:shadow-lg transition-shadow"
                 style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
              <p id="statHybrid" class="text-xl sm:text-2xl font-bold text-white">${brandCarTypes[defaultBrand].Hybrid}</p>
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
                ${defaultBrand}
              </h1>

              <!-- Featured Car Image Container - Fixed Size -->
              <div class="relative z-30 w-full h-80 md:h-96 lg:h-[500px] flex items-center justify-center -mt-12 md:-mt-16 lg:-mt-20">
                <img 
                  id="brandImage" 
                  src="/images/${defaultBrand.toLowerCase()}_car.png" 
                  alt="Featured Car" 
                  class="h-full w-auto object-contain drop-shadow-2xl"
                >
              </div>
            </div>

            <!-- Right: Brand Icons Vertical -->
            <div class="lg:col-span-4 flex lg:flex-col justify-center items-end lg:items-end gap-4 order-3 lg:order-3 lg:pl-6 xl:pl-10 mt-6 lg:mt-0 mr-12">
              ${brandsData.map((brand) => `
              <button class="brand-icon-btn flex flex-col items-center gap-1.5 group cursor-pointer transition-all" data-brand="${brand.name}">
                <div class="brand-icon rounded-full w-20 h-20 flex items-center justify-center hover:shadow-2xl transition-all shadow-lg"
                     style="background: ${brand.name === defaultBrand ? 'linear-gradient(45deg, #FFB703 0%, #FFA500 100%)' : 'linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)'};">
                  <img 
                    src="${brand.image}" 
                    alt="${brand.name}" 
                    class="brand-icon-img w-12 h-12 object-contain transition-all"
                    style="filter: ${brand.name === defaultBrand ? 'brightness(0)' : 'brightness(1)'};"
                  >
                </div>
              </button>
              `).join('')}
            </div>
          </div>

          <!-- Bottom Stats Section -->
          <div class="max-w-7xl mx-auto relative z-50 mt-2">
            <div class="grid grid-cols-6 gap-4">
              <!-- Total Mobil -->
              <div class="rounded-lg p-6 text-center hover:shadow-lg transition-shadow" 
                   style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
                <p id="statTotalCars" class="text-2xl font-bold text-white">${brandCarsCount[defaultBrand]}</p>
                <p class="text-xs text-white font-bold mt-1">TOTAL MOBIL</p>
              </div>

              <!-- Mobil SUV -->
              <div class="rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                   style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
                <p id="statSUV" class="text-2xl font-bold text-white">${brandCarTypes[defaultBrand].SUV}</p>
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
                <p id="statSedan" class="text-2xl font-bold text-white">${brandCarTypes[defaultBrand].Sedan}</p>
                <p class="text-xs text-white font-bold mt-1">MOBIL SEDAN</p>
              </div>

              <!-- Mobil Sport -->
              <div class="rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                   style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
                <p id="statSport" class="text-2xl font-bold text-white">${brandCarTypes[defaultBrand].Sport}</p>
                <p class="text-xs text-white font-bold mt-1">MOBIL SPORT</p>
              </div>

              <!-- Mobil Hybrid -->
              <div class="rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                   style="background: linear-gradient(150deg, #FFB703 0%, #14213D 50%, #FFB703 100%);">
                <p id="statHybrid" class="text-2xl font-bold text-white">${brandCarTypes[defaultBrand].Hybrid}</p>
                <p class="text-xs text-white font-bold mt-1">MOBIL HYBRID</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function mount() {
  // Get stored data from Brand function
  const brandCarsCount = Brand.brandCarsCount;
  const brandCarTypes = Brand.brandCarTypes;
  
  function updateBrandDisplay(brandName) {
    // Update all title elements (both mobile and desktop)
    document.querySelectorAll('#brandTitle').forEach(el => {
      el.textContent = brandName;
    });
    
    // Update all car images (both mobile and desktop)
    document.querySelectorAll('#brandImage').forEach(el => {
      const imageUrl = '/images/' + brandName.toLowerCase() + '_car.png';
      el.src = imageUrl;
    });
    
    // Update stats - using querySelectorAll to update all instances
    document.querySelectorAll('#statTotalCars').forEach(el => {
      el.textContent = brandCarsCount[brandName] || 0;
    });
    document.querySelectorAll('#statSUV').forEach(el => {
      el.textContent = (brandCarTypes[brandName]?.SUV || 0);
    });
    document.querySelectorAll('#statSedan').forEach(el => {
      el.textContent = (brandCarTypes[brandName]?.Sedan || 0);
    });
    document.querySelectorAll('#statMPV').forEach(el => {
      el.textContent = (brandCarTypes[brandName]?.MPV || 0);
    });
    document.querySelectorAll('#statSport').forEach(el => {
      el.textContent = (brandCarTypes[brandName]?.Sport || 0);
    });
    document.querySelectorAll('#statHybrid').forEach(el => {
      el.textContent = (brandCarTypes[brandName]?.Hybrid || 0);
    });
    
    // Update brand icons
    document.querySelectorAll('.brand-icon-btn').forEach(btn => {
      const brand = btn.dataset.brand;
      const icon = btn.querySelector('.brand-icon');
      const img = btn.querySelector('.brand-icon-img');
      
      if (brand === brandName) {
        icon.style.background = 'linear-gradient(45deg, #FFB703 0%, #FFA500 100%)';
        img.style.filter = 'brightness(0)';
      } else {
        icon.style.background = 'linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)';
        img.style.filter = 'brightness(1)';
      }
    });
  }
  
  // Add click listeners to brand icons
  document.querySelectorAll('.brand-icon-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      updateBrandDisplay(this.dataset.brand);
    });
  });

  // Add click listeners to "TAMPILKAN SEMUA JENIS" button
  document.querySelectorAll('.tampilkan-semua-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Get current brand from the title
      const brandTitle = document.querySelector('#brandTitle');
      const brand = brandTitle.textContent.trim();
      
      // Store brand in sessionStorage
      sessionStorage.setItem('selectedBrand', brand);
      
      // Use requestAnimationFrame untuk memastikan DOM updates sebelum navigate
      requestAnimationFrame(() => {
        window.location.hash = '#brand-catalog';
      });
    });
  });
  
  return null;
}

