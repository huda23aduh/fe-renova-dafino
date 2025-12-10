import { carsData } from "../data/mockData.js";
import AdminSidebar, { mount as adminSidebarMount } from "../components/sections/admin-sidebar.js";

export default function AdminDashboard() {
  // Get statistics
  const totalCars = carsData.length;
  const totalUsers = JSON.parse(localStorage.getItem('users') || '[]').length;
  const totalTestDrive = JSON.parse(localStorage.getItem('testDriveRequests') || '[]').length;
  const totalFavorites = JSON.parse(localStorage.getItem('favorites') || '[]').length;

  // Get recent test drive requests
  const testDriveRequests = JSON.parse(localStorage.getItem('testDriveRequests') || '[]').slice(-5).reverse();

  // Get recent users
  const recentUsers = JSON.parse(localStorage.getItem('users') || '[]').slice(-5).reverse();

  // Get contact messages
  const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  const recentMessages = contactMessages.slice(-5).reverse();

  return `
  <div class="min-h-screen bg-gray-100">
    ${AdminSidebar('admin-dashboard')}

    <!-- Main Content -->
    <main class="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
      <div class="p-4 md:p-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
          <p class="text-gray-600">Selamat datang di panel admin Renova Mobil</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-car text-blue-500 text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">${totalCars}</p>
                <p class="text-sm text-gray-500">Total Mobil</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-users text-green-500 text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">${totalUsers}</p>
                <p class="text-sm text-gray-500">Total User</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-calendar-check text-yellow-500 text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">${totalTestDrive}</p>
                <p class="text-sm text-gray-500">Test Drive</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-heart text-red-500 text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">${totalFavorites}</p>
                <p class="text-sm text-gray-500">Favorit</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-envelope text-purple-500 text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">${contactMessages.length}</p>
                <p class="text-sm text-gray-500">Pesan Masuk</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Data -->
        <div class="grid lg:grid-cols-3 gap-6">
          <!-- Recent Test Drive Requests -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 class="font-bold text-gray-800">Permintaan Test Drive Terbaru</h3>
              <a href="#admin-testdrive" class="text-sm text-blue-500 hover:underline">Lihat Semua</a>
            </div>
            <div class="p-4">
              ${testDriveRequests.length > 0 ? testDriveRequests.map(req => `
                <div class="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                  <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <i class="fa-solid fa-car text-yellow-500"></i>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-800">${req.fullName}</p>
                    <p class="text-sm text-gray-500">${req.testDate} - ${req.testTime}</p>
                  </div>
                  <span class="px-2 py-1 text-xs rounded-full ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}">
                    ${req.status === 'pending' ? 'Menunggu' : 'Dikonfirmasi'}
                  </span>
                </div>
              `).join('') : '<p class="text-gray-500 text-center py-4">Belum ada permintaan test drive</p>'}
            </div>
          </div>

          <!-- Recent Users -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 class="font-bold text-gray-800">User Terbaru</h3>
              <a href="#admin-users" class="text-sm text-blue-500 hover:underline">Lihat Semua</a>
            </div>
            <div class="p-4">
              ${recentUsers.length > 0 ? recentUsers.map(user => `
                <div class="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i class="fa-solid fa-user text-blue-500"></i>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-800">${user.name}</p>
                    <p class="text-sm text-gray-500">${user.email}</p>
                  </div>
                </div>
              `).join('') : '<p class="text-gray-500 text-center py-4">Belum ada user terdaftar</p>'}
            </div>
          </div>

          <!-- Recent Contact Messages -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 class="font-bold text-gray-800">Pesan Masuk Terbaru</h3>
              <a href="#contact-admin" class="text-sm text-blue-500 hover:underline">Lihat Semua</a>
            </div>
            <div class="p-4">
              ${recentMessages.length > 0 ? recentMessages.map(message => `
                <div class="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
                  <div class="w-10 h-10 bg-${message.status === 'unread' ? 'blue' : message.status === 'replied' ? 'purple' : 'green'}-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-user text-${message.status === 'unread' ? 'blue' : message.status === 'replied' ? 'purple' : 'green'}-500"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <p class="font-semibold text-gray-800 text-sm">${message.name}</p>
                      <span class="px-1.5 py-0.5 text-xs font-medium rounded-full ${
                        message.status === 'unread' ? 'bg-yellow-100 text-yellow-800' :
                        message.status === 'replied' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }">
                        ${message.status === 'unread' ? 'Baru' : message.status === 'replied' ? 'Dibalas' : 'Dibaca'}
                      </span>
                    </div>
                    <p class="text-xs text-gray-500 mb-1">${message.email}</p>
                    <p class="text-sm text-gray-700 line-clamp-2">${message.message}</p>
                    <p class="text-xs text-gray-400 mt-1">${message.createdAt ? new Date(message.createdAt).toLocaleString('id-ID') : '-'}</p>
                  </div>
                </div>
              `).join('') : '<p class="text-gray-500 text-center py-4">Belum ada pesan masuk</p>'}
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="mt-8">
          <h3 class="font-bold text-gray-800 mb-4">Aksi Cepat</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#brand-catalog-admin" class="bg-[#14213D] text-white rounded-xl p-4 text-center hover:bg-[#1a2a4d] transition">
              <i class="fa-solid fa-plus text-2xl mb-2"></i>
              <p class="text-sm font-semibold">Tambah Mobil</p>
            </a>
            <a href="#admin-testdrive" class="bg-[#FFB703] text-[#14213D] rounded-xl p-4 text-center hover:bg-yellow-500 transition">
              <i class="fa-solid fa-list-check text-2xl mb-2"></i>
              <p class="text-sm font-semibold">Kelola Test Drive</p>
            </a>
            <a href="#admin-users" class="bg-green-500 text-white rounded-xl p-4 text-center hover:bg-green-600 transition">
              <i class="fa-solid fa-user-gear text-2xl mb-2"></i>
              <p class="text-sm font-semibold">Kelola User</p>
            </a>
            <a href="#contact-admin" class="bg-blue-500 text-white rounded-xl p-4 text-center hover:bg-blue-600 transition">
              <i class="fa-solid fa-envelope-open text-2xl mb-2"></i>
              <p class="text-sm font-semibold">Lihat Pesan</p>
            </a>
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
}
