import { NavLink, useLocation } from "react-router-dom";
import SideHeaderLink from "./SideHeaderLink";
import { useEffect, useState } from "react";
import logo from "../../images/logo.webp";
import searchIcon from "../../images/search-01.webp";
import darkModeIcon from "../../images/lightMood.webp";
import languageImage from "../../images/language-circle.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import HeaderLink from "./HeaderLink";

// --- START: إضافة كود الترجمة ---
import { useTranslation } from "../contexts/TranslationContext"; // 1. استيراد useTranslation
// --- END: إضافة كود الترجمة ---

const Navbar = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const location = useLocation();
  //edittttt
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // --- START: استخدام useTranslation و دوال مساعدة للغة ---
  const { t, locale, changeLanguage } = useTranslation(); // 2. استخدام الـ Hook

  // دوال مساعدة لعرض اسم اللغة الكامل واختصارها:
  const getLanguageFullName = (langCode) => {
    switch (langCode) {
      case "en":
        return "English";
      case "fr":
        return "Français";
      case "ru":
        return "Russian";
      default:
        return "English"; // قيمة افتراضية في حال عدم التعرف على كود اللغة
    }
  };

  const getLanguageAbbreviation = (langCode) => {
    return langCode.toUpperCase();
  };

  // دالة لمعالجة تغيير اللغة عند الضغط على عنصر القائمة:
  const handleLanguageChange = (newLocale) => {
    changeLanguage(newLocale);
    // لا تحتاج لتغيير الـ DOM (مثل textContent) يدويًا هنا،
    // لأن React سيتولى تحديث الواجهة تلقائيًا بناءً على حالة الـ 'locale'.
  };
  // --- END: استخدام useTranslation و دوال مساعدة للغة ---

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }); // لا أضف isDark كـ dependency هنا للحفاظ على الكود الأصلي

  useEffect(() => {
    // ------ Side Menu ------
    const offcanvasElement = document.getElementById("offcanvasMenu");
    // تأكد من أن window.bootstrap متاح عالمياً قبل استخدامه
    if (offcanvasElement && typeof window.bootstrap !== "undefined" && window.bootstrap.Offcanvas) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);

      const handleNavLinkClick = (link) => {
        if (!link.hasAttribute("data-bs-toggle")) {
          const handleClick = () => {
            bsOffcanvas.hide();
          };
          link.addEventListener("click", handleClick);
          return () => link.removeEventListener("click", handleClick);
        }
        return () => {}; // return an empty cleanup function if no listener is added
      };

      const cleanupFunctions = [];
      offcanvasElement.querySelectorAll("a.nav-link").forEach((link) => {
        cleanupFunctions.push(handleNavLinkClick(link));
      });
      // Cleanup for offcanvas nav links
      return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
      };
    }
  }, [t]); // تم إضافة t هنا

  // ------ Search Functionality ------
  useEffect(() => {
    const searchTrigger = document.querySelector(".search-container .btn");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.querySelector(".search-input");
    const searchResults = document.getElementById("searchResults");
    const searchForm = document.querySelector(".search-form");

    const products = [
      {
        id: 1,
        title: "فراولة مجمدة",
        description: "فراولة مجمدة طازجة، متوفرة على مدار السنة",
        category: "فواكه مجمدة",
        url: "/products#frozen-strawberry",
      },
      {
        id: 2,
        title: "مانجو مجمدة",
        description: "مانجو مجمدة عالية الجودة",
        category: "فواكه مجمدة",
        url: "/products#frozen-mango",
      },
      {
        id: 3,
        title: "بسلة مجمدة",
        description: "بسلة خضراء مجمدة",
        category: "خضروات مجمدة",
        url: "/products#frozen-peas",
      },
      {
        id: 4,
        title: "بطاطس مجمدة",
        description: "بطاطس مقلية مجمدة جاهزة للتحضير",
        category: "خضروات مجمدة",
        url: "/products#frozen-potatoes",
      },
      {
        id: 5,
        title: "برتقال طازج",
        description: "برتقال طازج وعصيري",
        category: "فواكه طازجة",
        url: "/products#fresh-orange",
      },
      {
        id: 6,
        title: "طماطم طازجة",
        description: "طماطم حمراء طازجة",
        category: "خضروات طازجة",
        url: "/products#fresh-tomatoes",
      },
      {
        id: 7,
        title: "ليمون",
        description: "ليمون حامض ومفيد",
        category: "حمضيات",
        url: "/products#lemon",
      },
      {
        id: 8,
        title: "كمون",
        description: "توابل الكمون الطبيعية",
        category: "توابل وأعشاب",
        url: "/products#cumin",
      },
      {
        id: 9,
        title: "مخلل خيار",
        description: "مخلل خيار شهي",
        category: "مخللات",
        url: "/products#pickled-cucumber",
      },
      {
        id: 10,
        title: "زيتون",
        description: "زيتون أسود وأخضر",
        category: "أخرى",
        url: "/products#olives",
      },
      // ... (باقي المنتجات كما في الكود الأصلي)
    ];

    const searchTriggerHandler = function () {
      if (searchOverlay) searchOverlay.classList.add("active");
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 300);
    };
    if (searchTrigger) searchTrigger.addEventListener("click", searchTriggerHandler);

    const closeSearchHandler = function () {
      if (searchOverlay) searchOverlay.classList.remove("active");
    };
    if (closeSearch) closeSearch.addEventListener("click", closeSearchHandler);

    const keydownHandler = function (e) {
      if (e.key === "Escape" && searchOverlay && searchOverlay.classList.contains("active")) {
        searchOverlay.classList.remove("active");
      }
    };
    document.addEventListener("keydown", keydownHandler);

    const searchOverlayClickHandler = function (e) {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove("active");
      }
    };
    if (searchOverlay) searchOverlay.addEventListener("click", searchOverlayClickHandler);

    function performSearch(query) {
      if (searchResults) searchResults.innerHTML = "";
      if (!query.trim()) return;

      const searchTerm = query.trim().toLowerCase();
      const results = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );

      if (results.length === 0) {
        // --- START: إضافة ترجمة لرسالة عدم وجود نتائج ---
        if (searchResults) {
          searchResults.innerHTML = `
            <div class="no-results">
              <p>${t("no_results_for", `No results found for ${query}`)}</p>
            </div>
          `;
        }
        return;
      }

      results.forEach((product) => {
        const highlightedTitle = highlightText(product.title, searchTerm);
        const highlightedDesc = highlightText(product.description, searchTerm);

        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        resultItem.innerHTML = `
          <a href="${product.url}">
            <span class="result-category">${product.category}</span>
            <div class="title">${highlightedTitle}</div>
            <div class="description">${highlightedDesc}</div>
          </a>
        `;
        if (searchResults) searchResults.appendChild(resultItem);
      });
    }

    function highlightText(text, searchTerm) {
      if (!searchTerm) return text;
      const regex = new RegExp(`(${searchTerm})`, "gi");
      return text.replace(regex, '<span class="highlight">$1</span>');
    }

    const searchInputHandler = function () {
      performSearch(this.value);
    };
    if (searchInput) searchInput.addEventListener("input", searchInputHandler);

    const searchFormSubmitHandler = function (e) {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      performSearch(searchTerm);
    };
    if (searchForm) searchForm.addEventListener("submit", searchFormSubmitHandler);
    //----------------------------------------------
    // ------ Nav Dropend (Submenu Toggle) ------
    const dropendItems = document.querySelectorAll(".dropend .has-submenu");
    const dropendClickHandler = function (event) {
      event.stopPropagation();

      const currentDropend = this.closest(".dropend");
      const submenu = currentDropend.querySelector(".dropdown-submenu");

      document.querySelectorAll(".dropend.show").forEach((dropend) => {
        if (dropend !== currentDropend) {
          dropend.classList.remove("show");
          if (dropend.querySelector(".dropdown-submenu")) {
            dropend.querySelector(".dropdown-submenu").style.display = "none";
          }
        }
      });

      currentDropend.classList.toggle("show");
      if (submenu) {
        submenu.style.display = currentDropend.classList.contains("show") ? "block" : "none";
      }
    };
    dropendItems.forEach((item) => {
      item.addEventListener("click", dropendClickHandler);
    });

    const documentClickHandler = function (event) {
      if (!event.target.closest(".dropend")) {
        document.querySelectorAll(".dropend.show").forEach((dropend) => {
          dropend.classList.remove("show");
          if (dropend.querySelector(".dropdown-submenu")) {
            dropend.querySelector(".dropdown-submenu").style.display = "none";
          }
        });
      }
    };
    document.addEventListener("click", documentClickHandler);
    // Cleanup event listeners on component unmount
    return () => {
      if (searchTrigger) searchTrigger.removeEventListener("click", searchTriggerHandler);
      if (closeSearch) closeSearch.removeEventListener("click", closeSearchHandler);
      document.removeEventListener("keydown", keydownHandler);
      if (searchOverlay) searchOverlay.removeEventListener("click", searchOverlayClickHandler);
      if (searchInput) searchInput.removeEventListener("input", searchInputHandler);
      if (searchForm) searchForm.removeEventListener("submit", searchFormSubmitHandler);

      dropendItems.forEach((item) => {
        item.removeEventListener("click", dropendClickHandler);
      });
      document.removeEventListener("click", documentClickHandler);
    };
  }, [t]);

  // دالة للتحقق مما إذا كان المسار الحالي ضمن فئة المنتجات للـ Header الرئيسي
  const isMainProductsActive = () => {
    return location.pathname.startsWith("/products");
  };

  // دالة للتحقق مما إذا كان الرابط الحالي نشطًا في السايد بار
  const isSideLinkActive = (path) => {
    // استخدم location.pathname للمقارنة بالمسار الكامل (بدون الـ hash)
    // أو location.hash إذا كنت تريد المطابقة الدقيقة للـ hash
    // بما أن الروابط في السايد بار تستخدم #، سنستخدم location.hash
    // const fullPath = "/products" + path; // قم بإنشاء المسار الكامل المتوقع
    return location.pathname === "/products" && location.hash === path;
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light sticky-top"
      style={{
        backgroundColor: "var(--white-color)",
        color: "var(--heading-color)",
      }}
    >
      <div className="container flex-nowrap">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="ahlam-logo" width="94" height="63" />
        </NavLink>

        {/* Navigation NavLinks - Left Side */}

        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <HeaderLink path={"/"} content={t("home", "Home")} />
          </li>
          <li className="nav-item dropdown">
            <NavLink
              className={({ isActive }) =>
                `nav-link dropdown-toggle d-flex align-items-center ${isActive ? "active" : ""}`
              }
              to="/products"
              id="productsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              end
            >
              {t("products", "Products")}
              <FontAwesomeIcon
                icon={faAngleDown}
                style={{
                  marginLeft: "10px",
                }}
              />
            </NavLink>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "var(--bg-color)", width: "200px" }}
            >
              {/* Frozen */}
              <li className="dropend">
                <Link className="dropdown-item has-submenu" to="#" data-bs-toggle="dropdown">
                  {t("frozen", "Frozen")}
                </Link>
                <ul
                  className="dropdown-menu dropdown-submenu"
                  style={{ backgroundColor: "var(--bg-color)" }}
                >
                  <li>
                    <Link className="dropdown-item" to="/products#frozen-fruits">
                      {t("fruits", "Fruits")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/products#frozen-vegetables">
                      {t("vegetables", "Vegetables")}
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Fresh */}
              <li className="dropend">
                <Link className="dropdown-item has-submenu" to="#" data-bs-toggle="dropdown">
                  {t("fresh", "Fresh")}
                </Link>
                <ul
                  className="dropdown-menu dropdown-submenu"
                  style={{ backgroundColor: "var(--bg-color)" }}
                >
                  <li>
                    <Link className="dropdown-item" to="/products#fresh-fruits">
                      {t("fruits", "Fruits")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/products#fresh-vegetables">
                      {t("vegetables", "Vegetables")}
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Others */}
              <li>
                <Link className="dropdown-item" to="/products#citrus">
                  {t("citrus", "Citrus")}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/products#spices">
                  {t("spices_herbs", "Spices & Herbs")}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/products#pickles">
                  {t("pickles", "Pickles")}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/products#others">
                  {t("others_category", "Others")}
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <HeaderLink path="/faqs" content={t("faqs", "FAQs")} />
          </li>
          <li className="nav-item">
            <HeaderLink path="/contact-us" content={t("contact_us", "Contact us")} />
          </li>
        </ul>

        <div className="d-flex align-items-center">
          {/* Search button */}
          <div className="search-container" id="searchTrigger">
            <button className="btn">
              <img width="24" height="24" src={searchIcon} alt="search-icon" />
            </button>
          </div>

          {/* Dark Mode */}
          <button
            onClick={() => setIsDark((prev) => !prev)}
            className={`dark-mode ${isDark && " "}`}
          >
            {isDark ? (
              <FontAwesomeIcon icon={faMoon} />
            ) : (
              <img width={25} height={24} src={darkModeIcon} alt="dark-mode-icon" />
            )}
          </button>

          {/* Language switcher dropdown */}
          {/* --- START: تعديل هذا الجزء للتعامل مع الترجمة --- */}
          <div className="dropdown lang-dropdown">
            <button
              className="language-container btn dropdown-toggle d-flex align-items-center"
              type="button"
              id="langDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                color: "black",
                height: "43px",
              }}
            >
              <span>
                <img width="20" height="20" src={languageImage} alt="language-icon" />
              </span>
              <span className="ms-2" id="selectedLang" style={{ color: "var(--heading-color)" }}>
                {getLanguageAbbreviation(locale)} {""}
                {/* عرض اختصار اللغة الحالية */}
              </span>
              <FontAwesomeIcon
                icon={faAngleDown}
                style={{
                  color: "var(--heading-color)",
                  marginLeft: "10px",
                }}
              />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="langDropdown"
              style={{ backgroundColor: "var(--bg-color)" }}
            >
              <li>
                <button
                  className="dropdown-item"
                  style={{ border: "none" }}
                  onClick={() => handleLanguageChange("en")}
                >
                  {getLanguageFullName("en")} {/* عرض الاسم الكامل للغة */}
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  style={{ border: "none" }}
                  onClick={() => handleLanguageChange("fr")}
                >
                  {getLanguageFullName("fr")}
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  style={{ border: "none" }}
                  onClick={() => handleLanguageChange("ru")}
                >
                  {getLanguageFullName("ru")}
                </button>
              </li>
            </ul>
          </div>
          {/* --- END: تعديل هذا الجزء --- */}

          {/* Mobile toggle button */}
          <button
            className="navbar-toggler ms-2 side-btn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            style={{
              color: "var(--heading-color)",
              height: "43px",
              border: "none",
            }}
          >
            <FontAwesomeIcon icon={faBars} />
            <span className="visually-hidden">Toggle navigation</span>
          </button>
        </div>

        {/* Mobile (right Menu) */}
        <div
          className="offcanvas side-menu offcanvas-end"
          tabIndex="-1"
          id="offcanvasMenu"
          aria-labelledby="offcanvasMenuLabel"
          style={{ backgroundColor: "var(--bg-color)" }}
        >
          <div className="offcanvas-header">
            <NavLink className="offcanvas-title nav-link" id="offcanvasMenuLabel" to="/">
              <img width="90" height="60" src={logo} alt="logo" />
            </NavLink>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ color: "var(--heading-color)", fontSize: "25px" }}
              />
            </button>
          </div>
          <div className="offcanvas-body ps-5">
            <ul className="list-unstyled">
              <li className="nav-item">
                <SideHeaderLink path={"/"} content={t("home", "Home")} />
              </li>
              <li className="dropdown nav-item">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `nav-link dropdown-toggle d-flex gap-5 ${isActive || isMainProductsActive() ? "side-active" : ""}`
                  }
                  data-bs-toggle="collapse"
                  data-bs-target="#dropdown1"
                  aria-expanded="false"
                >
                  {t("products", "Products")}
                </NavLink>
                <ul className="collapse list-unstyled ps-5" id="dropdown1">
                  <li className="dropdown">
                    <Link
                      to="/products#frozen"
                      className={`dropdown-toggle d-flex gap-5 nav-link ${location.hash.startsWith("#frozen") ? "side-active" : ""}`} // طبق side-active
                      data-bs-toggle="collapse"
                      data-bs-target="#dropdown1-1"
                      aria-expanded="false"
                    >
                      {t("frozen", "Frozen")}
                    </Link>
                    <ul className="collapse list-unstyled ps-4" id="dropdown1-1">
                      <li>
                        <Link
                          className={`nav-link ${isSideLinkActive("#frozen-fruits") ? "side-active" : ""}`} // طبق side-active
                          to="/products#frozen-fruits"
                        >
                          {t("fruits", "Fruits")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`nav-link ${isSideLinkActive("#frozen-vegetables") ? "side-active" : ""}`} // طبق side-active
                          to="/products#frozen-vegetables"
                        >
                          {t("vegetables", "Vegetables")}
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="dropdown">
                    <Link
                      to="/products#fresh"
                      className={`dropdown-toggle d-flex gap-5 nav-link ${location.hash.startsWith("#fresh") ? "side-active" : ""}`} // طبق side-active
                      data-bs-toggle="collapse"
                      data-bs-target="#dropdown1-2"
                      aria-expanded="false"
                    >
                      {t("fresh", "Fresh")}
                    </Link>
                    <ul className="collapse list-unstyled ps-4" id="dropdown1-2">
                      <li>
                        <Link
                          className={`nav-link ${isSideLinkActive("#fresh-fruits") ? "side-active" : ""}`} // طبق side-active
                          to="/products#fresh-fruits"
                        >
                          {t("fruits", "Fruits")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`nav-link ${isSideLinkActive("#fresh-vegetables") ? "side-active" : ""}`} // طبق side-active
                          to="/products#fresh-vegetables"
                        >
                          {t("vegetables", "Vegetables")}
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link
                      className={`nav-link ${isSideLinkActive("#citrus") ? "side-active" : ""}`} // طبق side-active
                      to="/products#citrus"
                    >
                      {t("citrus", "Citrus")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`nav-link ${isSideLinkActive("#spices") ? "side-active" : ""}`} // طبق side-active
                      to="/products#spices"
                    >
                      {t("spices_herbs", "Spices & Herbs")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`nav-link ${isSideLinkActive("#pickles") ? "side-active" : ""}`} // طبق side-active
                      to="/products#pickles"
                    >
                      {t("pickles", "Pickles")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`nav-link ${isSideLinkActive("#others") ? "side-active" : ""}`} // طبق side-active
                      to="/products#others"
                    >
                      {t("others_category", "Others")}
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <SideHeaderLink path="/faqs" content={t("faqs", "FAQs")} />
              </li>
              <li className="nav-item">
                <SideHeaderLink path="/contact-us" content={t("contact_us", "Contact us")} />
              </li>
            </ul>
          </div>
        </div>

        {/* Search Overlay */}
        <div className="search-overlay" id="searchOverlay">
          <div className="search-box">
            <button className="close-search" id="closeSearch">
              ×
            </button>
            <form className="search-form d-flex position-relative">
              <input
                type="text"
                className="search-input"
                placeholder={t("what_are_you_looking_for", "What are you Looking For..?")}
                autoFocus
              />
              <button type="submit" className="search-btn">
                <img width={25} height={24} src={searchIcon} alt="search-icon" />
              </button>
            </form>
            <div id="searchResults" className="search-results"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
