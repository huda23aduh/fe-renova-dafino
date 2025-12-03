export default function Banner() {
  return `
    <section class="px-8 py-16" style="background-color: #d9d9d9;">
      <div class="w-full">
        <div id="banner-slider" class="w-full">
          <!-- slider content di-render oleh JS -->
        </div>

        <!-- Dots Navigation -->
        <div id="banner-dots" class="flex justify-center gap-3 mt-8"></div>
      </div>
    </section>
  `;
}
