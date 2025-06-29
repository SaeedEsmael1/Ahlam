import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../../subscribe.json";
import { useTranslation } from "../contexts/TranslationContext";

const Subescripe = () => {
  const { t } = useTranslation();

  const containerRef = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div
      className="shake"
      style={{ color: "white", display: "flex", alignItems: "center" }}
    >
      <div ref={containerRef} style={{ width: "130px", height: "80px" }} />
      <p
        style={{
          color: "#eee",
          fontWeight: "bold",
          maxWidth: "250px",
          margin: "0 auto",
          fontSize: "14px",
        }}
      >
        {t(
          "Subescripe_message",
          "You have successfully subscribed to Ahlam's newsletter.",
        )}
      </p>
    </div>
  );
};

export default Subescripe;
