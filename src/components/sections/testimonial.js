import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { testimonialsData } from "../../data/mockData.js";

export default function Testimonial() {
  return `
    <section class="bg-white relative">
      <!-- Wave Background -->
      <div class="w-full relative ">
        <img src="images/wave_testimonial.png" alt="wave" class="w-full h-auto block" />
      </div>

      <!-- Content Container (starts right after wave) -->
      <div class="pb-12 md:pb-16 lg:pb-20">
        <!-- Title Section (overlap wave) -->
        <div class="text-center mt-8 sm:mt-16 mb-12 md:mb-16 relative z-10">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#14213D]">
            OUR TESTIMONIALS
          </h2>
        </div>

        <!-- Testimonials Carousel with Large Border -->
        <div class="px-6 sm:px-8 md:px-12 lg:px-20 pt-8 sm:pt-12 md:pt-16 mx-4 sm:mx-6 md:mx-8 lg:mx-12">
          <div class="swiper testimonial-swiper select-none overflow-visible" style="cursor: grab;">
          <div class="swiper-wrapper">
            ${testimonialsData.map(testimonial => `
              <div class="swiper-slide h-auto px-3 sm:px-4 md:px-5 overflow-visible testimonial-mobile-card">
                <!-- Card Container with positioning context -->
                <div class="relative py-6 sm:py-12 md:py-20">
                  <!-- Yellow Background Card (rotated left) -->
                  <div class="testimonial-bg-accent absolute inset-x-0 top-0 bg-[#FFB703] rounded-3xl z-0" style="transform: rotate(-4deg); margin-top: 40px; margin-left: -15px; height: 65%; width: 100%;"></div>

                  <!-- Main Blue Card -->
                  <div class="relative z-10 bg-[#14213D] rounded-3xl p-6 sm:p-10 md:p-16 w-full flex flex-col items-center justify-start md:justify-between shadow-lg">
                    <!-- Profile Image Container (overlaps top) -->
                    <div class="testimonial-profile-img absolute left-1/2 transform -translate-x-1/2 z-30" style="top: -32px;">
                      <img src="${testimonial.image}" alt="${testimonial.name}" class="w-16 h-16 sm:w-20 sm:h-20 md:w-40 md:h-40 rounded-full object-cover responsive-image" />
                    </div>

                    <!-- Content (with padding-top for profile) -->
                    <div class="flex flex-col items-center justify-center flex-1 mt-6 sm:mt-10 md:mt-16 text-center w-full">
                      <!-- Name -->
                      <h3 class="text-lg sm:text-2xl md:text-3xl font-bold text-[#FFB703] mb-2 sm:mb-4">
                        ${testimonial.name}
                      </h3>

                      <!-- Rating (with decimal, aligned with stars) -->
                      <div class="flex items-center gap-1.5 sm:gap-2.5 justify-center mb-2 sm:mb-4">
                        <span class="text-xs sm:text-base md:text-lg text-white font-semibold">${testimonial.rating.toFixed(1)}</span>
                        <div class="flex gap-0.5">
                          ${Array(testimonial.stars).fill('').map(() => `<i class="fa-solid fa-star text-[#FFB703] text-xs sm:text-base md:text-lg"></i>`).join('')}
                        </div>
                      </div>

                      <!-- Testimonial Text -->
                      <p class="text-xs sm:text-base md:text-lg text-gray-200 leading-relaxed line-clamp-3 sm:line-clamp-4 md:line-clamp-4 mb-3 sm:mb-4 responsive-text">
                        ${testimonial.text}
                      </p>
                    </div>

                    <!-- Quote Icon (bottom right) -->
                    <div class="flex justify-end w-full mt-3 sm:mt-4 md:mt-6">
                      <img src="images/99.png" alt="quote" class="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 opacity-70" style="filter: brightness(1.2);" />
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        </div>
      </div>
    </section>
  `;
}

export function mount() {
  const swiperElement = document.querySelector('.testimonial-swiper');
  
  const swiper = new Swiper('.testimonial-swiper', {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    navigation: {
      nextEl: '.testimonial-next',
      prevEl: '.testimonial-prev'
    },
    breakpoints: {
      1024: {
        slidesPerView: 2,
        spaceBetween: 24
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 24
      }
    }
  });

  // Add cursor feedback
  swiperElement.addEventListener('pointerdown', () => {
    swiperElement.style.cursor = 'grabbing';
  });
  
  swiperElement.addEventListener('pointerup', () => {
    swiperElement.style.cursor = 'grab';
  });

  return () => {
    swiper.destroy();
  };
}
