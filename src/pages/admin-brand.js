export default function AdminBrandPage() {
  return `
    <section class="min-h-screen pt-28 px-6 md:px-20 bg-gray-50">
      <h1 class="text-3xl font-bold mb-6">Brand Management</h1>

      <!-- Add Brand Form -->
      <div class="bg-white p-6 rounded-xl shadow mb-8">
        <h2 class="text-xl font-semibold mb-4">Add New Brand</h2>
        <div class="flex gap-4 items-center">
          <input 
            id="brandNameInput"
            type="text" 
            placeholder="Brand name..." 
            class="border px-3 py-2 rounded w-full"
          />
          <button 
            id="addBrandBtn"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      <!-- Brand Table -->
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-xl font-semibold mb-4">Brand List</h2>

        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b bg-gray-100 text-left">
              <th class="p-2">#</th>
              <th class="p-2">Brand Name</th>
              <th class="p-2 w-40">Actions</th>
            </tr>
          </thead>
          <tbody id="brandTableBody"></tbody>
        </table>
      </div>
    </section>
  `;
}

export function mountAdminBrandPage() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Unauthorized. Please login first.");
    window.location.hash = "#login";
    return;
  }

  const API_URL = "http://localhost:5001";

  const brandTableBody = document.getElementById("brandTableBody");
  const brandNameInput = document.getElementById("brandNameInput");
  const addBrandBtn = document.getElementById("addBrandBtn");

  // ============================
  // LOAD BRAND LIST
  // ============================
  async function loadBrands() {
    brandTableBody.innerHTML = `<tr><td colspan="3" class="p-4 text-center">Loading...</td></tr>`;

    try {
      const res = await fetch(`${API_URL}/brands`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      brandTableBody.innerHTML = "";

      data.forEach((brand, i) => {
        const row = document.createElement("tr");
        row.classList.add("border-b");

        row.innerHTML = `
          <td class="p-2">${i + 1}</td>
          <td class="p-2">
            <input 
              type="text" 
              value="${brand.name}" 
              class="brand-name-input border px-2 py-1 rounded w-full"
              data-id="${brand.id}"
            />
          </td>
          <td class="p-2 flex gap-2">
            <button 
              class="saveBrandBtn bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              data-id="${brand.id}"
            >Save</button>
            <button 
              class="deleteBrandBtn bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              data-id="${brand.id}"
            >Delete</button>
          </td>
        `;

        brandTableBody.appendChild(row);
      });
    } catch (err) {
      brandTableBody.innerHTML = `<tr><td colspan="3" class="p-4 text-center text-red-600">Failed to load brand data</td></tr>`;
    }
  }

  loadBrands();

  // ============================
  // ADD NEW BRAND
  // ============================
  addBrandBtn.addEventListener("click", async () => {
    const name = brandNameInput.value.trim();
    if (!name) return alert("Brand name cannot be empty");

    const res = await fetch(`${API_URL}/brands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    if (res.ok) {
      brandNameInput.value = "";
      loadBrands();
    } else {
      alert("Failed to add brand");
    }
  });

  // ============================
  // SAVE BRAND (EDIT)
  // ============================
  document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("saveBrandBtn")) return;

    const id = e.target.dataset.id;
    const input = document.querySelector(`input.brand-name-input[data-id="${id}"]`);
    const name = input.value.trim();

    const res = await fetch(`${API_URL}/brands/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    if (res.ok) {
      alert("Brand updated");
      loadBrands();
    } else {
      alert("Failed to update brand");
    }
  });

  // ============================
  // DELETE BRAND (SOFT DELETE)
  // ============================
  document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("deleteBrandBtn")) return;

    if (!confirm("Are you sure want to delete this brand?")) return;

    const id = e.target.dataset.id;

    const res = await fetch(`${API_URL}/brands/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      loadBrands();
    } else {
      alert("Failed to delete brand");
    }
  });
}
