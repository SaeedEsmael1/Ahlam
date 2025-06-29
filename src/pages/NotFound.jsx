// src/pages/NotFound.jsx
import React, { useEffect, useRef } from "react"; // Ensure React is imported
import lottie from "lottie-web";
import animationData from "../../error.json";
import { Link } from "react-router-dom"; // Ensure Link is imported
import { useTranslation } from "../contexts/TranslationContext";

const NotFound = () => {
  const { t } = useTranslation();

  const lottieContainer = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <main>
      <div className="container">
        <div className="row vh-100 align-items-center text-center text-md-start py-5">
          <div className="col-md-6 mb-5 order-2 order-md-1">
            <div className="home-heading mb-5">
              {/* --- START: Translate "Oops! Page Not Found" --- */}
              {t("not_found_heading", "Oops! Page Not Found")}
              {/* --- END: Translate "Oops! Page Not Found" --- */}
            </div>
            <p className="mx-auto mx-md-0 home-description mb-5" style={{ maxWidth: "420px" }}>
              {t(
                "not_found_description",
                "The page you're looking for may have been moved or doesn't exist anymore. Let's get you back on track."
              )}
            </p>
            <Link to="/" className="home-btn" style={{ backgroundColor: "#3ab54a", color: "#fff" }}>
              {t("back_to_homepage_button", "Back to Homepage")}
            </Link>
          </div>
          <div
            id="lottie-container"
            className="col-md-6 order-1 order-md-2"
            ref={lottieContainer}
          ></div>
        </div>
      </div>
    </main>
  );
};

export default NotFound; // <--- أضفنا السطر ده في النهاية
