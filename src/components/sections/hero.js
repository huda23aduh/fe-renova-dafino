export default function Hero() {
  return `
    <section class="bg-[#14213D] text-white px-4 sm:px-6 md:px-8 pb-0 pt-16 sm:pt-20 md:pt-20 lg:pt-20 lg:px-8 relative">
      <div class="pb-8 sm:pb-10 pt-12 sm:pt-20 px-4 sm:px-6 md:px-8 lg:px-32 flex items-center justify-center min-h-auto lg:min-h-96 flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-16 max-w-8xl mx-auto">
        <!-- Left Text Content -->
        <div class="flex-1 text-center lg:text-left">
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-3 lg:mb-2 text-[#FFB703] leading-tight">
            SELAMAT DATANG DI<br />RENOVA MOBIL
          </h1>
          <p class="text-[#FFB703] text-xs md:text-base lg:text-lg font-semibold mb-3 sm:mb-4 md:mb-6 lg:mb-8">
            kami memiliki jenis mobil yang anda butuhkan
          </p>
        </div>

        <!-- Right Car Image -->
        <div class="flex justify-center w-full lg:flex-1">
          <img src="/images/car_hero.png" alt="Renova Car" class="w-4/5 sm:w-3/4 md:w-3/5 lg:w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl object-contain drop-shadow-2xl" />
        </div>
      </div>

     
    </section>

    <!-- Wave Divider with Paragraph Overlay -->
    <div style="width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; background-color: #d9d9d9; display: block; overflow: visible;">
      <div style="position: relative;">
        <img src="/images/wave_hero.png" alt="Wave" style="display: block; width: 100%; height: auto; margin: 0; padding: 0; line-height: 0;" />

        <!-- Paragraph Overlay on Wave -->
        <div class="lg:hidden" style="position: absolute; top: 20%; left: 50%; transform: translate(-50%, -50%); width: 95%; text-align: center; padding: 0 0.5rem;">
          <p class="text-[#FFB703] text-xs sm:text-sm md:text-base leading-relaxed font-semibold pb-3 sm:pb-4 md:pb-6 px-2 sm:px-3 md:px-4">
            Renova Mobil adalah platform jual beli mobil bekas terpercaya. Kami menawarkan berbagai pilihan mobil berkualitas dari berbagai merek, model, dan tahun produksi. Bersama Renova dapat menemukan mobil bekas sesuai kebutuhan dan budget. Prosesnya mudah dan transparan.
          </p>
        </div>

        <!-- Paragraph Overlay on Wave - Desktop -->
        <div class="hidden lg:block" style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); width: 90%; text-align: center;">
          <p class="text-[#FFB703] text-xl leading-relaxed font-semibold pb-10">
            Renova Mobil adalah platform jual beli mobil bekas terpercaya. Kami menawarkan berbagai pilihan mobil 
            berkualitas dari
            <br />
            berbagai merek, model, dan tahun produksi. Sobi Renova dapat menemukan mobil bekas yang 
            sesuai dengan kebutuhan <br />
            dan budget. Prosesnya mudah dan transparan, sehingga Sobi Renova bisa beli mobil 
            dengan tenang dan nyaman.
          </p>
        </div>
      </div>
    </div>
  `;
}
