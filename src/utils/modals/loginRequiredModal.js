export function showLoginRequiredModal() {
  // Prevent duplicate modal
  if (document.getElementById("login-required-modal")) return;

  const loginModal = document.createElement("div");
  loginModal.id = "login-required-modal";
  loginModal.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm";

  loginModal.innerHTML = `
    <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
      <div class="text-center">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fa-solid fa-user-lock text-blue-500 text-2xl"></i>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Login Diperlukan
        </h3>

        <p class="text-gray-600 mb-6">
          Untuk melanjutkan, Anda perlu login terlebih dahulu.
        </p>

        <div class="flex gap-3">
          <button
            id="login-cancel-btn"
            class="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-300 transition">
            Batal
          </button>

          <a
            href="#login"
            class="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-600 transition text-center">
            Login
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(loginModal);

  // Close button
  document
    .getElementById("login-cancel-btn")
    .addEventListener("click", () => {
      loginModal.remove();
    });

  // Close on backdrop click
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.remove();
    }
  });
}
