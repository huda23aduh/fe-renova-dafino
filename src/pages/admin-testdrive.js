// src/pages/admin-testdrive.js
import { api as testDriveApi } from "../services/test-drive-api.js";
import AdminSidebar, { mount as adminSidebarMount } from "../components/sections/admin-sidebar.js";

// Loading skeleton for table rows
function renderTableSkeleton() {
  return Array.from({ length: 5 }, (_, i) => `
    <tr>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div class="ml-4 space-y-2">
            <div class="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-2 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="space-y-2">
          <div class="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-2 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="space-y-2">
          <div class="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-2 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex gap-1">
          <div class="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </td>
    </tr>
  `).join('');
}

// Main component - NOT async
export default function AdminTestDrive() {
  return `
  <div class="min-h-screen bg-gray-100">
    ${AdminSidebar('admin-testdrive')}

    <!-- Main Content -->
    <main class="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
      <div class="p-4 md:p-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Kelola Test Drive</h1>
          <p class="text-gray-600">Kelola permintaan test drive dari pelanggan</p>
        </div>

        <!-- Simple Stats - Will be updated after data loads -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" id="stats-container">
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-car text-blue-500 text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">0</p>
                <p class="text-sm text-gray-500">Total Permintaan</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-clock text-yellow-500 text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">0</p>
                <p class="text-sm text-gray-500">Menunggu Konfirmasi</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Test Drive Requests Table -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="font-bold text-gray-800">Permintaan Test Drive (<span id="requests-count">0</span>)</h3>
            <div class="flex gap-2">
              <button id="delete-all-testdrive-btn" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <i class="fa-solid fa-trash mr-2"></i>Hapus Semua
              </button>
              <button id="refresh-testdrive-btn" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                <i class="fa-solid fa-sync mr-2"></i>Refresh
              </button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontak</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobil</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal & Waktu</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" id="testdrive-table-body">
                ${renderTableSkeleton()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
  `;
}

