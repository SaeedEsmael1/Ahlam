import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ournum from "../../../images/our-num.webp";
import { Link } from "react-router-dom";

// --- START: إضافة كود الترجمة ---
import { useTranslation } from "../../contexts/TranslationContext"; // 1. استيراد useTranslation
// --- END: إضافة كود الترجمة ---

export const OurNumbersSection = () => {
  // --- START: استخدام useTranslation Hook ---
  const { t } = useTranslation(); // 2. استخدام الـ Hook للحصول على دالة الترجمة t()
  // --- END: استخدام useTranslation Hook ---

  return (
    <section className="our-number text-center text-md-start py-5 position-relative">
      <img
        className="our-icon trend-icon position-absolute"
        width="200"
        height="200"
        src={ournum}
        alt="our-num"
        loading="lazy"
      />
      <div className="container">
        <div className="row justify-content-between py-3">
          <div className="desc mb-5 col-md-6" data-aos="fade-right">
            <h1 className="home-heading">
              {/* --- START: ترجمة العنوان الرئيسي --- */}
              {t("our_numbers_heading", "Our results in numbers")}
              {/* --- END: ترجمة العنوان الرئيسي --- */}
            </h1>
            <p className="my-4 home-description mb-5">
              {/* --- START: ترجمة الوصف --- */}
              {t(
                "our_numbers_description",
                "At AHLAM, numbers speak louder than words. Here's a quick look at our export footprint, trusted clients, and product reach across the globe."
              )}
              {/* --- END: ترجمة الوصف --- */}
            </p>
            <Link className="home-btn fw-bold" to="/contact-us">
              {/* --- START: ترجمة زر Contact Us --- */}
              {t("contact_us_button_short", "Contact Us")}
              {/* --- END: ترجمة زر Contact Us --- */}
              <FontAwesomeIcon icon={faArrowRight} className="fa-shake ms-2" />
            </Link>
          </div>
          <div className="row num col-md-6 m-0" data-aos="fade-left">
            <div className="rate col-sm-6">
              <span>40+</span>
              <p style={{ color: "var(--heading-color)" }}>
                {/* --- START: ترجمة Export Countries --- */}
                {t("export_countries", "Export Countries")}
                {/* --- END: ترجمة Export Countries --- */}
              </p>
            </div>
            <div className="rate col-sm-6">
              <span>10+</span>
              <p style={{ color: "var(--heading-color)" }}>
                {/* --- START: ترجمة Years of Export Experience --- */}
                {t("years_of_export_experience", "Years of Export Experience")}
                {/* --- END: ترجمة Years of Export Experience --- */}
              </p>
            </div>
            <div className="w-100"></div>
            <div className="rate col-sm-6">
              <span>5,000+</span>
              <p style={{ color: "var(--heading-color)" }}>
                {/* --- START: ترجمة Tons Shipped Annually --- */}
                {t("tons_shipped_annually", "Tons Shipped Annually")}
                {/* --- END: ترجمة Tons Shipped Annually --- */}
              </p>
            </div>
            <div className="rate col-sm-6">
              <span>120+</span>
              <p style={{ color: "var(--heading-color)" }}>
                {/* --- START: ترجمة International Clients --- */}
                {t("international_clients", "International Clients")}
                {/* --- END: ترجمة International Clients --- */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
