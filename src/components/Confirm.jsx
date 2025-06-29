import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../../confirm.json";
import { useTranslation } from "../contexts/TranslationContext";

const Confirm = () => {
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
    <div className="shake" style={{ color: "white", display: "flex", alignItems: "center" }}>
      <div ref={containerRef} style={{ width: "150px" }} />
      <p
        style={{
          color: "#eee",
          fontWeight: "bold",
          maxWidth: "400px",
          margin: "0 auto",
          fontSize: "14px",
        }}
      >
        {t(
          "confirm_message",
          "Thank you for contacting us. One of our representatives will get in touch with you shortly."
        )}
      </p>
    </div>
  );
};

export default Confirm;
