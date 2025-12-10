import HomePage, { mount as homeMount } from "./pages/home.js";
import BrandPage, { mount as brandMount } from "./pages/brand.js";
import BrandCatalogPage, { mount as brandCatalogMount } from "./pages/brand-catalog.js";
import BrandCatalogAdminPage, { mount as brandCatalogAdminMount } from "./pages/brand-catalog-admin.js";
import CarDetailPage, { mount as carDetailMount } from "./pages/car-detail.js";
import NewsPage, { mount as newsMount } from "./pages/news.js";
import ContactPage, { mount as contactMount } from "./pages/contact.js";
import ContactAdminPage, { mount as contactAdminMount } from "./pages/contact-admin.js";
import LoginPage, { mount as loginMount } from "./pages/login.js";
import RegisterPage, { mount as registerMount } from "./pages/register.js";
import ForgotPasswordPage from "./pages/forgot-password.js";
import MitraLoginPage from "./pages/mitra-login.js";
import MitraRegisterPage from "./pages/mitra-register.js";
import TestDrivePage, { mount as testDriveMount } from "./pages/test-drive.js";
import AdminDashboardPage, { mount as adminDashboardMount } from "./pages/admin-dashboard.js";
import AdminLoginPage, { mount as adminLoginMount } from "./pages/admin-login.js";
import AdminUsersPage, { mount as adminUsersMount } from "./pages/admin-users.js";
import AdminTestDrivePage, { mount as adminTestDriveMount } from "./pages/admin-testdrive.js";
import AdminChangePasswordPage, { mount as adminChangePasswordMount } from "./pages/admin-change-password.js";

let currentUnmount = null;

export default function router() {
  const page = window.location.hash.replace("#", "") || "home";

  const content = document.getElementById("page-content");

  // call previous page cleanup (stop sliders, remove intervals, etc.)
  try {
    if (typeof currentUnmount === "function") currentUnmount();
  } catch (e) {
    // Silent fail on unmount errors
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
    "login": { view: LoginPage, mount: loginMount },
    "register": { view: RegisterPage, mount: registerMount },
    "forgot-password": { view: ForgotPasswordPage },
    "mitra-login": { view: MitraLoginPage },
    "mitra-register": { view: MitraRegisterPage },
    "test-drive": { view: TestDrivePage, mount: testDriveMount },
    "admin-dashboard": { view: AdminDashboardPage, mount: adminDashboardMount },
    "admin-login": { view: AdminLoginPage, mount: adminLoginMount },
    "admin-users": { view: AdminUsersPage, mount: adminUsersMount },
    "admin-testdrive": { view: AdminTestDrivePage, mount: adminTestDriveMount },
    "admin-change-password": { view: AdminChangePasswordPage, mount: adminChangePasswordMount },
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
