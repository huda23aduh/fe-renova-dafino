import AdminSidebar, { mount as adminSidebarMount } from "../components/sections/admin-sidebar.js";

export default function AdminChangePasswordPage() {
  return `
  <div class="min-h-screen bg-gray-100">
    ${AdminSidebar('admin-change-password')}

    <!-- Main Content -->
    <main class="lg:ml-64 min-h-screen">
      <div class="p-4 md:p-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Ubah Password</h1>
          <p class="text-gray-600">Ubah password admin untuk keamanan akun Anda</p>
        </div>

        <!-- Change Password Form -->
        <div class="max-w-2xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="mb-6">
              <div class="w-16 h-16 bg-[#FFB703] rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fa-solid fa-key text-[#14213D] text-2xl"></i>
              </div>
              <h2 class="text-xl font-bold text-gray-800 text-center">Ubah Password Admin</h2>
              <p class="text-gray-600 text-center mt-2">Pastikan password baru Anda kuat dan mudah diingat</p>
            </div>

            <form id="change-password-form" class="space-y-6">
              <!-- Current Password -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Password Saat Ini</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <i class="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    required
                    placeholder="Masukkan password saat ini"
                    class="w-full rounded-xl border border-gray-300 pl-12 pr-12 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB703]"
                  />
                  <button type="button" id="toggle-current-password" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </div>
              </div>

              <!-- New Password -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Password Baru</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <i class="fa-solid fa-key"></i>
                  </span>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    required
                    placeholder="Masukkan password baru"
                    class="w-full rounded-xl border border-gray-300 pl-12 pr-12 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB703]"
                  />
                  <button type="button" id="toggle-new-password" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </div>
                <div class="mt-2">
                  <div class="text-xs text-gray-500 mb-1">Password harus memenuhi:</div>
                  <ul class="text-xs text-gray-500 space-y-1">
                    <li id="length-check" class="flex items-center gap-2">
                      <i class="fa-solid fa-circle text-xs"></i>
                      Minimal 6 karakter
                    </li>
                    <li id="uppercase-check" class="flex items-center gap-2">
                      <i class="fa-solid fa-circle text-xs"></i>
                      Contiene huruf besar
                    </li>
                    <li id="number-check" class="flex items-center gap-2">
                      <i class="fa-solid fa-circle text-xs"></i>
                      Contiene angka
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Confirm New Password -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Password Baru</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <i class="fa-solid fa-check"></i>
                  </span>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    placeholder="Konfirmasi password baru"
                    class="w-full rounded-xl border border-gray-300 pl-12 pr-12 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB703]"
                  />
                  <button type="button" id="toggle-confirm-password" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </div>
              </div>

              <!-- Error Message -->
              <div id="password-error" class="hidden text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg"></div>
              <!-- Success Message -->
              <div id="password-success" class="hidden text-green-500 text-sm text-center bg-green-50 p-3 rounded-lg"></div>

              <!-- Submit Button -->
              <div class="flex gap-4">
                <a href="#admin-dashboard" class="flex-1 bg-gray-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-600 transition text-center">
                  <i class="fa-solid fa-arrow-left mr-2"></i>Batal
                </a>
                <button
                  type="submit"
                  id="change-password-btn"
                  class="flex-1 bg-[#14213D] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1a2a4d] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i class="fa-solid fa-save mr-2"></i>Ubah Password
                </button>
              </div>
            </form>
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

  // Password toggle functionality
  setupPasswordToggles();

  // Password validation
  setupPasswordValidation();

  // Form submission
  setupFormSubmission();
}

function setupPasswordToggles() {
  const toggles = [
    { input: 'currentPassword', toggle: 'toggle-current-password' },
    { input: 'newPassword', toggle: 'toggle-new-password' },
    { input: 'confirmPassword', toggle: 'toggle-confirm-password' }
  ];

  toggles.forEach(({ input, toggle }) => {
    const passwordInput = document.getElementById(input);
    const toggleBtn = document.getElementById(toggle);

    if (passwordInput && toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        const icon = toggleBtn.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      });
    }
  });
}

function setupPasswordValidation() {
  const newPasswordInput = document.getElementById('newPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  if (newPasswordInput) {
    newPasswordInput.addEventListener('input', validatePassword);
  }

  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', validatePassword);
  }
}

function validatePassword() {
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const confirmPasswordInput = document.getElementById('confirmPassword');

  // Check length
  const lengthCheck = document.getElementById('length-check');
  const lengthValid = newPassword.length >= 6;
  updateValidationItem(lengthCheck, lengthValid);

  // Check uppercase
  const uppercaseCheck = document.getElementById('uppercase-check');
  const uppercaseValid = /[A-Z]/.test(newPassword);
  updateValidationItem(uppercaseCheck, uppercaseValid);

  // Check number
  const numberCheck = document.getElementById('number-check');
  const numberValid = /\d/.test(newPassword);
  updateValidationItem(numberCheck, numberValid);

  // Check password match
  if (confirmPassword) {
    const match = newPassword === confirmPassword;
    if (match) {
      confirmPasswordInput.classList.remove('border-red-500');
      confirmPasswordInput.classList.add('border-green-500');
    } else {
      confirmPasswordInput.classList.remove('border-green-500');
      confirmPasswordInput.classList.add('border-red-500');
    }
  }

  updateSubmitButton();
}

function updateValidationItem(element, isValid) {
  if (element) {
    const icon = element.querySelector('i');
    if (isValid) {
      icon.className = 'fa-solid fa-circle-check text-xs text-green-500';
      element.className = element.className.replace('text-red-500', 'text-green-500');
    } else {
      icon.className = 'fa-solid fa-circle text-xs text-red-500';
      element.className = element.className.replace('text-green-500', 'text-red-500');
    }
  }
}

function updateSubmitButton() {
  const submitBtn = document.getElementById('change-password-btn');
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const currentPassword = document.getElementById('currentPassword').value;

  const isValid = currentPassword && 
                  newPassword.length >= 6 && 
                  /[A-Z]/.test(newPassword) && 
                  /\d/.test(newPassword) && 
                  newPassword === confirmPassword;

  if (submitBtn) {
    submitBtn.disabled = !isValid;
  }
}

function setupFormSubmission() {
  const form = document.getElementById('change-password-form');
  const errorDiv = document.getElementById('password-error');
  const successDiv = document.getElementById('password-success');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Hide previous messages
      errorDiv.classList.add('hidden');
      successDiv.classList.add('hidden');

      const formData = new FormData(form);
      const currentPassword = formData.get('currentPassword');
      const newPassword = formData.get('newPassword');
      const confirmPassword = formData.get('confirmPassword');

      // Validate current password
      const ADMIN_CURRENT_PASSWORD = localStorage.getItem('adminPassword') || 'admin123'; // Get from localStorage or use default
      if (currentPassword !== ADMIN_CURRENT_PASSWORD) {
        showError('Password saat ini tidak sesuai');
        return;
      }

      // Validate new password
      if (newPassword !== confirmPassword) {
        showError('Konfirmasi password tidak sesuai');
        return;
      }

      if (newPassword.length < 6) {
        showError('Password baru harus minimal 6 karakter');
        return;
      }

      try {
        // Simulate password change (in real app, this would be an API call)
        await changePassword(newPassword);
        showSuccess('Password berhasil diubah!');
        
        // Clear form
        form.reset();
        
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.hash = '#admin-dashboard';
        }, 2000);
      } catch (error) {
        showError('Gagal mengubah password. Silakan coba lagi.');
      }
    });
  }

  function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    successDiv.classList.add('hidden');
  }

  function showSuccess(message) {
    successDiv.textContent = message;
    successDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
  }

  function changePassword(newPassword) {
    return new Promise((resolve) => {
      // In a real application, this would update the password in a database
      // For demo purposes, we'll store it in localStorage and update the admin-login constants
      localStorage.setItem('adminPassword', newPassword);
      
      // Simulate API call delay
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}