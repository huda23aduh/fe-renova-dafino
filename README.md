# fe-Car

## Fitur

- Tampilan Responsif: Desain mobile-first yang bekerja di semua ukuran layar
- Komponen Interaktif: Rating system, FAQ accordion, carousel testimonial
- Manajemen State: Global authentication state management
- Dynamic Pages: Home, Brand, News, Contact page dengan data dinamis
- Modern UI: Tailwind CSS dengan custom color palette
- Icon Library: FontAwesome icons untuk UI yang lebih baik

## Teknologi yang Digunakan

- Frontend Framework: Vanilla JavaScript ES6 Modules
- CSS Framework: Tailwind CSS 4.1
- Build Tool: Vite 5.4
- UI Icons: FontAwesome Free 7.1
- Carousel: Swiper 11.0

## Instalasi

### Prerequisites
- Node.js (v16 atau lebih tinggi)
- npm atau yarn package manager

### Langkah-langkah Instalasi

1. Clone Repository
   ```bash
   git clone https://github.com/asgarindoo/fe-rentCar.git
   cd fe-rentCar
   ```

2. Install Dependencies
   ```bash
   npm install
   ```

3. Jalankan Development Server
   ```bash
   npm run dev
   ```
   Aplikasi akan terbuka di `http://localhost:5173`

4. Build untuk Production
   ```bash
   npm run build
   ```

5. Preview Production Build
   ```bash
   npm run preview
   ```

## Struktur Folder

```
fe-rentCar/
├── public/              # Static assets (images, logo)
├── src/
│   ├── components/      # Reusable components
│   │   └── sections/    # Page sections (navbar, hero, banner, etc)
│   │   └── widgets/     # UI widgets (carousel, sliders)
│   ├── pages/          # Page components (home, news, contact)
│   ├── data/           # Mock data dan constants
│   ├── main.js         # App initialization
│   └── router.js       # Hash-based routing
├── global.css          # Global styles
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
├── package.json        # Project dependencies
└── README.md          # Documentation
```

## Palet Warna

- Primary: `#14213D` (Dark Blue Navy)
- Secondary: `#FFB703` (Orange/Yellow)
- Text: Gray scale (800-600)
- Background: White cards dengan shadow

## Halaman Utama

### 1. Home Page (`/`)
- Hero section dengan CTA
- Product banner carousel
- Product catalog grid
- Testimonials carousel
- Rating system
- FAQ accordion
- Footer dengan wave decoration

### 2. News Page (`/#/news`)
- Rekomendasi Section (4 column grid)
- Berita TerUpdate (2 column featured)
- News Feed (2 column with thumbnails)

### 3. Contact Page (`/#/contact`)
- Top cards (3 columns): Q&A, Chat, Partnership
- Bottom cards (1:2 layout): Showroom, Customer Service
- Wave overlay background

### 4. Brand Page (`/#/brand`)
- Status: Under Development

## Development Tips

### Menambah Komponen Baru
1. Buat file di `src/components/`
2. Export default function yang return HTML string
3. Import dan mount di page yang sesuai

### Menambah Page Baru
1. Buat file di `src/pages/`
2. Implementasikan routing di `router.js`
3. Update navigation di navbar

### Menambah Data
1. Tambahkan data di `src/data/mockData.js`
2. Import di component yang butuh
3. Render dengan template literals

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)