import SupplierForm from "../components/SupplierForm";
import SupplierSection from "../components/SupplierSection";
import React, { useState } from "react";
import Modal from "../components/Modal";
import Confirm from "../components/Confirm";
export const SupplierPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <SupplierSection />
      <SupplierForm openModal={openModal} closeModal={closeModal} />
      <Modal isOpen={isOpen} openModal={openModal}>
        <Confirm />
      </Modal>
    </>
  );
};
