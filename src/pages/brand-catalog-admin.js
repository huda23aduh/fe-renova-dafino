import { carsData, brandsData } from "../data/mockData.js";
import AdminSidebar, { mount as adminSidebarMount } from "../components/sections/admin-sidebar.js";

// STATE
let adminCurrentBrand = "TOYOTA";
let adminSelectedCarImage = `/images/${adminCurrentBrand.toLowerCase()}_car.png`; // State for the big car image
let adminIsEditing = false;
let adminEditingCarId = null;

// Function to re-render the component
function rerender() {
  const container = document.getElementById('app');
  container.innerHTML = BrandCatalogAdminPage();
  mount();
}

// COMPONENT
export default function BrandCatalogAdminPage() {
  const brandCars = carsData.filter((car) =>
    car.brand.toUpperCase().includes(adminCurrentBrand.toUpperCase())
  );

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

        <!-- Brand Icons Horizontal -->
        <div class="flex gap-2 md:gap-4 mb-4 md:mb-6 overflow-x-auto pb-2 scrollbar-hide">
          ${brandsData
            .map(
              (b) => `
            <button class="admin-brand-filter-btn shrink-0 flex flex-col items-center gap-1 cursor-pointer" data-brand="${b.name}">
              <div class="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg"
                style="background: ${
                  b.name === adminCurrentBrand
                    ? "linear-gradient(45deg, #FFB703 0%, #FFA500 100%)"
                    : "linear-gradient(45deg, #FFB703 0%, #14213D 50%, #FFB703 100%)"
                };">
                <img src="${b.image}" class="w-6 h-6 md:w-8 md:h-8 object-contain"
                     style="filter: ${
                       b.name === adminCurrentBrand
                         ? "brightness(0)"
                         : "brightness(1)"
                     };">
              </div>
            </button>
          `
            )
            .join("")}
        </div>

        <!-- Brand Title -->
        <h1 class="text-4xl md:text-6xl lg:text-8xl font-black bg-linear-to-b from-[#FFB703] to-transparent bg-clip-text text-transparent tracking-tight leading-none md:-mb-6 lg:-mb-10">
          ${adminCurrentBrand}
        </h1>

        <!-- Big Car Image -->
        <div class="relative w-full h-[180px] md:h-[280px] lg:h-[380px] flex items-center justify-center">
          <img src="${adminSelectedCarImage}" class="h-full w-auto drop-shadow-2xl transition-all duration-300">
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        ${
          cars.length
            ? cars
                .map(
                  (car) => `
          <div class="admin-car-item bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#FFB703] cursor-pointer" data-image="${car.image}">
            <div class="h-28 md:h-40 bg-gray-200 overflow-hidden relative">
              <img src="${car.image}" class="w-full h-full object-cover">
              ${car.images && car.images.length > 1 ? `
                <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <i class="fa-solid fa-images"></i>
                  ${car.images.length}
                </div>
              ` : ''}
            </div>
            <div class="bg-[#14213D] text-white px-3 py-2">
              <p class="text-xs uppercase tracking-wide opacity-70">${car.brand}</p>
              <h3 class="text-sm md:text-base font-bold line-clamp-1">${car.model || "Model"}</h3>
              <p class="text-xs md:text-sm font-semibold mt-1">${car.price || "Rp 0"}</p>
              ${car.creditDownPayment ? `
                <div class="mt-2 pt-2 border-t border-white/20">
                  <p class="text-xs opacity-80">Kredit: DP ${car.creditDownPayment}</p>
                  <p class="text-xs opacity-80">Cicilan: ${car.monthlyInstallment}/bulan</p>
                </div>
              ` : ''}
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
                .join("")
            : `<p class="col-span-1 md:col-span-2 text-center text-yellow-300 text-sm md:text-base">Belum ada mobil untuk brand ini.</p>`
        }
      </div>
    </div>
  `;
}

function renderAdminDetailForm(car = null) {
  const isEditMode = car !== null;
  
  // Get existing images from car data
  const existingImages = isEditMode ? car.images || [] : [];
  
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
            <input type="text" name="brand" value="${isEditMode ? car.brand : adminCurrentBrand}" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white" readonly>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Model*</label>
            <input name="model" type="text" placeholder="e.g., Avanza, Brio" value="${isEditMode ? car.model || '' : ''}" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Tahun*</label>
            <input name="year" type="number" placeholder="e.g., 2022" value="${isEditMode ? car.year || '' : ''}" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Harga*</label>
            <input name="price" type="text" placeholder="e.g., Rp150.000.000" value="${isEditMode ? car.price || '' : ''}" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Estimasi Kredit (DP)</label>
            <input name="creditDownPayment" type="text" placeholder="e.g., Rp30.000.000" value="${isEditMode ? car.creditDownPayment || '' : ''}" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Cicilan per Bulan</label>
            <input name="monthlyInstallment" type="text" placeholder="e.g., Rp4.500.000" value="${isEditMode ? car.monthlyInstallment || '' : ''}" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Tenor (Bulan)</label>
            <input name="creditTenor" type="number" placeholder="e.g., 36" value="${isEditMode ? car.creditTenor || '' : ''}" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Bunga (%)</label>
            <input name="interestRate" type="number" step="0.01" placeholder="e.g., 5.5" value="${isEditMode ? car.interestRate || '' : ''}" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white">
          </div>
        </div>

        <div class="border-t border-[#FFB703]/60 pt-6 mt-4">
          <h3 class="text-lg md:text-xl font-bold mb-3">Deskripsi*</h3>
          <div>
            <textarea name="description" rows="4" placeholder="Sertakan kondisi, fitur, dan alasan penjualan" class="w-full rounded-xl border border-gray-400 px-4 py-2 text-black bg-white resize-none">${isEditMode ? car.description || '' : ''}</textarea>
          </div>
        </div>

        <div class="flex justify-end mt-6">
            <button type="submit"
              class="px-8 md:px-10 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm md:text-base tracking-wide shadow-lg">
              ${isEditMode ? 'SIMPAN PERUBAHAN' : 'PASANG SEKARANG'}
            </button>
        </div>
      </div>
    </form>
    </div>
  `;
}

// LOGIC HANDLERS
function handleDeleteCar(carId) {
    const carIndex = carsData.findIndex(c => c.id === carId);
    if (carIndex === -1) {
        window.showToast("Mobil tidak ditemukan!", "error");
        return;
    }

    const car = carsData[carIndex];
    window.showConfirm(
        `Apakah Anda yakin ingin menghapus mobil ${car.brand} ${car.model || ''}?`,
        () => {
        carsData.splice(carIndex, 1);
        window.showToast("Mobil berhasil dihapus!", "success");
        rerender();
    });
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
    const carBrand = formData.get('brand');
    const carModel = formData.get('model');
    const isEditMode = !!carId;
    
    // Show confirmation dialog
    window.showConfirm(
        `Apakah Anda yakin ingin ${isEditMode ? 'mengubah' : 'menambah'} mobil ${carBrand} ${carModel || ''}?`,
        () => {
            // User clicked "Yes" - proceed with save
            proceedWithSave(form, carId, formData);
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
        if (existingCar && existingCar.images && existingCar.images[index]) {
          images[index] = existingCar.images[index];
        }
      }
    }
    
    const carData = {
        brand: formData.get('brand'),
        model: formData.get('model'),
        year: formData.get('year'),
        price: formData.get('price'),
        description: formData.get('description'),
        creditDownPayment: formData.get('creditDownPayment'),
        monthlyInstallment: formData.get('monthlyInstallment'),
        creditTenor: formData.get('creditTenor'),
        interestRate: formData.get('interestRate'),
        images: images.filter(img => img !== undefined),
        // Keep old main image on edit, or use a placeholder for new cars
        image: carId ? carsData.find(c=>c.id === carId).image : 'https://picsum.photos/400/300?random=' + Math.floor(Math.random() * 100), 
    };

    if (carId) {
        // Update existing car
        const carIndex = carsData.findIndex(c => c.id === carId);
        if (carIndex !== -1) {
            carsData[carIndex] = { ...carsData[carIndex], ...carData };
            window.showToast("Data mobil berhasil disimpan!", "success");
        }
    } else {
        // Add new car
        const newId = carsData.length > 0 ? Math.max(...carsData.map(c => c.id)) + 1 : 1;
        carsData.push({ id: newId, ...carData });
        window.showToast("Mobil baru berhasil ditambahkan!", "success");
    }

    adminIsEditing = false;
    adminEditingCarId = null;
    rerender();
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
    // Validate file type
    if (!file.type.startsWith('image/')) {
      window.showToast('File harus berupa gambar!', 'error');
      // Properly reset the input
      resetFileInput(input);
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      window.showToast('Ukuran file maksimal 5MB!', 'error');
      // Properly reset the input
      resetFileInput(input);
      return;
    }
    
    // Check if there's an existing image
    const container = input.closest('.image-upload-container');
    const existingPreview = container.querySelector('.image-preview-wrapper img');
    
    if (existingPreview) {
      // Show loading state
      showLoadingState(container);
      
      // Wait for user confirmation to replace existing image
      await waitForImageDeletion(container, imageIndex, file);
    } else {
      // No existing image, proceed directly
      await processImageUpload(imageIndex, file, input);
    }
  }
}

async function waitForImageDeletion(container, imageIndex, newFile) {
  return new Promise((resolve) => {
    // Show confirmation dialog
    window.showConfirm(
      'Gambar sudah ada. Apakah Anda ingin menggantinya?',
      async () => {
        // User confirmed to replace
        await processImageUpload(imageIndex, newFile, container.querySelector('.image-input'));
        resolve();
      },
      () => {
        // User cancelled - reset input
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
  // Convert to base64 and show preview
  const reader = new FileReader();
  reader.onload = function(e) {
    updateImagePreview(imageIndex, e.target.result);
    hideLoadingState(input.closest('.image-upload-container'));
    window.showToast('Gambar berhasil diupload!', 'success');
  };
  reader.onerror = function() {
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
  // Clone the input element to completely reset it
  const newInput = input.cloneNode(true);
  input.parentNode.replaceChild(newInput, input);
  
  // Re-attach event listener to the new input
  newInput.addEventListener('change', handleImageUpload);
}

function updateImagePreview(imageIndex, imageSrc) {
  const container = document.querySelector(`[data-image-index="${imageIndex}"]`).closest('.image-upload-container');
  const previewWrapper = container.querySelector('.image-preview-wrapper');
  
  // Remove existing content
  previewWrapper.innerHTML = '';
  
  // Add new image
  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = `Foto ${parseInt(imageIndex) + 1}`;
  img.className = 'w-full h-20 object-cover rounded-lg mb-2';
  
  // Add remove button
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'remove-image-btn absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600';
  removeBtn.dataset.imageIndex = imageIndex;
  removeBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
  removeBtn.addEventListener('click', handleRemoveImage);
  
  // Add to container
  previewWrapper.appendChild(img);
  previewWrapper.appendChild(removeBtn);
}

function handleRemoveImage(event) {
  event.stopPropagation();
  const imageIndex = event.currentTarget.dataset.imageIndex;
  const container = event.currentTarget.closest('.image-upload-container');
  const input = container.querySelector('.image-input');
  const previewWrapper = container.querySelector('.image-preview-wrapper');
  
  // Reset the file input completely
  resetFileInput(input);
  
  // Reset preview to original state
  previewWrapper.innerHTML = `
    <span class="text-3xl mb-2 text-gray-400"><i class="fa-regular fa-image"></i></span>
  `;
  
  // Show toast
  window.showToast('Foto berhasil dihapus', 'success');
}

// MOUNT
export function mount() {
  // Mount sidebar functionality
  adminSidebarMount();

  // Back to dashboard button with confirmation
  const backBtn = document.getElementById("admin-back-to-dashboard-btn");
  if(backBtn) {
      backBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.showConfirm(
            "Apakah Anda yakin ingin kembali ke dashboard? Perubahan yang belum disimpan akan hilang jika ada.",
            () => {
              // Navigate to admin dashboard
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
        return; // Don't do anything if a button inside the card was clicked
      }
      adminSelectedCarImage = e.currentTarget.dataset.image;
      rerender(); // Re-render to show the new main image
    })
  });

  // Brand change
  document.querySelectorAll(".admin-brand-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      adminCurrentBrand = btn.dataset.brand;
      adminSelectedCarImage = `/images/${adminCurrentBrand.toLowerCase()}_car.png`; // Reset image
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
        // Ask for confirmation when cancelling
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
        // No confirmation needed to open the form
        adminIsEditing = true;
        adminEditingCarId = null;
        rerender();
      }
    });
  }

  // Image upload handlers - remove existing listeners first to prevent duplication
  document.querySelectorAll('.image-input').forEach(input => {
    // Clone the input to remove all existing event listeners
    const newInput = input.cloneNode(true);
    input.parentNode.replaceChild(newInput, input);
    newInput.addEventListener('change', handleImageUpload);
  });

  // Remove image handlers - remove existing listeners first to prevent duplication
  document.querySelectorAll('.remove-image-btn').forEach(btn => {
    // Clone the button to remove all existing event listeners
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
          e.stopPropagation(); // prevent card click event
          const carId = parseInt(e.currentTarget.dataset.id, 10);
          handleDeleteCar(carId);
      });
  });

  // Edit car buttons
  document.querySelectorAll('.admin-edit-car-btn').forEach(button => {
      button.addEventListener('click', (e) => {
          e.stopPropagation(); // prevent card click event
          const carId = parseInt(e.currentTarget.dataset.id, 10);
          handleStartEdit(carId);
      });
  });
}
