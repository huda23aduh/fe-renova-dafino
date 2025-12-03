import { newsData } from "../data/mockData.js";

export default function News() {
  return `
    <section class="bg-[#14213D] text-white px-4 md:px-8 py-20">
      <div class="max-w-8xl mx-auto">
        
        <!-- Rekomendasi Section -->
        <div class="mb-20 mx-20">
          <h2 class="text-3xl font-semibold mb-8 mt-10">Rekomendasi Untuk Anda</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            ${newsData[0].items.map(item => `
              <div class="bg-white text-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-2 border-white">
                <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
                <div class="p-4">
                  <p class="text-sm font-semibold mb-3 line-clamp-2">${item.title}</p>
                  <div class="flex justify-between items-center text-xs text-gray-600">
                    <span>${item.date}</span>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Berita TerUpdate Section -->
        <div class="mb-20 mx-20">
          <h2 class="text-3xl font-semibold mb-8">Berita TerUpdate</h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            ${newsData[1].items.map(item => `
              <div class="relative rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-2 border-white h-96 group">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-linear-to-t from-black to-transparent flex items-end p-4">
                  <div class="text-white">
                    <p class="text-lg font-semibold mb-1">${item.title}</p>
                    <p class="text-sm text-gray-300">${item.date}</p>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- News Feed Section -->
        <div class="mx-20">
          <h2 class="text-3xl font-semibold mb-8">News Feed</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${newsData[2].items.map((item, index) => `
              <div class=" cursor-pointer flex gap-4 h-40">
                <img src="${item.image}" alt="${item.title}" class="w-32 h-32 object-cover rounded shrink-0">
                <div class="flex-1 flex flex-col justify-center text-white">
                  <p class="text-lg font-bold mb-3 line-clamp-2">${item.title}</p>
                  <p class="text-sm text-gray-300">${item.date}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    </section>
  `;
}

export function mount() {
  return null;
}
