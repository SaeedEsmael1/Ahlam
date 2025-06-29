import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import fruit from "../../../images/fruut.webp";
import { useTranslation } from "../../contexts/TranslationContext";

export const OurProductsSection = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://api.ahlamfoods.com";

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/home_categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();

      if (Array.isArray(responseData)) {
        setCategories(responseData);
      } else {
        console.warn("API response for categories was not an array:", responseData);
        setCategories([]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const SkeletonCard = () => (
    <div className="card-container col-6 col-lg-3 col-md-4 col-sm-6" data-aos="flip-left">
      <div className="card d-block" style={{ backgroundColor: "var(--white-color)" }}>
        <div className="card-image position-relative">
          <div
            className="skeleton skeleton-image"
            style={{ width: "100%", height: "150px", borderRadius: "30px" }}
          ></div>
        </div>
        <div className="card-txt p-3">
          <div
            className="skeleton skeleton-button"
            style={{ height: "40px", width: "100%", borderRadius: "20px" }}
          ></div>
        </div>
      </div>
    </div>
  );

  const renderCategoryCardsContent = () => {
    if (loading) {
      return Array(8)
        .fill()
        .map((_, index) => <SkeletonCard key={`skeleton-${index}`} />);
    } else if (error) {
      return (
        <p className="text-center w-100 text-danger">
          {t("error_loading_", "An error occurred while loading:")} {error.message}
        </p>
      );
    } else if (categories.length > 0) {
      return categories.map((cat) => (
        <div
          className="card-container col-6 col-lg-3 col-md-4 col-sm-6"
          key={cat.id}
          data-aos="flip-left"
        >
          <Link
            to={`/products/category/${cat.id}`}
            className="card d-block"
            style={{ backgroundColor: "var(--white-color)" }}
          >
            <img
              src={cat.image ? `${API_BASE_URL}${cat.image}` : fruit}
              width={280}
              height={270}
              className="card-img-top mb-3 img-fluid"
              style={{ borderRadius: "30px", objectFit: "cover" }}
              alt={cat.name}
              loading="lazy"
            />
            <button>
              {cat.name}
              <FontAwesomeIcon icon={faArrowRight} className="ms-2 fade-d" />
            </button>
          </Link>
        </div>
      ));
    } else {
      return (
        <p className="text-center w-100">
          {t("no_categories_found", "No categories were found at this time.")}
        </p>
      );
    }
  };

  return (
    <section className="our-product position-relative text-center text-md-start py-5">
      <img
        src={fruit}
        width="220"
        height="190"
        className="position-absolute trend-icon"
        style={{ top: "-90px", left: "80px", zIndex: -500 }}
        alt="trend-icon"
        loading="lazy"
      />
      <div className="container">
        <div className="product-heading" data-aos="zoom-out">
          <h1 className="home-heading mb-3">{t("our_products_heading", "Our Products")}</h1>
          <div className="d-flex justify-content-between">
            <p className="home-description">
              {t(
                "our_products_description",
                "As a trusted exporter, we take pride in providing a wide range of premium Egyptian agricultural products to meet the demands of importers, distributors, and retailers worldwide. Our catalog includes frozen fruits and vegetables, fresh produce, aromatic herbs, exotic spices, and quality pickles—reflecting the rich variety and excellence of Egypt’s agricultural heritage."
              )}
            </p>
            <Link
              className="home-btn d-none d-md-block"
              style={{ backgroundColor: "transparent" }}
              to="/"
            >
              {t("others_button", "Others")}
              <FontAwesomeIcon icon={faArrowRight} className="ms-2 shake" />
            </Link>
          </div>
          <div className="mt-4">
            <button
              onClick={fetchCategories}
              disabled={loading}
              style={{
                padding: loading ? "10px 15px" : "10px 20px",
                cursor: "pointer",
                backgroundColor: "var(--green-color)",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                height: "40px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "min-width 0.3s ease-in-out, padding 0.3s ease-in-out",
              }}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin size="lg" />
              ) : (
                t("refresh", "Refresh")
              )}
            </button>
          </div>
        </div>
        <div className="row category mt-3 g-4">{renderCategoryCardsContent()}</div>
        <Link
          className="home-btn d-block d-md-none my-4 mx-auto"
          style={{ backgroundColor: "transparent" }}
          to="/"
        >
          {t("others_button", "Others")}
          <FontAwesomeIcon icon={faArrowRight} className="ms-2 shake" />
        </Link>
      </div>
    </section>
  );
};
