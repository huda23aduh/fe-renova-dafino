import { faqData } from "../../data/mockData.js";

export default function FAQSection() {
  return `
    <section class="bg-white px-4 md:px-8 py-12 md:py-16">
      <div class="max-w-7xl mx-auto">
        
        <div class="border-t-2 border-gray-400 pt-12 mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-center text-[#14213D] mb-3">FAQ Seputar Renova</h2>
          <p class="text-center text-gray-600 text-sm md:text-base">Temukan jawaban atas pertanyaan umum Anda tentang Renova</p>
        </div>

        <div id="accordion" class="max-w-7xl mx-auto">
          ${faqData
            .map(
              (item) => `
              <div class="accordion-item border-b-2 border-gray-300" data-id="${item.id}">
                <div class="py-4 md:py-6 px-4 md:px-6 cursor-pointer accordion-trigger flex justify-between items-start gap-4 hover:bg-transparent transition-colors bg-transparent">
                  <span class="text-base md:text-lg font-semibold text-[#14213D] flex-1">${item.question}</span>
                  <svg class="chevron w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 text-black shrink-0 mt-1" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2.5">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>

                <div class="accordion-content max-h-0 overflow-hidden transition-all duration-300">
                  <div class="px-4 md:px-6 py-4 md:py-6 bg-transparent text-gray-700 text-sm md:text-base leading-relaxed">
                    ${item.answer}
                  </div>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

export function mountFAQSection() {
  const items = document.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const content = item.querySelector(".accordion-content");
    const chevron = item.querySelector(".chevron");

    trigger.addEventListener("click", () => {
      const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

      // Close all first (single mode)
      items.forEach((i) => {
        i.querySelector(".accordion-content").style.maxHeight = null;
        i.querySelector(".chevron").style.transform = "rotate(0deg)";
      });

      // Toggle current item
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        chevron.style.transform = "rotate(180deg)";
      }
    });
  });
}
