import AdminSidebar, { mount as adminSidebarMount } from "../components/sections/admin-sidebar.js";

export default function AdminTestDrive() {
  const testDriveRequests = JSON.parse(localStorage.getItem('testDriveRequests') || '[]');
  
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

        <!-- Simple Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-car text-blue-500 text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">${testDriveRequests.length}</p>
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
                <p class="text-2xl font-bold text-gray-800">${testDriveRequests.filter(r => r.status === 'pending').length}</p>
                <p class="text-sm text-gray-500">Menunggu Konfirmasi</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Test Drive Requests Table -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="font-bold text-gray-800">Permintaan Test Drive (${testDriveRequests.length})</h3>
            <div class="flex gap-2">
              <button id="delete-all-testdrive-btn" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                <i class="fa-solid fa-trash mr-2"></i>Hapus Semua
              </button>
              <button id="refresh-testdrive-btn" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                <i class="fa-solid fa-sync mr-2"></i>Refresh
              </button>
            </div>
          </div>
          
          ${testDriveRequests.length > 0 ? `
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
              <tbody class="bg-white divide-y divide-gray-200">
                ${testDriveRequests.map((request, index) => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <i class="fa-solid fa-user text-blue-500"></i>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">${request.fullName}</div>
                          <div class="text-sm text-gray-500">ID: ${request.id || index + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">${request.phone || '-'}</div>
                      <div class="text-sm text-gray-500">${request.email || '-'}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">${request.carName || 'Tidak disebutkan'}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">${request.testDate || '-'}</div>
                      <div class="text-sm text-gray-500">${request.testTime || '-'}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        request.status === 'processing' ? 'bg-purple-100 text-purple-800' :
                        request.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }">
                        ${request.status === 'pending' ? 'Menunggu' : 
                          request.status === 'confirmed' ? 'Dikonfirmasi' :
                          request.status === 'processing' ? 'Proses' :
                          request.status === 'completed' ? 'Selesai' : 'Tidak Diketahui'}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex gap-1 flex-wrap">
                        ${request.status === 'pending' ? `
                          <button class="text-green-600 hover:text-green-900 confirm-testdrive-btn" data-index="${index}" title="Konfirmasi">
                            <i class="fa-solid fa-check"></i>
                          </button>
                        ` : ''}
                        ${request.status === 'confirmed' ? `
                          <button class="text-purple-600 hover:text-purple-900 process-testdrive-btn" data-index="${index}" title="Proses">
                            <i class="fa-solid fa-cog"></i>
                          </button>
                        ` : ''}
                        ${request.status === 'processing' ? `
                          <button class="text-green-600 hover:text-green-900 complete-testdrive-btn" data-index="${index}" title="Selesai">
                            <i class="fa-solid fa-check-circle"></i>
                          </button>
                        ` : ''}
                        <button class="text-blue-600 hover:text-blue-900 view-testdrive-btn" data-index="${index}" title="Detail">
                          <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="text-red-600 hover:text-red-900 delete-testdrive-btn" data-index="${index}" title="Hapus">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ` : `
          <div class="p-8 text-center">
            <i class="fa-solid fa-calendar-check text-4xl text-gray-300 mb-4"></i>
            <p class="text-gray-500">Belum ada permintaan test drive</p>
            <p class="text-sm text-gray-400">Permintaan test drive akan muncul di sini</p>
          </div>
          `}
        </div>
      </div>
    </main>
  </div>
  `;
}

export function mount() {
  // Mount sidebar functionality
  adminSidebarMount();

  // Event listeners
  const deleteAllBtn = document.getElementById('delete-all-testdrive-btn');
  if (deleteAllBtn) {
    deleteAllBtn.addEventListener('click', deleteAllTestDrive);
  }

  const refreshBtn = document.getElementById('refresh-testdrive-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => window.location.reload());
  }

  // Confirm buttons
  document.querySelectorAll('.confirm-testdrive-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      confirmTestDrive(index);
    });
  });

  // View buttons
  document.querySelectorAll('.view-testdrive-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      viewTestDrive(index);
    });
  });

  // Process buttons
  document.querySelectorAll('.process-testdrive-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      processTestDrive(index);
    });
  });

  // Complete buttons
  document.querySelectorAll('.complete-testdrive-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      completeTestDrive(index);
    });
  });

  // Delete buttons
  document.querySelectorAll('.delete-testdrive-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      deleteTestDrive(index);
    });
  });
}

function confirmTestDrive(index) {
  const requests = JSON.parse(localStorage.getItem('testDriveRequests') || '[]');
  if (requests[index]) {
    requests[index].status = 'confirmed';
    requests[index].confirmedAt = new Date().toISOString();
    localStorage.setItem('testDriveRequests', JSON.stringify(requests));
    window.showToast('Permintaan test drive dikonfirmasi', 'success');
    setTimeout(() => window.location.reload(), 1000);
  }
}

function viewTestDrive(index) {
  try {
    const requests = JSON.parse(localStorage.getItem('testDriveRequests') || '[]');
    const request = requests[index];
    
    if (request) {
      console.log('Opening modal for request:', request);
      showTestDriveModal('Detail Permintaan Test Drive', request);
    } else {
      console.error('Request not found at index:', index);
      window.showToast('Data permintaan tidak ditemukan', 'error');
    }
  } catch (error) {
    console.error('Error viewing test drive:', error);
    window.showToast('Terjadi kesalahan saat membuka detail', 'error');
  }
}

function processTestDrive(index) {
  const requests = JSON.parse(localStorage.getItem('testDriveRequests') || '[]');
  if (requests[index]) {
    requests[index].status = 'processing';
    requests[index].processedAt = new Date().toISOString();
    localStorage.setItem('testDriveRequests', JSON.stringify(requests));
    window.showToast('Test drive sedang diproses', 'success');
    setTimeout(() => window.location.reload(), 1000);
  }
}

function completeTestDrive(index) {
  const requests = JSON.parse(localStorage.getItem('testDriveRequests') || '[]');
  if (requests[index]) {
    requests[index].status = 'completed';
    requests[index].completedAt = new Date().toISOString();
    localStorage.setItem('testDriveRequests', JSON.stringify(requests));
    window.showToast('Test drive ditandai sebagai selesai', 'success');
    setTimeout(() => window.location.reload(), 1000);
  }
}

function deleteAllTestDrive() {
  const requests = JSON.parse(localStorage.getItem('testDriveRequests') || '[]');
  
  if (requests.length === 0) {
    window.showToast('Tidak ada permintaan test drive untuk dihapus', 'info');
    return;
  }

  window.showConfirm(`Apakah Anda yakin ingin menghapus SEMUA permintaan test drive (${requests.length} item)? Tindakan ini tidak dapat dibatalkan!`, () => {
    localStorage.setItem('testDriveRequests', JSON.stringify([]));
    window.showToast('Semua permintaan test drive telah dihapus', 'success');
    setTimeout(() => window.location.reload(), 1000);
  });
}

function deleteTestDrive(index) {
  const requests = JSON.parse(localStorage.getItem('testDriveRequests') || '[]');
  const request = requests[index];
  
  if (request) {
    window.showConfirm(`Apakah Anda yakin ingin menghapus permintaan test drive dari ${request.fullName}?`, () => {
      requests.splice(index, 1);
      localStorage.setItem('testDriveRequests', JSON.stringify(requests));
      window.showToast('Permintaan test drive dihapus', 'success');
      setTimeout(() => window.location.reload(), 1000);
    });
  }
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
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Test Drive</label>
            <p class="text-gray-900">${request.testDate || '-'}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Waktu Test Drive</label>
            <p class="text-gray-900">${request.testTime || '-'}</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Pesan Tambahan</label>
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-gray-900">${request.message || 'Tidak ada pesan tambahan'}</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <span class="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            request.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
            request.status === 'processing' ? 'bg-purple-100 text-purple-800' :
            request.status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }">
            ${request.status === 'pending' ? 'Menunggu Konfirmasi' : 
              request.status === 'confirmed' ? 'Dikonfirmasi' :
              request.status === 'processing' ? 'Sedang Diproses' :
              request.status === 'completed' ? 'Selesai' : 'Tidak Diketahui'}
          </span>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Permintaan</label>
          <p class="text-gray-900">${request.createdAt ? new Date(request.createdAt).toLocaleString('id-ID') : 'Tidak diketahui'}</p>
        </div>
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