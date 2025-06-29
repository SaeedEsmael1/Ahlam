import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import seller from "../../../images/seller-icon.webp";
import besticon from "../../../images/best-icon.webp";
import { fetchData } from "../../utilis/fetch";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "../../contexts/TranslationContext";

export const BestSellerSection = () => {
  const { t } = useTranslation();

  const sliderRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);
  const clickStartTimeRef = useRef(0);
  const clickDelay = 150;
  const scrollAmount = 300;

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const handleMouseDown = (e) => {
      isDownRef.current = true;
      isDraggingRef.current = false;
      clickStartTimeRef.current = Date.now();
      slider.classList.add("grabbing");
      startXRef.current = e.pageX - slider.offsetLeft;
      scrollLeftRef.current = slider.scrollLeft;
    };

    const handleMouseUp = (e) => {
      const clickDuration = Date.now() - clickStartTimeRef.current;
      if (clickDuration >= clickDelay || isDraggingRef.current) {
        e.preventDefault();
        slider.querySelectorAll(".product-link").forEach((link) => {
          link.addEventListener("click", preventClick, { once: true });
        });
      }
      isDownRef.current = false;
      slider.classList.remove("grabbing");
    };

    const handleMouseMove = (e) => {
      if (!isDownRef.current) return;
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startXRef.current) * 1.5;
      if (Math.abs(walk) > 5) {
        isDraggingRef.current = true;
      }
      slider.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleTouchStart = (e) => {
      isDownRef.current = true;
      isDraggingRef.current = false;
      clickStartTimeRef.current = Date.now();
      const touch = e.touches[0];
      startXRef.current = touch.pageX - slider.offsetLeft;
      scrollLeftRef.current = slider.scrollLeft;
    };

    const handleTouchMove = (e) => {
      if (!isDownRef.current) return;
      const touch = e.touches[0];
      const x = touch.pageX - slider.offsetLeft;
      const walk = (x - startXRef.current) * 1.5;
      if (Math.abs(walk) > 10) {
        isDraggingRef.current = true;
      }
      slider.scrollLeft = scrollLeftRef.current - walk;
      if (isDraggingRef.current) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      const clickDuration = Date.now() - clickStartTimeRef.current;
      if (clickDuration >= clickDelay && isDraggingRef.current) {
        slider.querySelectorAll(".product-link").forEach((link) => {
          link.addEventListener("click", preventClick, { once: true });
        });
      }
      isDownRef.current = false;
    };

    const preventClick = (e) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handlePrevClick = () => {
      slider.scrollLeft -= scrollAmount;
    };

    const handleNextClick = () => {
      slider.scrollLeft += scrollAmount;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("touchstart", handleTouchStart, { passive: false });
    slider.addEventListener("touchmove", handleTouchMove, { passive: false });
    slider.addEventListener("touchend", handleTouchEnd);

    prevBtnRef.current?.addEventListener("click", handlePrevClick);
    nextBtnRef.current?.addEventListener("click", handleNextClick);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);

      prevBtnRef.current?.removeEventListener("click", handlePrevClick);
      nextBtnRef.current?.removeEventListener("click", handleNextClick);
    };
  }, []);

  const fetchBestSellers = async () => {
    return await fetchData("/products/bestsellers");
  };

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["best-sellers"],
    queryFn: fetchBestSellers,
  });

  console.log(data);

  return (
    <section className="best-seller">
      <div className="container position-relative">
        <img
          className="trend-icon position-absolute"
          src={seller}
          width="180"
          height="150"
          alt="seller-trend"
          loading="lazy"
        />
        <div className="info text-center" data-aos="fade-down">
          <h1 className="home-heading mb-3">
            {t("best_seller_products", "Best Seller Products")}
            <span>
              <img
                className="position-absolute trend-icon"
                src={besticon}
                alt="best-icon"
                width="70"
                height="40"
                loading="lazy"
              />
            </span>
          </h1>
          <p className="home-description mx-auto">
            {t(
              "best_seller_description",
              "Explore our top-selling products, carefully selected for importers and distributors seeking high-quality bulk supplies. With a strong focus on export-grade standards, our diverse range ensures reliability and consistency to support the needs of global import businesses.",
            )}
          </p>
        </div>
        <div className="carousel-container" ref={sliderRef}>
          {data.map((product, index) => (
            <Link
              to={`/products/${product.id}`}
              key={index}
              className="d-inline-block product-link"
            >
              <div className="product-card" data-aos="fade-up">
                <div className="card-body">
                  <div className="card-image position-relative">
                    <span className="badge-custom">fresh</span>
                    <img
                      src={`https://api.ahlamfoods.com/storage/${product?.main_image}`}
                      alt={product.category}
                      style={{ width: "300px", height: "100%" }}
                      className="img-fluid"
                      loading="lazy"
                    />
                  </div>
                  <div className="card-txt p-3">
                    <p className="descripe-card">{product.subdescription}</p>
                    <p className="product-name my-3">{product.name}</p>
                    <p className="price">
                      {product.price}
                      <sub style={{ color: "var(--heading-color)" }}>
                        /per ton
                      </sub>
                    </p>
                    <button className="btn-green">Quick Inquire</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="carousel-nav">
          <button ref={prevBtnRef}>
            <FontAwesomeIcon icon={faAngleLeft} className="fa-beat" />
            <span className="visually-hidden">Previous slide</span>
          </button>
          <button ref={nextBtnRef}>
            <FontAwesomeIcon icon={faAngleRight} className="fa-beat" />
            <span className="visually-hidden">Next slide</span>
          </button>
        </div>
      </div>
    </section>
  );
};
