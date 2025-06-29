import { useLocation } from "react-router-dom";
import img1 from "../../../images/productsHeroSection.webp"; // الصورة رقم 3

export const HeroSection = () => {
  const location = useLocation();
  let paths = location.pathname.split("/") || [];
  paths[0] = "Home";

  return (
    <div className="products-hero-section">
      <img
        src={img1}
        width="100%"
        height="100%"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        alt="product-cover"
        style={{
          position: "absolute",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: "-10",
        }}
      />
      <div className="container">
        <div className="content text-center">
          <h1 className="mb-3 fw-bold">Products</h1>
          <p>
            Explore our premium selection of fresh and frozen fruits and vegetables — export-grade
            quality you can trust.
          </p>
        </div>
      </div>
    </div>
  );
};