// Function to fetch test drives from API
async function fetchTestDrives() {
  try {
    const result = await testDriveApi.testDrives.getAll();

    if (result && result.success) {
      return result.data.map(testDrive => ({
        id: testDrive.id,
        fullName: testDrive.full_name,
        phone: testDrive.phone,
        email: testDrive.email,
        carName: testDrive.Car?.model_name || 'Tidak disebutkan',
        carId: testDrive.car_id,
        userId: testDrive.user_id,
        userName: testDrive.User?.name || 'Tidak diketahui',
        userEmail: testDrive.User?.email || 'Tidak diketahui',
        testDate: testDrive.test_date,
        testTime: testDrive.test_time,
        message: testDrive.message,
        status: testDrive.status,
        createdAt: testDrive.createdAt,
        updatedAt: testDrive.updatedAt,
        carDetails: testDrive.Car || null,
        userDetails: testDrive.User || null
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching test drives:', error);
    return [];
  }
}

// Function to update test drive status via API
async function updateTestDriveStatus(id, status) {
  try {
    const result = await testDriveApi.testDrives.confirm(id, { status });
    return result && result.success;
  } catch (error) {
    console.error('Error updating test drive:', error);
    return false;
  }
}

// Function to get single test drive
async function getTestDrive(id) {
  try {
    const result = await testDriveApi.testDrives.getById(id);
    if (result && result.success) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('Error getting test drive:', error);
    return null;
  }
}

// Function to delete test drive via API
async function deleteTestDrive(id) {
  try {
    const result = await testDriveApi.testDrives.delete(id);
    return result && result.success;
  } catch (error) {
    console.error('Error deleting test drive:', error);
    return false;
  }
}

// Function to delete all test drives via API
async function deleteAllTestDrives() {
  try {
    // If your API doesn't have bulk delete, delete individually
    const testDrives = await fetchTestDrives();
    let successCount = 0;

    for (const testDrive of testDrives) {
      const result = await deleteTestDrive(testDrive.id);
      if (result) successCount++;
    }

    return successCount === testDrives.length;
  } catch (error) {
    console.error('Error deleting all test drives:', error);
    return false;
  }
}

// Render test drive rows
function renderTestDriveRows(testDrives) {
  if (testDrives.length === 0) {
    return `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center">
          <i class="fa-solid fa-calendar-check text-4xl text-gray-300 mb-4"></i>
          <p class="text-gray-500">Belum ada permintaan test drive</p>
          <p class="text-sm text-gray-400">Permintaan test drive akan muncul di sini</p>
        </td>
      </tr>
    `;
  }

  return testDrives.map((request) => `
    <tr class="hover:bg-gray-50" data-testdrive-id="${request.id}">
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <i class="fa-solid fa-user text-blue-500"></i>
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">${request.fullName}</div>
            <div class="text-sm text-gray-500">ID: ${request.id.substring(0, 8)}...</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${request.phone || '-'}</div>
        <div class="text-sm text-gray-500">${request.email || '-'}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${request.carName}</div>
        <div class="text-sm text-gray-500 truncate max-w-xs">ID: ${request.carId.substring(0, 8)}...</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${formatDate(request.testDate)}</div>
        <div class="text-sm text-gray-500">${request.testTime || '-'}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
      request.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
        request.status === 'processing' ? 'bg-purple-100 text-purple-800' :
          request.status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
    }">
          ${getStatusText(request.status)}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div class="flex gap-1 flex-wrap">
          ${request.status === 'pending' ? `
            <button class="text-green-600 hover:text-green-900 confirm-testdrive-btn" data-id="${request.id}" title="Konfirmasi">
              <i class="fa-solid fa-check"></i>
            </button>
          ` : ''}
          ${request.status === 'confirmed' ? `
            <button class="text-purple-600 hover:text-purple-900 process-testdrive-btn" data-id="${request.id}" title="Proses">
              <i class="fa-solid fa-cog"></i>
            </button>
          ` : ''}
          ${request.status === 'processing' ? `
            <button class="text-green-600 hover:text-green-900 complete-testdrive-btn" data-id="${request.id}" title="Selesai">
              <i class="fa-solid fa-check-circle"></i>
            </button>
          ` : ''}
          <button class="text-blue-600 hover:text-blue-900 view-testdrive-btn" data-id="${request.id}" title="Detail">
            <i class="fa-solid fa-eye"></i>
          </button>
          <button class="text-red-600 hover:text-red-900 delete-testdrive-btn" data-id="${request.id}" title="Hapus">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
}

// Helper function to get status text
function getStatusText(status) {
  const statusMap = {
    'pending': 'Menunggu',
    'confirmed': 'Dikonfirmasi',
    'processing': 'Proses',
    'completed': 'Selesai'
  };
  return statusMap[status] || 'Tidak Diketahui';
}

// Update UI with loaded data
function updateUI(testDrives) {
  // Update table
  const tableBody = document.getElementById('testdrive-table-body');
  if (tableBody) {
    tableBody.innerHTML = renderTestDriveRows(testDrives);
  }

  // Update header count
  const headerCount = document.getElementById('requests-count');
  if (headerCount) {
    headerCount.textContent = testDrives.length;
  }

  // Update delete all button state
  const deleteAllBtn = document.getElementById('delete-all-testdrive-btn');
  if (deleteAllBtn) {
    if (testDrives.length === 0) {
      deleteAllBtn.disabled = true;
      deleteAllBtn.classList.add('disabled:opacity-50', 'disabled:cursor-not-allowed');
    } else {
      deleteAllBtn.disabled = false;
      deleteAllBtn.classList.remove('disabled:opacity-50', 'disabled:cursor-not-allowed');
    }
  }

  // Update stats
  updateStats(testDrives);
}

// Update stats
function updateStats(testDrives) {
  const totalCountEl = document.querySelector('.text-2xl.font-bold.text-gray-800:first-child');
  const pendingCountEl = document.querySelector('.text-2xl.font-bold.text-gray-800:last-child');

  if (totalCountEl) {
    totalCountEl.textContent = testDrives.length;
  }

  if (pendingCountEl) {
    const pendingCount = testDrives.filter(r => r.status === 'pending').length;
    pendingCountEl.textContent = pendingCount;
  }
}

export async function mount() {
  // Mount sidebar functionality
  adminSidebarMount();

  // Load initial data
  await loadData();

  // Event listeners
  const deleteAllBtn = document.getElementById('delete-all-testdrive-btn');
  if (deleteAllBtn) {
    deleteAllBtn.addEventListener('click', deleteAllTestDrive);
  }

  const refreshBtn = document.getElementById('refresh-testdrive-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', loadData);
  }

  // Attach event listeners to buttons using event delegation
  const tableBody = document.getElementById('testdrive-table-body');
  if (tableBody) {
    tableBody.addEventListener('click', handleTableButtonClick);
  }
}

// Load data
async function loadData() {
  try {
    const testDrives = await fetchTestDrives();
    updateUI(testDrives);
  } catch (error) {
    console.error('Error loading data:', error);
    window.showToast('Gagal memuat data test drive', 'error');
  }
}

// Handle table button clicks using event delegation
async function handleTableButtonClick(e) {
  const target = e.target.closest('button');
  if (!target) return;

  const testDriveId = target.dataset.id;
  if (!testDriveId) return;

  if (target.classList.contains('confirm-testdrive-btn')) {
    await confirmTestDrive(testDriveId);
  } else if (target.classList.contains('view-testdrive-btn')) {
    await viewTestDrive(testDriveId);
  } else if (target.classList.contains('process-testdrive-btn')) {
    await processTestDrive(testDriveId);
  } else if (target.classList.contains('complete-testdrive-btn')) {
    await completeTestDrive(testDriveId);
  } else if (target.classList.contains('delete-testdrive-btn')) {
    await deleteTestDriveById(testDriveId);
  }
}

async function confirmTestDrive(id) {
  const confirmed = await updateTestDriveStatus(id, 'confirmed');
  if (confirmed) {
    window.showToast('Permintaan test drive dikonfirmasi', 'success');
    await loadData();
  } else {
    window.showToast('Gagal mengkonfirmasi test drive', 'error');
  }
}

async function viewTestDrive(id) {
  try {
    const request = await getTestDrive(id);
    if (request) {
      const formattedRequest = {
        id: request.id,
        fullName: request.full_name,
        phone: request.phone,
        email: request.email,
        carName: request.Car?.model_name || 'Tidak disebutkan',
        testDate: request.test_date,
        testTime: request.test_time,
        message: request.message,
        status: request.status,
        createdAt: request.createdAt,
        carDetails: request.Car,
        userDetails: request.User
      };

      showTestDriveModal('Detail Permintaan Test Drive', formattedRequest);
    } else {
      window.showToast('Data permintaan tidak ditemukan', 'error');
    }
  } catch (error) {
    console.error('Error viewing test drive:', error);
    window.showToast('Terjadi kesalahan saat membuka detail', 'error');
  }
}

async function processTestDrive(id) {
  const processed = await updateTestDriveStatus(id, 'processing');
  if (processed) {
    window.showToast('Test drive sedang diproses', 'success');
    await loadData();
  } else {
    window.showToast('Gagal memproses test drive', 'error');
  }
}

async function completeTestDrive(id) {
  const completed = await updateTestDriveStatus(id, 'completed');
  if (completed) {
    window.showToast('Test drive ditandai sebagai selesai', 'success');
    await loadData();
  } else {
    window.showToast('Gagal menyelesaikan test drive', 'error');
  }
}

async function deleteAllTestDrive() {
  try {
    const testDrives = await fetchTestDrives();

    if (testDrives.length === 0) {
      window.showToast('Tidak ada permintaan test drive untuk dihapus', 'info');
      return;
    }

    window.showConfirm(`Apakah Anda yakin ingin menghapus SEMUA permintaan test drive (${testDrives.length} item)? Tindakan ini tidak dapat dibatalkan!`, async () => {
      const deleted = await deleteAllTestDrives();
      if (deleted) {
        window.showToast('Semua permintaan test drive telah dihapus', 'success');
        await loadData();
      } else {
        window.showToast('Gagal menghapus semua test drive', 'error');
      }
    });
  } catch (error) {
    console.error('Error deleting all test drives:', error);
    window.showToast('Terjadi kesalahan saat menghapus semua test drive', 'error');
  }
}

async function deleteTestDriveById(id) {
  window.showConfirm('Apakah Anda yakin ingin menghapus permintaan test drive ini?', async () => {
    const deleted = await deleteTestDrive(id);
    if (deleted) {
      window.showToast('Permintaan test drive dihapus', 'success');
      await loadData();
    } else {
      window.showToast('Gagal menghapus test drive', 'error');
    }
  });
}

function showTestDriveModal(title, request) {
  // Remove existing modal
  const existingModal = document.getElementById('testdrive-modal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'testdrive-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl';

  modal.innerHTML = `
    <div class="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-800">${title}</h3>
        <button id="modal-close" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <i class="fa-solid fa-xmark text-gray-600"></i>
        </button>
      </div>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <p class="text-gray-900 font-medium">${request.fullName || '-'}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p class="text-gray-900">${request.email || '-'}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
            <p class="text-gray-900">${request.phone || '-'}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mobil</label>
            <p class="text-gray-900">${request.carName || 'Tidak disebutkan'}</p>
            ${request.carDetails ? `
              <p class="text-sm text-gray-500 mt-1">${request.carDetails.brand_id ? 'Brand ID: ' + request.carDetails.brand_id : ''}</p>
            ` : ''}
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Test Drive</label>
            <p class="text-gray-900">${formatDate(request.testDate)}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Waktu Test Drive</label>
            <p class="text-gray-900">${request.testTime || '-'}</p>
          </div>
          ${request.userDetails ? `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">User ID</label>
            <p class="text-gray-900">${request.userDetails.id || '-'}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama User</label>
            <p class="text-gray-900">${request.userDetails.name || '-'}</p>
          </div>
          ` : ''}
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Pesan Tambahan</label>
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-gray-900">${request.message || 'Tidak ada pesan tambahan'}</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <span class="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
      request.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
        request.status === 'processing' ? 'bg-purple-100 text-purple-800' :
          request.status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
    }">
            ${getStatusText(request.status)}
          </span>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Permintaan</label>
          <p class="text-gray-900">${request.createdAt ? new Date(request.createdAt).toLocaleString('id-ID') : 'Tidak diketahui'}</p>
        </div>
        ${request.carDetails ? `
        <div class="border-t pt-4">
          <h4 class="text-lg font-semibold text-gray-800 mb-3">Detail Mobil</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <label class="font-medium text-gray-700">Harga:</label>
              <p class="text-gray-900">${request.carDetails.price || '-'}</p>
            </div>
            <div>
              <label class="font-medium text-gray-700">Tahun:</label>
              <p class="text-gray-900">${request.carDetails.year || '-'}</p>
            </div>
            <div>
              <label class="font-medium text-gray-700">Transmisi:</label>
              <p class="text-gray-900">${request.carDetails.transmission || '-'}</p>
            </div>
            <div>
              <label class="font-medium text-gray-700">Bahan Bakar:</label>
              <p class="text-gray-900">${request.carDetails.fuel_type || '-'}</p>
            </div>
            <div>
              <label class="font-medium text-gray-700">Kilometer:</label>
              <p class="text-gray-900">${request.carDetails.kilometers || '-'}</p>
            </div>
            <div>
              <label class="font-medium text-gray-700">Lokasi:</label>
              <p class="text-gray-900">${request.carDetails.location || '-'}</p>
            </div>
          </div>
        </div>
        ` : ''}
      </div>

      <div class="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200">
        <button id="modal-close-btn" class="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">
          Tutup
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Force a reflow to ensure the modal is rendered
  modal.offsetHeight;

  // Event listeners with error handling
  const closeBtn = document.getElementById('modal-close');
  const closeBtn2 = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  if (closeBtn2) {
    closeBtn2.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    if (modal && modal.parentNode) {
      modal.parentNode.removeChild(modal);
    }
  }

  // Focus management for accessibility
  const firstButton = modal.querySelector('button');
  if (firstButton) {
    firstButton.focus();
  }
}