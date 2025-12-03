export default function Footer() {
  return `
    <!-- Wave SVG -->
    <div class="w-full overflow-hidden">
      <img src="/images/wave_footer.png" alt="wave" class="w-full h-auto block" />
    </div>

    <footer class="bg-[#14213D] text-gray-300">
      <!-- Footer Content -->
      <div class="px-4 md:px-8 py-12">
        <div class="max-w-8xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <!-- Brand -->
            <div>
              <h2 class="text-4xl font-bold mb-4 text-white">
                Renova Mobil
              </h2>
              <p class="text-lg text-white">
                Renova merupakan platform jual beli mobil dengan tiga layanan utama yaitu jual, beli dan tukar tambah dan bisa diakses secara daring atau menghubungi dealer terdekat.
              </p>
            </div>

            <!-- Merek -->
            <div>
              <h3 class="text-white font-bold mb-4 text-xl">Merek</h3>
              <ul class="space-y-2 text-lg">
                <li><a href="#" class="text-white hover:text-[#FFB703] transition-colors">Toyota</a></li>
                <li><a href="#" class="text-white hover:text-[#FFB703] transition-colors">Daihatsu</a></li>
                <li><a href="#" class="text-white hover:text-[#FFB703] transition-colors">Mitsubishi</a></li>
                <li><a href="#" class="text-white hover:text-[#FFB703] transition-colors">Honda</a></li>
                <li><a href="#" class="text-white hover:text-[#FFB703] transition-colors">Suzuki</a></li>
              </ul>
            </div>

            <!-- Bantuan -->
            <div>
              <h3 class="text-white font-bold mb-4 text-xl">Bantuan</h3>
              <ul class="space-y-2 text-lg">
                <li><a href="#" class="text-white hover:text-[#FFB703] transition-colors">Panduan</a></li>
              </ul>
            </div>

            <!-- Renova -->
            <div>
              <h3 class="text-white font-bold mb-4 text-xl">Renova</h3>
              <ul class="space-y-2 text-lg">
                <li><a href="#" class="text-white hover:text-[#FFB703] transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <!-- Bottom Section -->
          <div class="flex flex-col md:flex-row items-center justify-between gap-8">
            <!-- Ikuti Kami Section -->
            <div>
              <h3 class="text-white font-bold mb-4 text-xl">Ikuti Kami</h3>
              <div class="flex gap-4">
                <a href="#" class="text-white hover:text-white transition-colors">
                  <i class="fa-brands fa-facebook text-3xl"></i>
                </a>
                <a href="#" class="text-white hover:text-white transition-colors">
                  <i class="fa-brands fa-youtube text-3xl"></i>
                </a>
                <a href="#" class="text-white hover:text-white transition-colors">
                  <i class="fa-brands fa-tiktok text-3xl"></i>
                </a>
                <a href="#" class="text-white hover:text-white transition-colors">
                  <i class="fa-brands fa-instagram text-3xl"></i>
                </a>
              </div>
            </div>

            <!-- Links -->
            <div class="flex gap-6 text-lg">
              <a href="#" class="text-white hover:text-[#FFB703] transition-colors">Kebijakan Privasi</a>
              <a href="#" class="text-white hover:text-[#FFB703] transition-colors">Syarat dan Ketentuan</a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  `;
}
