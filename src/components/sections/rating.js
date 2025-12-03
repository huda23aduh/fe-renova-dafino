export default function RatingSection() {
  return `
    <section class="bg-white py-4 md:py-6 px-4 md:px-8 -mt-8 md:-mt-12 relative z-10 mb-12">
      <div class="max-w-6xl ml-0 md:ml-24 lg:ml-36">
        <h3 class="text-lg md:text-xl font-bold text-[#14213D] mb-3 md:mb-4 text-left">
          Beri rating dan ulasan untuk renova mobil
        </h3>

        <div class="flex items-start gap-3 md:gap-4 max-w-2xl">
          
          <!-- Profile -->
          <div class="flex flex-col items-center gap-2 shrink-0">
            <div class="w-14 md:w-16 h-14 md:h-16 bg-red-600 rounded-full flex items-center justify-center">
              <span class="text-white text-xl md:text-2xl font-bold">A</span>
            </div>
          </div>

          <!-- Rating and Comment -->
          <div class="flex-1 min-w-0">
            <!-- Stars -->
            <div class="flex gap-1 md:gap-2 mb-2 md:mb-3 rating-stars">
              ${[1, 2, 3, 4, 5]
                .map(
                  (s) => `
                  <button data-star="${s}" class="transition-transform hover:scale-110 text-lg md:text-2xl" type="button">
                    <i class="fa-solid fa-star text-gray-400"></i>
                  </button>
                `
                )
                .join("")}
            </div>

            <!-- Comment -->
            <textarea
              id="rating-comment"
              placeholder="Ceritakan pengalaman Anda"
              class="w-full border border-gray-200 rounded p-2 md:p-3 text-xs md:text-sm focus:outline-none focus:border-[#FFB703] focus:ring-1 focus:ring-[#FFB703] resize-none h-14 md:h-16"
            ></textarea>

            <div class="mt-2 md:mt-3 border-t border-gray-200 pt-1 md:pt-2">
              <p class="text-xs text-gray-500">Tambahkan komentar dari kunjungan terakhir</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function mountRatingSection() {
  // Star rating logic
  const starButtons = document.querySelectorAll("[data-star]");
  let rating = 0;

  const updateStars = () => {
    starButtons.forEach((btn) => {
      const starValue = Number(btn.dataset.star);
      const icon = btn.querySelector("i");
      if (rating >= starValue) {
        icon.classList.remove("text-gray-400");
        icon.classList.add("text-[#FFB703]");
      } else {
        icon.classList.add("text-gray-400");
        icon.classList.remove("text-[#FFB703]");
      }
    });
  };

  starButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      rating = Number(btn.dataset.star);
      updateStars();
    });
  });

  // Comment
  const commentInput = document.getElementById("rating-comment");
  if (commentInput) {
    commentInput.addEventListener('input', (e) => {
    });
  }
}
