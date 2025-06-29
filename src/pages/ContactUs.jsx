import React, { useState } from "react";
import { GetInTouch } from "../components/contactCompoennts";
import SendMessage from "../components/SendMessage";
import MapImage from "../../images/map.webp";
import Modal from "../components/Modal";
import Confirm from "../components/Confirm";
import { useTranslation } from "../contexts/TranslationContext";

export const ContactUs = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <GetInTouch />
      <div className="position-relative" style={{ marginBottom: "-150px" }}>
        <SendMessage
          openModal={openModal}
          closeModal={closeModal}
          // --- START: Translate the message prop ---
          message={t(
            "contact_us_send_message_title",
            "Start the conversation today — we're ready to support you!"
          )}
          // --- END: Translate the message prop ---
        />
      </div>
      <Modal isOpen={isOpen} openModal={openModal}>
        <Confirm />
      </Modal>
      <div style={{ zIndex: -10 }}>
        <img style={{ width: "100%", height: "300px" }} src={MapImage} alt="" />
      </div>
    </div>
  );
};
