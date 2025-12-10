import AdminSidebar, { mount as adminSidebarMount } from "../components/sections/admin-sidebar.js";

export default function AdminUsers() {
  // Get users data
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
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
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Daftar</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${users.map((user, index) => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <i class="fa-solid fa-user text-blue-500"></i>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">${user.name}</div>
                          <div class="text-sm text-gray-500">ID: ${user.id || index + 1}</div>
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
                      <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-900">${user.password ? '••••••••' : '-'}</span>
                        <button class="text-blue-600 hover:text-blue-900 view-password-btn" data-user-index="${index}" title="Lihat Password">
                          <i class="fa-solid fa-eye"></i>
                        </button>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">${user.createdAt || 'Tidak diketahui'}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Aktif
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex gap-2">
                        <button class="text-blue-600 hover:text-blue-900 view-user-btn" data-user-index="${index}">
                          <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="text-green-600 hover:text-green-900 edit-user-btn" data-user-index="${index}">
                          <i class="fa-solid fa-edit"></i>
                        </button>
                        <button class="text-red-600 hover:text-red-900 delete-user-btn" data-user-index="${index}">
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
                <p class="text-2xl font-bold text-gray-800">${users.length}</p>
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
                <p class="text-2xl font-bold text-gray-800">${users.filter(u => u.status === 'active').length}</p>
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
                <p class="text-2xl font-bold text-gray-800">${users.filter(u => {
                  const today = new Date();
                  const userDate = new Date(u.createdAt);
                  const diffTime = Math.abs(today - userDate);
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length}</p>
                <p class="text-sm text-gray-500">User Baru (7 Hari)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  `;
}

export function mount() {
  // Mount sidebar functionality
  adminSidebarMount();

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
    refreshBtn.addEventListener('click', () => {
      window.location.reload();
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
      const userIndex = e.currentTarget.dataset.userIndex;
      viewUser(userIndex);
    });
  });

  document.querySelectorAll('.edit-user-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userIndex = e.currentTarget.dataset.userIndex;
      editUser(userIndex);
    });
  });

  document.querySelectorAll('.delete-user-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userIndex = e.currentTarget.dataset.userIndex;
      deleteUser(userIndex);
    });
  });

  // View password buttons
  document.querySelectorAll('.view-password-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userIndex = e.currentTarget.dataset.userIndex;
      viewPassword(userIndex);
    });
  });
}

function filterUsers() {
  const searchTerm = document.getElementById('user-search')?.value.toLowerCase() || '';
  const filterStatus = document.getElementById('user-filter')?.value || '';
  const sortBy = document.getElementById('user-sort')?.value || 'name';

  const tableBody = document.querySelector('tbody');
  const rows = tableBody?.querySelectorAll('tr') || [];
  
  // Filter rows based on search term
  rows.forEach(row => {
    const nameCell = row.querySelector('td:first-child .text-sm.font-medium');
    const emailCell = row.querySelector('td:nth-child(2) .text-sm');
    
    const name = nameCell?.textContent.toLowerCase() || '';
    const email = emailCell?.textContent.toLowerCase() || '';
    
    const matchesSearch = !searchTerm || name.includes(searchTerm) || email.includes(searchTerm);
    const matchesFilter = !filterStatus || row.querySelector('.rounded-full')?.textContent.toLowerCase().includes(filterStatus);
    
    row.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
  });

  // Sort visible rows
  const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');
  
  if (sortBy && visibleRows.length > 1) {
    visibleRows.sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
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
    
    // Reorder rows in DOM
    visibleRows.forEach(row => tableBody.appendChild(row));
  }
}

function exportUsers() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Name,Email,Phone,Created At\n"
    + users.map(user => `${user.name},${user.email},${user.phone || ''},${user.createdAt || ''}`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "users_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function viewUser(userIndex) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users[userIndex];
  
  if (user) {
    showUserModal('Detail User', user, 'view');
  }
}

function editUser(userIndex) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users[userIndex];
  
  if (user) {
    showUserModal('Edit User', user, 'edit', userIndex);
  }
}

function deleteUser(userIndex) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users[userIndex];
  
  if (user) {
    window.showConfirm(`Apakah Anda yakin ingin menghapus user ${user.name}?`, () => {
      users.splice(userIndex, 1);
      localStorage.setItem('users', JSON.stringify(users));
      window.showToast('User berhasil dihapus', 'success');
      setTimeout(() => window.location.reload(), 1000);
    });
  }
}

function showUserModal(title, user, mode, userIndex = null) {
  // Remove existing modal
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
              <p class="text-gray-900">${user.createdAt || 'Tidak diketahui'}</p>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Aktif
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
                <option value="active" ${user.status === 'active' ? 'selected' : ''}>Aktif</option>
                <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Tidak Aktif</option>
              </select>
            </div>
            ${isAddMode ? `
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" id="edit-password" value="${user.password || ''}" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
        saveUserEdit(userIndex);
      }
    });
  }

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.remove();
  }

  function saveUserEdit(index) {
    const name = document.getElementById('edit-name').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const phone = document.getElementById('edit-phone').value.trim();
    const status = document.getElementById('edit-status').value;

    if (!name || !email) {
      window.showToast('Nama dan email harus diisi', 'error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users[index]) {
      users[index] = {
        ...users[index],
        name,
        email,
        phone,
        status,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('users', JSON.stringify(users));
      window.showToast('Data user berhasil diperbarui', 'success');
      closeModal();
      setTimeout(() => window.location.reload(), 1000);
    }
  }

  function saveNewUser() {
    const name = document.getElementById('edit-name').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const phone = document.getElementById('edit-phone').value.trim();
    const status = document.getElementById('edit-status').value;
    const password = document.getElementById('edit-password').value.trim();

    if (!name || !email || !password) {
      window.showToast('Nama, email, dan password harus diisi', 'error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      window.showToast('Email sudah terdaftar', 'error');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password,
      status,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    window.showToast('User baru berhasil ditambahkan', 'success');
    closeModal();
    setTimeout(() => window.location.reload(), 1000);
  }
}

function addUser() {
  showUserModal('Tambah User Baru', {}, 'add');
}

function viewPassword(userIndex) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users[userIndex];
  
  if (user && user.password) {
    // Show password in a simple alert for now
    window.showToast(`Password untuk ${user.name}: ${user.password}`, 'info');
  } else {
    window.showToast('Password tidak ditemukan untuk user ini', 'error');
  }
}