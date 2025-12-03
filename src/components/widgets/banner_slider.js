import { Swiper } from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function createBannerSlider(container) {
  if (!container) return { destroy: () => {} };

  const banners = [
    { image: "https://picsum.photos/id/10/1200/400" },
    { image: "https://picsum.photos/id/20/1200/400" },
    { image: "https://picsum.photos/id/30/1200/400" },
    { image: "https://picsum.photos/id/40/1200/400" },
    { image: "https://picsum.photos/id/50/1200/400" },
    { image: "https://picsum.photos/id/60/1200/400" },
    { image: "https://picsum.photos/id/70/1200/400" },
  ];

  const html = `
    <div class="relative w-full" id="bannerSwiper">
      <div class="swiper">
        <div class="swiper-wrapper">
          ${banners
            .map(
              (banner, idx) => `
              <div class="swiper-slide">
                <div class="w-full h-80 rounded-xl overflow-hidden shadow-xl bg-gray-200">
                  <img src="${banner.image}" class="w-full h-full object-cover" alt="Banner ${idx + 1}" />
                </div>
              </div>
            `
            )
            .join('')}
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const swiper = new Swiper('#bannerSwiper .swiper', {
    modules: [Navigation, Pagination, Autoplay],
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    speed: 500,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // RESPONSIVE
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 12 },
      480: { slidesPerView: 1.1, spaceBetween: 18 },
      640: { slidesPerView: 1.15, spaceBetween: 22 },
      768: { slidesPerView: 1.22, spaceBetween: 26 },
      900: { slidesPerView: 1.4, spaceBetween: 60 },
      1024: { slidesPerView: 1.4, spaceBetween: 60 },
      1280: { slidesPerView: 1.4, spaceBetween: 60 },
    },
  });

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    body, html { 
    overflow-x: 
    hidden; 
    }

    #bannerSwiper {
      width: 100%;
      padding: 20px 0;
      position: relative;
    }
    #bannerSwiper .swiper { 
    width: 100%; 
    overflow: visible; 
    }

    .swiper-wrapper {
      align-items: center;
      overflow: visible !important;
    }


    #bannerSwiper .swiper-slide {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    /* limit only for tablet */
    @media (max-width: 1023px) {
      #bannerSwiper .swiper-slide {
        max-width: 700px;
      }
    }

    /* phone */
    @media (max-width: 767px) {
      #bannerSwiper .swiper-slide {
        max-width: 100%;
      }
    }

    /* pagination dots */
    .swiper-pagination {
      position: static;
      margin-top: 24px;
      display: flex;
      justify-content: center;
      gap: 12px;
    }
    .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      background: #a9a9a9a9;
      opacity: 1;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 0 !important;
    }
    .swiper-pagination-bullet-active {
      background: #14213D;
      width: 32px;
      border-radius: 6px;
    }

    /* Responsive banner height */
    #bannerSwiper .swiper-slide .h-80 { height: 180px; }
    @media (min-width: 480px) { #bannerSwiper .swiper-slide .h-80 { height: 220px; } }
    @media (min-width: 768px) { #bannerSwiper .swiper-slide .h-80 { height: 280px; } }
    @media (min-width: 1024px) { #bannerSwiper .swiper-slide .h-80 { height: 320px; } }
    @media (min-width: 1280px) { #bannerSwiper .swiper-slide .h-80 { height: 360px; } }
  `;
  document.head.appendChild(style);

  return {
    destroy() {
      if (swiper) swiper.destroy(true, true);
      if (container) container.innerHTML = "";
      style.remove();
    },
  };
}
