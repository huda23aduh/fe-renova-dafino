export default function Brand() {
  return `
    <section id="brand-page" class="text-white min-h-screen flex items-center justify-center">
      <p class="text-xl font-bold">Loading brands...</p>
    </section>
  `;
}

export async function mount() {
  const page = document.querySelector("#brand-page");
  page.innerHTML = `<p class="text-xl">Loading...</p>`;

  try {
    // 🔥 Fetch real brands from backend API
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5001/brands", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const brands = await res.json();

    if (!Array.isArray(brands) || brands.length === 0) {
      page.innerHTML = `<p class="text-red-500">No brand data found.</p>`;
      return;
    }

    // Convert API data → UI component format
    // Add image path for each brand
    const brandsData = brands.map(b => ({
      ...b,
      image: `/images/${b.name.toLowerCase()}.png`
    }));

    // --- Build stats: default 0 since your API only gives brand names ---
    const brandCarsCount = {};
    const brandCarTypes = {};

    brandsData.forEach(b => {
      brandCarsCount[b.name] = 0;
      brandCarTypes[b.name] = {
        SUV: 0,
        Sedan: 0,
        MPV: 0,
        Sport: 0,
        Hybrid: 0
      };
    });

    // Select first brand
    const defaultBrand = brandsData[0].name;

    // Replace HTML
    page.innerHTML = `
      <div class="w-full px-6 py-10">
        <h1 id="brandTitle" class="text-5xl font-black text-center mb-6">
          ${defaultBrand}
        </h1>

        <div class="flex justify-center mb-6">
          <img id="brandImage" 
               src="/images/${defaultBrand.toLowerCase()}_car.png" 
               class="h-48 object-contain" />
        </div>

        <div class="flex gap-4 justify-center flex-wrap mb-10">
          ${brandsData.map(b => `
            <button class="brand-btn px-4 py-2 rounded bg-yellow-500 text-black font-bold"
                    data-brand="${b.name}">
              ${b.name}
            </button>
          `).join("")}
        </div>

        <div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div class="p-4 bg-blue-900 rounded text-center">
            <p class="text-3xl font-bold" id="statTotalCars">${brandCarsCount[defaultBrand]}</p>
            <p class="text-sm font-semibold">TOTAL MOBIL</p>
          </div>

          <div class="p-4 bg-blue-900 rounded text-center">
            <p class="text-3xl font-bold" id="statSUV">${brandCarTypes[defaultBrand].SUV}</p>
            <p class="text-sm font-semibold">SUV</p>
          </div>

          <div class="p-4 bg-blue-900 rounded text-center">
            <p class="text-3xl font-bold" id="statSedan">${brandCarTypes[defaultBrand].Sedan}</p>
            <p class="text-sm font-semibold">SEDAN</p>
          </div>

          <div class="p-4 bg-blue-900 rounded text-center">
            <p class="text-3xl font-bold" id="statMPV">${brandCarTypes[defaultBrand].MPV}</p>
            <p class="text-sm font-semibold">MPV</p>
          </div>

          <div class="p-4 bg-blue-900 rounded text-center">
            <p class="text-3xl font-bold" id="statSport">${brandCarTypes[defaultBrand].Sport}</p>
            <p class="text-sm font-semibold">SPORT</p>
          </div>

          <div class="p-4 bg-blue-900 rounded text-center">
            <p class="text-3xl font-bold" id="statHybrid">${brandCarTypes[defaultBrand].Hybrid}</p>
            <p class="text-sm font-semibold">HYBRID</p>
          </div>
        </div>
      </div>
    `;

    // 🔥 Add click listeners after rendering
    document.querySelectorAll(".brand-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const brand = btn.dataset.brand;

        // Update UI
        document.querySelector("#brandTitle").textContent = brand;
        document.querySelector("#brandImage").src =
          `/images/${brand.toLowerCase()}_car.png`;

        document.querySelector("#statTotalCars").textContent =
          brandCarsCount[brand];
        document.querySelector("#statSUV").textContent =
          brandCarTypes[brand].SUV;
        document.querySelector("#statSedan").textContent =
          brandCarTypes[brand].Sedan;
        document.querySelector("#statMPV").textContent =
          brandCarTypes[brand].MPV;
        document.querySelector("#statSport").textContent =
          brandCarTypes[brand].Sport;
        document.querySelector("#statHybrid").textContent =
          brandCarTypes[brand].Hybrid;
      });
    });

  } catch (err) {
    page.innerHTML = `
      <p class="text-red-400 font-bold">Failed to load brands:</p>
      <pre class="bg-black/40 p-3 rounded mt-2">${err.message}</pre>
    `;
  }
}
