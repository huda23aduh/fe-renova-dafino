import HomePage, { mount as homeMount } from "./pages/home.js";
import BrandPage, { mount as brandMount } from "./pages/brand.js";
import BrandCatalogPage, { mount as brandCatalogMount } from "./pages/brand-catalog.js";
import BrandCatalogAdminPage, { mount as brandCatalogAdminMount } from "./pages/brand-catalog-admin.js";
import CarDetailPage, { mount as carDetailMount } from "./pages/car-detail.js";
import NewsPage, { mount as newsMount } from "./pages/news.js";
import ContactPage, { mount as contactMount } from "./pages/contact.js";
import ContactAdminPage, { mount as contactAdminMount } from "./pages/contact-admin.js";
import LoginPage from "./pages/login.js";
import RegisterPage from "./pages/register.js";
import ForgotPasswordPage from "./pages/forgot-password.js";
import MitraLoginPage from "./pages/mitra-login.js";
import MitraRegisterPage from "./pages/mitra-register.js";
import AdminBrandPage, { mountAdminBrandPage } from "./pages/admin-brand.js";

let currentUnmount = null;

const protectedPages = [
  "home",
  "brand-catalog-admin",
  "contact-admin",
  "dashboard",
  "admin",              // future
];

export default function router() {
  const page = window.location.hash.replace("#", "") || "home";

  const token = localStorage.getItem("token");

  // 🚨 If route is protected & user not logged in → redirect to login
  if (protectedPages.includes(page) && !token) {
    window.location.hash = "#login";
    return;
  }

  // 🚨 If already logged in, prevent access to login/register
  const authPages = ["login", "register", "forgot-password", "mitra-login", "mitra-register"];
  if (authPages.includes(page) && token) {
    window.location.hash = "#home"; // or "#dashboard"
    return;
  }

  const content = document.getElementById("page-content");

  // call previous page cleanup (stop sliders, remove intervals, etc.)
  try {
    if (typeof currentUnmount === "function") currentUnmount();
  } catch (e) {
    console.error("Unmount error:", e);
  }

  const routes = {
    home: { view: HomePage, mount: homeMount },
    brand: { view: BrandPage, mount: brandMount },
    "brand-catalog": { view: BrandCatalogPage, mount: brandCatalogMount },
    "brand-catalog-admin": { view: BrandCatalogAdminPage, mount: brandCatalogAdminMount },
    "car-detail": { view: CarDetailPage, mount: carDetailMount },
    news: { view: NewsPage, mount: newsMount },
    contact: { view: ContactPage, mount: contactMount },
    "contact-admin": { view: ContactAdminPage, mount: contactAdminMount },
    "login": { view: LoginPage },
    "register": { view: RegisterPage },
    "forgot-password": { view: ForgotPasswordPage },
    "mitra-login": { view: MitraLoginPage },
    "mitra-register": { view: MitraRegisterPage },
    "admin-brand": { view: AdminBrandPage, mount: mountAdminBrandPage },
  };

  const route = routes[page] || routes.home;

  content.innerHTML = route.view();

  // call mount (if provided) to initialize page scripts; mount should return cleanup fn
  try {
    if (typeof route.mount === "function") {
      const maybeUnmount = route.mount();
      if (typeof maybeUnmount === "function") {
        currentUnmount = maybeUnmount;
      } else {
        currentUnmount = null;
      }
    } else {
      currentUnmount = null;
    }
  } catch (e) {
    // Silent fail on mount errors
    currentUnmount = null;
  }
}

// detect change
window.addEventListener("hashchange", router);
