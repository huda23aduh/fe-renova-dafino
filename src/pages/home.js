import Hero from "../components/sections/hero.js";
import Banner from "../components/sections/banner.js";
import Catalog, { mount as catalogMount } from "../components/sections/catalog.js";
import Testimonial, { mount as testimonialMount } from "../components/sections/testimonial.js";
import RatingSection, { mountRatingSection } from "../components/sections/rating.js";
import FAQSection, { mountFAQSection } from "../components/sections/faq.js";
import createBannerSlider from "../components/widgets/banner_slider.js";

export default function Home() {
  return `
    ${Hero()}
    ${Banner()}
    ${Catalog()}
    ${Testimonial()}
    ${RatingSection()}
    ${FAQSection()}
  `;
}

// mount dipanggil oleh router setelah HTML di-insert ke DOM
export function mount() {
  const container = document.getElementById("banner-slider");
  let bannerUnmount = null;
  
  if (container) {
    const slider = createBannerSlider(container);
    bannerUnmount = function unmount() {
      slider?.destroy?.();
    };
  }
  
  // Mount catalog infinite scroll
  const catalogUnmount = catalogMount();
  
  // Mount testimonial carousel
  const testimonialUnmount = testimonialMount();
  
  // Mount rating section
  const ratingUnmount = mountRatingSection();
  
  // Mount FAQ section
  const faqUnmount = mountFAQSection();
  
  // Return combined unmount function
  return function unmount() {
    bannerUnmount?.();
    catalogUnmount?.();
    testimonialUnmount?.();
    ratingUnmount?.();
    faqUnmount?.();
  };
}
