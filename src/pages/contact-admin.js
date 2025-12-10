import AdminSidebar, { mount as adminSidebarMount } from "../components/sections/admin-sidebar.js";

export default function ContactAdminPage() {
  // Get contact messages from localStorage
  const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  
  return `
  <div class="min-h-screen bg-gray-100">
    ${AdminSidebar('contact-admin')}

    <!-- Main Content -->
    <main class="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
      <div class="p-4 md:p-8">
        <!-- Header -->
        <div class="mb-8 flex justify-between items-center">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Pesan Masuk</h1>
            <p class="text-gray-600">Kelola pesan dari pengunjung website</p>
          </div>
          <div class="flex gap-2 flex-wrap">
            <button id="delete-all-messages-btn" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
              <i class="fa-solid fa-trash mr-2"></i>Hapus Semua
            </button>
            <button id="export-messages-btn" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
              <i class="fa-solid fa-download mr-2"></i>Export
            </button>
            <button id="refresh-messages-btn" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              <i class="fa-solid fa-sync mr-2"></i>Refresh
            </button>
          </div>
        </div>

        <!-- Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-envelope text-blue-500 text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">${contactMessages.length}</p>
                <p class="text-sm text-gray-500">Total Pesan</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-clock text-yellow-500 text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">${contactMessages.filter(m => m.status === 'unread').length}</p>
                <p class="text-sm text-gray-500">Belum Dibaca</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-check text-green-500 text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">${contactMessages.filter(m => m.status === 'read').length}</p>
                <p class="text-sm text-gray-500">Sudah Dibaca</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-reply text-purple-500 text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">${contactMessages.filter(m => m.status === 'replied').length}</p>
                <p class="text-sm text-gray-500">Sudah Dibalas</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <input type="text" id="message-search" placeholder="Cari berdasarkan nama atau email..." 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <select id="message-filter-status" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Semua Status</option>
                <option value="unread">Belum Dibaca</option>
                <option value="read">Sudah Dibaca</option>
                <option value="replied">Sudah Dibalas</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Messages List -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-4 border-b border-gray-200">
            <h3 class="font-bold text-gray-800">Daftar Pesan (${contactMessages.length})</h3>
          </div>
          
          ${contactMessages.length > 0 ? `
          <div class="divide-y divide-gray-200">
            ${contactMessages.map((message, index) => `
              <div class="p-4 hover:bg-gray-50 transition message-item" data-status="${message.status || 'unread'}">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-${message.status === 'unread' ? 'blue' : message.status === 'replied' ? 'purple' : 'green'}-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-user text-${message.status === 'unread' ? 'blue' : message.status === 'replied' ? 'purple' : 'green'}-500"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="font-semibold text-gray-800 ${message.status === 'unread' ? 'font-bold' : ''}">${message.name}</h4>
                      <span class="px-2 py-0.5 text-xs font-medium rounded-full ${
                        message.status === 'unread' ? 'bg-yellow-100 text-yellow-800' :
                        message.status === 'replied' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }">
                        ${message.status === 'unread' ? 'Belum Dibaca' : message.status === 'replied' ? 'Sudah Dibalas' : 'Sudah Dibaca'}
                      </span>
                    </div>
                    <p class="text-sm text-gray-500 mb-1">${message.email}</p>
                    <p class="text-sm text-gray-700 line-clamp-2">${message.message}</p>
                    <p class="text-xs text-gray-400 mt-2">${message.createdAt ? new Date(message.createdAt).toLocaleString('id-ID') : '-'}</p>
                  </div>
                  <div class="flex gap-1 flex-shrink-0">
                    <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition view-message-btn" data-message-index="${index}" title="Lihat Detail">
                      <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition mark-read-btn ${message.status !== 'unread' ? 'opacity-50 cursor-not-allowed' : ''}" data-message-index="${index}" title="Tandai Dibaca" ${message.status !== 'unread' ? 'disabled' : ''}>
                      <i class="fa-solid fa-check"></i>
                    </button>
                    <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition reply-message-btn" data-message-index="${index}" title="Balas">
                      <i class="fa-solid fa-reply"></i>
                    </button>
                    <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition delete-message-btn" data-message-index="${index}" title="Hapus">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          ` : `
          <div class="p-8 text-center">
            <i class="fa-solid fa-envelope-open text-4xl text-gray-300 mb-4"></i>
            <p class="text-gray-500">Belum ada pesan masuk</p>
            <p class="text-sm text-gray-400">Pesan dari pengunjung akan muncul di sini</p>
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

  // Search functionality
  const searchInput = document.getElementById('message-search');
  if (searchInput) {
    searchInput.addEventListener('input', filterMessages);
  }

  // Filter functionality
  const filterSelect = document.getElementById('message-filter-status');
  if (filterSelect) {
    filterSelect.addEventListener('change', filterMessages);
  }

  // Refresh button
  const refreshBtn = document.getElementById('refresh-messages-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }

  // Delete All button
  const deleteAllBtn = document.getElementById('delete-all-messages-btn');
  if (deleteAllBtn) {
    deleteAllBtn.addEventListener('click', deleteAllMessages);
  }

  // Export button
  const exportBtn = document.getElementById('export-messages-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportMessages);
  }

  // Message action buttons
  document.querySelectorAll('.view-message-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const messageIndex = e.currentTarget.dataset.messageIndex;
      viewMessage(messageIndex);
    });
  });

  document.querySelectorAll('.mark-read-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const messageIndex = e.currentTarget.dataset.messageIndex;
      markAsRead(messageIndex);
    });
  });

  document.querySelectorAll('.reply-message-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const messageIndex = e.currentTarget.dataset.messageIndex;
      replyMessage(messageIndex);
    });
  });

  document.querySelectorAll('.delete-message-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const messageIndex = e.currentTarget.dataset.messageIndex;
      deleteMessage(messageIndex);
    });
  });

  return () => {};
}

function filterMessages() {
  const searchTerm = document.getElementById('message-search')?.value.toLowerCase() || '';
  const filterStatus = document.getElementById('message-filter-status')?.value || '';

  const messageItems = document.querySelectorAll('.message-item');
  
  messageItems.forEach(item => {
    const name = item.querySelector('h4')?.textContent.toLowerCase() || '';
    const email = item.querySelector('.text-gray-500')?.textContent.toLowerCase() || '';
    const status = item.dataset.status || '';
    
    const matchesSearch = !searchTerm || name.includes(searchTerm) || email.includes(searchTerm);
    const matchesFilter = !filterStatus || status === filterStatus;
    
    item.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
  });
}

function exportMessages() {
  const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Name,Email,Message,Status,Date\n"
    + contactMessages.map(msg => `"${msg.name}","${msg.email}","${msg.message.replace(/"/g, '""')}","${msg.status}","${msg.createdAt}"`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "contact_messages.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function showModal(title, message, type = 'info', onConfirm = null) {
  const existingModal = document.getElementById('custom-modal');
  if (existingModal) existingModal.remove();

  const iconMap = {
    info: { icon: 'fa-info-circle', color: 'text-blue-500', bg: 'bg-blue-100' },
    success: { icon: 'fa-check-circle', color: 'text-green-500', bg: 'bg-green-100' },
    warning: { icon: 'fa-exclamation-triangle', color: 'text-yellow-500', bg: 'bg-yellow-100' },
    error: { icon: 'fa-times-circle', color: 'text-red-500', bg: 'bg-red-100' },
    confirm: { icon: 'fa-question-circle', color: 'text-blue-500', bg: 'bg-blue-100' }
  };

  const { icon, color, bg } = iconMap[type] || iconMap.info;

  const modal = document.createElement('div');
  modal.id = 'custom-modal';
  modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-[100]';
  modal.innerHTML = `
    <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all">
      <div class="text-center">
        <div class="w-16 h-16 ${bg} rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fa-solid ${icon} ${color} text-3xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">${title}</h3>
        <p class="text-gray-600 mb-6">${message}</p>
        <div class="flex gap-3 justify-center">
          ${onConfirm ? `
            <button id="modal-cancel-btn" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium">
              Batal
            </button>
            <button id="modal-confirm-btn" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium">
              Ya, Lanjutkan
            </button>
          ` : `
            <button id="modal-ok-btn" class="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium">
              OK
            </button>
          `}
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  if (onConfirm) {
    document.getElementById('modal-cancel-btn').addEventListener('click', () => modal.remove());
    document.getElementById('modal-confirm-btn').addEventListener('click', () => {
      modal.remove();
      onConfirm();
    });
  } else {
    document.getElementById('modal-ok-btn').addEventListener('click', () => modal.remove());
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal && !onConfirm) modal.remove();
  });
}

function viewMessage(messageIndex) {
  const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  const message = contactMessages[messageIndex];
  
  if (message) {
    // Mark as read if unread
    if (message.status === 'unread') {
      contactMessages[messageIndex].status = 'read';
      localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
    }

    const modal = document.createElement('div');
    modal.id = 'message-detail-modal';
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">Detail Pesan</h3>
          <button id="close-message-modal" class="text-gray-500 hover:text-gray-700">
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        <div class="space-y-4">
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i class="fa-solid fa-user text-blue-500 text-xl"></i>
            </div>
            <div>
              <p class="font-semibold text-gray-800">${message.name}</p>
              <p class="text-sm text-gray-500">${message.email}</p>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">Pesan</p>
            <p class="text-gray-700 bg-gray-50 p-4 rounded-lg">${message.message}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Status</p>
              <span class="px-2 py-1 text-xs font-semibold rounded-full ${
                message.status === 'unread' ? 'bg-yellow-100 text-yellow-800' :
                message.status === 'replied' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              }">
                ${message.status === 'unread' ? 'Belum Dibaca' : message.status === 'replied' ? 'Sudah Dibalas' : 'Sudah Dibaca'}
              </span>
            </div>
            <div>
              <p class="text-sm text-gray-500">Tanggal</p>
              <p class="font-medium">${message.createdAt ? new Date(message.createdAt).toLocaleString('id-ID') : '-'}</p>
            </div>
          </div>
        </div>
        <div class="mt-6 flex gap-2 justify-end">
          <button id="reply-from-modal-btn" class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
            <i class="fa-solid fa-reply mr-2"></i>Balas
          </button>
          <button id="close-message-btn" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
            Tutup
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('close-message-modal').addEventListener('click', () => {
      modal.remove();
      window.location.reload();
    });
    document.getElementById('close-message-btn').addEventListener('click', () => {
      modal.remove();
      window.location.reload();
    });
    document.getElementById('reply-from-modal-btn').addEventListener('click', () => {
      modal.remove();
      replyMessage(messageIndex);
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        window.location.reload();
      }
    });
  }
}

function markAsRead(messageIndex) {
  const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  const message = contactMessages[messageIndex];
  
  if (message && message.status === 'unread') {
    contactMessages[messageIndex].status = 'read';
    localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
    showModal('Berhasil', 'Pesan ditandai sebagai sudah dibaca', 'success');
    setTimeout(() => window.location.reload(), 1500);
  }
}

function replyMessage(messageIndex) {
  const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  const message = contactMessages[messageIndex];
  
  if (message) {
    const modal = document.createElement('div');
    modal.id = 'reply-modal';
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-xl shadow-2xl max-w-6xl w-full mx-4 h-[80vh] flex">
        <!-- Sidebar Messages List -->
        <div class="w-1/3 border-r border-gray-200 flex flex-col">
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <h3 class="font-bold text-gray-800">Daftar Pesan</h3>
          </div>
          <div class="flex-1 overflow-y-auto">
            ${contactMessages.map((msg, idx) => `
              <div class="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition message-sidebar-item ${idx === messageIndex ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}" data-message-index="${idx}">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 bg-${msg.status === 'unread' ? 'blue' : msg.status === 'replied' ? 'purple' : 'green'}-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-user text-${msg.status === 'unread' ? 'blue' : msg.status === 'replied' ? 'purple' : 'green'}-500 text-xs"></i>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <p class="font-medium text-sm text-gray-800 truncate">${msg.name}</p>
                      ${msg.status === 'replied' ? '<i class="fa-solid fa-check-circle text-green-500 text-xs" title="Sudah Dibalas"></i>' : ''}
                    </div>
                    <p class="text-xs text-gray-500 truncate">${msg.email}</p>
                    <p class="text-xs text-gray-600 line-clamp-2 mt-1">${msg.message}</p>
                    ${msg.reply ? `
                      <div class="mt-2 p-2 bg-purple-50 rounded border-l-2 border-purple-200">
                        <p class="text-xs text-purple-700 font-medium mb-1">Balasan Admin:</p>
                        <p class="text-xs text-purple-600 line-clamp-2">${msg.reply}</p>
                        <p class="text-xs text-purple-400 mt-1">${msg.repliedAt ? new Date(msg.repliedAt).toLocaleString('id-ID') : '-'}</p>
                      </div>
                    ` : ''}
                    <p class="text-xs text-gray-400 mt-1">${msg.createdAt ? new Date(msg.createdAt).toLocaleString('id-ID') : '-'}</p>
                  </div>
                  <div class="flex flex-col items-center gap-1">
                    ${msg.status === 'unread' ? '<div class="w-2 h-2 bg-blue-500 rounded-full"></div>' : ''}
                    ${msg.status === 'replied' ? '<i class="fa-solid fa-reply text-purple-500 text-xs"></i>' : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Main Reply Form -->
        <div class="flex-1 flex flex-col">
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-bold text-gray-800">Balas Pesan</h3>
              <button id="close-reply-modal" class="text-gray-500 hover:text-gray-700">
                <i class="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
          </div>
          
          <div class="flex-1 p-6 overflow-y-auto">
            <!-- Original Message -->
            <div class="bg-gray-50 p-4 rounded-lg mb-6">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i class="fa-solid fa-user text-blue-500"></i>
                </div>
                <div>
                  <p class="font-semibold">${message.name}</p>
                  <p class="text-sm text-gray-500">${message.email}</p>
                </div>
              </div>
              <div class="bg-white p-4 rounded border-l-4 border-blue-500">
                <p class="text-gray-700">${message.message}</p>
                <p class="text-xs text-gray-400 mt-2">${message.createdAt ? new Date(message.createdAt).toLocaleString('id-ID') : '-'}</p>
              </div>
            </div>
            
            <!-- Reply Form -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Pesan Balasan</label>
                <textarea id="reply-text" rows="8" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Tulis balasan Anda..."></textarea>
              </div>
            </div>
          </div>
          
          <div class="p-6 border-t border-gray-200 bg-gray-50">
            <div class="flex gap-3 justify-end">
              <button id="cancel-reply-btn" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                Batal
              </button>
              <button id="send-reply-btn" class="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                <i class="fa-solid fa-paper-plane mr-2"></i>Kirim Balasan
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Sidebar message click handler
    document.querySelectorAll('.message-sidebar-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const newIndex = parseInt(e.currentTarget.dataset.messageIndex);
        modal.remove();
        replyMessage(newIndex);
      });
    });
    
    document.getElementById('close-reply-modal').addEventListener('click', () => modal.remove());
    document.getElementById('cancel-reply-btn').addEventListener('click', () => modal.remove());
    document.getElementById('send-reply-btn').addEventListener('click', () => {
      const replyText = document.getElementById('reply-text').value;
      if (replyText.trim()) {
        contactMessages[messageIndex].status = 'replied';
        contactMessages[messageIndex].reply = replyText;
        contactMessages[messageIndex].repliedAt = new Date().toISOString();
        
        // Update localStorage
        localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
        
        // Save notification for user
        const notifications = JSON.parse(localStorage.getItem('contactNotifications') || '[]');
        notifications.unshift({
          id: Date.now(),
          type: 'message_reply',
          message: `Admin telah membalas pesan Anda`,
          messageDetail: replyText.substring(0, 100) + (replyText.length > 100 ? '...' : ''),
          fromUser: message.name,
          email: message.email,
          timestamp: new Date().toISOString(),
          read: false
        });
        localStorage.setItem('contactNotifications', JSON.stringify(notifications));
        
        // Update navbar notification count
        if (window.updateNotificationCount) {
          window.updateNotificationCount();
        }
        
        modal.remove();
        showModal('Berhasil', 'Balasan berhasil dikirim dan notifikasi telah dikirim ke user', 'success');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        showModal('Peringatan', 'Silakan tulis pesan balasan terlebih dahulu', 'warning');
      }
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }
}

function deleteAllMessages() {
  const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  
  if (contactMessages.length === 0) {
    showModal('Peringatan', 'Tidak ada pesan untuk dihapus', 'warning');
    return;
  }

  showModal('Hapus Semua Pesan', `Apakah Anda yakin ingin menghapus SEMUA pesan (${contactMessages.length} item)? Tindakan ini tidak dapat dibatalkan!`, 'error', () => {
    localStorage.setItem('contactMessages', JSON.stringify([]));
    showModal('Berhasil', 'Semua pesan telah dihapus', 'success');
    setTimeout(() => window.location.reload(), 1500);
  });
}

function deleteMessage(messageIndex) {
  const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  const message = contactMessages[messageIndex];
  
  if (message) {
    showModal('Hapus Pesan', `Apakah Anda yakin ingin menghapus pesan dari ${message.name}?`, 'error', () => {
      contactMessages.splice(messageIndex, 1);
      localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
      showModal('Berhasil', 'Pesan berhasil dihapus', 'success');
      setTimeout(() => window.location.reload(), 1500);
    });
  }
}
