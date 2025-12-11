import AdminSidebar, { mount as adminSidebarMount } from "../components/sections/admin-sidebar.js";
import { api } from "../services/user-api.js";

// State management
let users = [];
let isLoading = true;
let stats = { total: 0, active: 0, newLast7Days: 0 };

// Fetch data before rendering
async function loadData() {
  try {
    users = await api.users.getAll();
    stats = await api.users.getStats();
    isLoading = false;
  } catch (error) {
    console.error('Error loading data:', error);
    isLoading = false;
    // Set default data on error
    users = [];
    stats = { total: 0, active: 0, newLast7Days: 0 };
  }
}

// Call loadData immediately when module loads
await loadData();

export default function AdminUsers() {
  return `
  <div class="min-h-screen bg-gray-100">
    ${AdminSidebar('admin-users')}

    <!-- Main Content -->
    <main class="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
      <div class="p-4 md:p-8">
        <!-- Header -->
        <div class="mb-8 flex justify-between items-center">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Kelola User</h1>
            <p class="text-gray-600">Kelola data pengguna website Renova Mobil</p>
          </div>
          <div class="flex gap-2 flex-wrap">
            <button id="add-user-btn" class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
              <i class="fa-solid fa-user-plus mr-2"></i>Tambah User
            </button>
            <button id="export-users-btn" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
              <i class="fa-solid fa-download mr-2"></i>Export Data
            </button>
            <button id="refresh-users-btn" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              <i class="fa-solid fa-sync mr-2"></i>Refresh
            </button>
          </div>
        </div>

        ${isLoading ? `
          <!-- Loading State -->
          <div class="text-center py-8">
            <i class="fa-solid fa-spinner fa-spin text-3xl text-blue-500"></i>
            <p class="mt-2 text-gray-600">Memuat data...</p>
          </div>
        ` : `
          <!-- Search and Filter -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <input type="text" id="user-search" placeholder="Cari user berdasarkan nama atau email..." 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <select id="user-filter" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
              <div>
                <select id="user-sort" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="name">Urutkan Nama</option>
                  <option value="email">Urutkan Email</option>
                  <option value="date">Urutkan Tanggal Daftar</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Users Table -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-4 border-b border-gray-200">
              <h3 class="font-bold text-gray-800">Daftar User (${users.length})</h3>
            </div>
            
            ${users.length > 0 ? `
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telepon</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Daftar</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  ${users.map(user => `
                    <tr class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fa-solid fa-user text-blue-500"></i>
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${user.name}</div>
                            <div class="text-sm text-gray-500">ID: ${user.id ? user.id.substring(0, 8) + '...' : 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${user.email}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${user.phone || '-'}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${formatDate(user.createdAt)}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                          ${user.isActive ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex gap-2">
                          <button class="text-blue-600 hover:text-blue-900 view-user-btn" data-user-id="${user.id}">
                            <i class="fa-solid fa-eye"></i>
                          </button>
                          <button class="text-green-600 hover:text-green-900 edit-user-btn" data-user-id="${user.id}">
                            <i class="fa-solid fa-edit"></i>
                          </button>
                          <button class="text-red-600 hover:text-red-900 delete-user-btn" data-user-id="${user.id}">
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
              <i class="fa-solid fa-users text-4xl text-gray-300 mb-4"></i>
              <p class="text-gray-500">Belum ada user terdaftar</p>
              <p class="text-sm text-gray-400">User akan muncul di sini setelah ada yang mendaftar</p>
            </div>
            `}
          </div>

          <!-- Statistics -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div class="bg-white rounded-xl p-6 shadow-lg">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i class="fa-solid fa-users text-blue-500 text-xl"></i>
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-800">${stats.total}</p>
                  <p class="text-sm text-gray-500">Total User</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i class="fa-solid fa-user-check text-green-500 text-xl"></i>
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-800">${stats.active}</p>
                  <p class="text-sm text-gray-500">User Aktif</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i class="fa-solid fa-calendar-plus text-yellow-500 text-xl"></i>
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-800">${stats.newLast7Days}</p>
                  <p class="text-sm text-gray-500">User Baru (7 Hari)</p>
                </div>
              </div>
            </div>
          </div>
        `}
      </div>
    </main>
  </div>
  `;
}

export function mount() {
  // Mount sidebar functionality
  adminSidebarMount();

  if (isLoading) {
    // If still loading, don't set up event listeners yet
    return;
  }

  // Search functionality
  const searchInput = document.getElementById('user-search');
  if (searchInput) {
    searchInput.addEventListener('input', filterUsers);
  }

  // Filter functionality
  const filterSelect = document.getElementById('user-filter');
  if (filterSelect) {
    filterSelect.addEventListener('change', filterUsers);
  }

  // Sort functionality
  const sortSelect = document.getElementById('user-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', filterUsers);
  }

  // Refresh button
  const refreshBtn = document.getElementById('refresh-users-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      try {
        isLoading = true;
        // Show loading state
        const loadingHTML = `
          <div class="text-center py-8">
            <i class="fa-solid fa-spinner fa-spin text-3xl text-blue-500"></i>
            <p class="mt-2 text-gray-600">Memuat data...</p>
          </div>
        `;

        // You might want to update the DOM here to show loading
        // For now, just reload
        window.location.reload();
      } catch (error) {
        window.showToast('Gagal memperbarui data', 'error');
      }
    });
  }

  // Export button
  const exportBtn = document.getElementById('export-users-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportUsers);
  }

  // Add user button
  const addUserBtn = document.getElementById('add-user-btn');
  if (addUserBtn) {
    addUserBtn.addEventListener('click', addUser);
  }

  // User action buttons
  document.querySelectorAll('.view-user-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userId = e.currentTarget.dataset.userId;
      viewUser(userId);
    });
  });

  document.querySelectorAll('.edit-user-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userId = e.currentTarget.dataset.userId;
      editUser(userId);
    });
  });

  document.querySelectorAll('.delete-user-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userId = e.currentTarget.dataset.userId;
      deleteUser(userId);
    });
  });
}

function filterUsers() {
  const searchTerm = document.getElementById('user-search')?.value.toLowerCase() || '';
  const filterStatus = document.getElementById('user-filter')?.value || '';
  const sortBy = document.getElementById('user-sort')?.value || 'name';

  const tableBody = document.querySelector('tbody');
  const rows = tableBody?.querySelectorAll('tr') || [];

  rows.forEach(row => {
    const nameCell = row.querySelector('td:first-child .text-sm.font-medium');
    const emailCell = row.querySelector('td:nth-child(2) .text-sm');
    const statusCell = row.querySelector('.rounded-full');

    const name = nameCell?.textContent.toLowerCase() || '';
    const email = emailCell?.textContent.toLowerCase() || '';
    const status = statusCell?.textContent.toLowerCase().includes('aktif') ? 'active' : 'inactive';

    const matchesSearch = !searchTerm || name.includes(searchTerm) || email.includes(searchTerm);
    const matchesFilter = !filterStatus || status === filterStatus;

    row.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
  });

  const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');

  if (sortBy && visibleRows.length > 1) {
    visibleRows.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.querySelector('td:first-child .text-sm.font-medium')?.textContent || '';
          bValue = b.querySelector('td:first-child .text-sm.font-medium')?.textContent || '';
          break;
        case 'email':
          aValue = a.querySelector('td:nth-child(2) .text-sm')?.textContent || '';
          bValue = b.querySelector('td:nth-child(2) .text-sm')?.textContent || '';
          break;
        case 'date':
          aValue = a.querySelector('td:nth-child(4) .text-sm')?.textContent || '';
          bValue = b.querySelector('td:nth-child(4) .text-sm')?.textContent || '';
          break;
        default:
          return 0;
      }

      return aValue.localeCompare(bValue);
    });

    visibleRows.forEach(row => tableBody.appendChild(row));
  }
}

function exportUsers() {
  const csvContent = "data:text/csv;charset=utf-8,"
    + "ID,Nama,Email,Telepon,Status,Tanggal Daftar\n"
    + users.map(user => `${user.id},${user.name},${user.email},${user.phone || ''},${user.isActive ? 'Aktif' : 'Tidak Aktif'},${formatDate(user.createdAt)}`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "users_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function viewUser(userId) {
  try {
    const user = await api.users.getById(userId);
    showUserModal('Detail User', user, 'view');
  } catch (error) {
    window.showToast('Gagal memuat data user', 'error');
  }
}

async function editUser(userId) {
  try {
    const user = await api.users.getById(userId);
    showUserModal('Edit User', user, 'edit', userId);
  } catch (error) {
    window.showToast('Gagal memuat data user', 'error');
  }
}

async function deleteUser(userId) {
  try {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    window.showConfirm(`Apakah Anda yakin ingin menghapus user ${user.name}?`, async () => {
      try {
        await api.users.delete(userId);
        window.showToast('User berhasil dihapus', 'success');
        setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        window.showToast('Gagal menghapus user', 'error');
      }
    });
  } catch (error) {
    window.showToast('Gagal menghapus user', 'error');
  }
}

function showUserModal(title, user, mode, userId = null) {
  const existingModal = document.getElementById('user-modal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'user-modal';
  modal.className = 'fixed inset-0 z-[300] flex items-center justify-center bg-black/50 backdrop-blur-sm';

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isAddMode = mode === 'add';

  modal.innerHTML = `
    <div class="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-800">${title}</h3>
        <button id="modal-close" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <i class="fa-solid fa-xmark text-gray-600"></i>
        </button>
      </div>

      ${isViewMode ? `
        <!-- View Mode -->
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <p class="text-gray-900">${user.name}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p class="text-gray-900">${user.email}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
              <p class="text-gray-900">${user.phone || '-'}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Daftar</label>
              <p class="text-gray-900">${formatDate(user.createdAt)}</p>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
              ${user.isActive ? 'Aktif' : 'Tidak Aktif'}
            </span>
          </div>
        </div>
      ` : `
        <!-- Edit/Add Mode -->
        <form id="user-edit-form" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input type="text" id="edit-name" value="${user.name || ''}" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="edit-email" value="${user.email || ''}" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
              <input type="tel" id="edit-phone" value="${user.phone || ''}" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select id="edit-status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="true" ${user.isActive ? 'selected' : ''}>Aktif</option>
                <option value="false" ${!user.isActive ? 'selected' : ''}>Tidak Aktif</option>
              </select>
            </div>
            ${isAddMode ? `
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" id="edit-password" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
            ` : ''}
          </div>
        </form>
      `}

      <div class="flex gap-3 justify-end mt-6">
        <button id="modal-cancel" class="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">
          ${isViewMode ? 'Tutup' : 'Batal'}
        </button>
        ${!isViewMode ? `
          <button id="modal-save" class="px-6 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
            ${isAddMode ? 'Tambah User' : 'Simpan Perubahan'}
          </button>
        ` : ''}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Event listeners
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-cancel').addEventListener('click', closeModal);

  if (isEditMode || isAddMode) {
    document.getElementById('modal-save').addEventListener('click', () => {
      if (isAddMode) {
        saveNewUser();
      } else {
        saveUserEdit(userId);
      }
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.remove();
  }

  async function saveUserEdit(id) {
    const name = document.getElementById('edit-name').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const phone = document.getElementById('edit-phone').value.trim();
    const isActive = document.getElementById('edit-status').value === 'true';

    if (!name || !email) {
      window.showToast('Nama dan email harus diisi', 'error');
      return;
    }

    try {
      await api.users.update(id, { name, email, phone, isActive });
      window.showToast('Data user berhasil diperbarui', 'success');
      closeModal();
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      const message = error.message.includes('already registered')
        ? 'Email sudah terdaftar'
        : 'Gagal memperbarui data user';
      window.showToast(message, 'error');
    }
  }

  async function saveNewUser() {
    const name = document.getElementById('edit-name').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const phone = document.getElementById('edit-phone').value.trim();
    const isActive = document.getElementById('edit-status').value === 'true';
    const password = document.getElementById('edit-password').value.trim();

    if (!name || !email || !password) {
      window.showToast('Nama, email, dan password harus diisi', 'error');
      return;
    }

    try {
      await api.users.create({ name, email, phone, password, isActive });
      window.showToast('User baru berhasil ditambahkan', 'success');
      closeModal();
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      const message = error.message.includes('already registered')
        ? 'Email sudah terdaftar'
        : 'Gagal menambahkan user';
      window.showToast(message, 'error');
    }
  }
}

function addUser() {
  showUserModal('Tambah User Baru', {
    name: '',
    email: '',
    phone: '',
    isActive: true
  }, 'add');
}

function formatDate(dateString) {
  if (!dateString) return 'Tidak diketahui';

  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}