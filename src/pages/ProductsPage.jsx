import { useState } from "react";
import Confirm from "../components/Confirm";
import Modal from "../components/Modal";
import {
  HeroSection,
  AllProducts,
  WhyBuyFromUs,
  FAQ,
  ProductSearch,
} from "../components/ProductsComponents";
import SendMessage from "../components/SendMessage";
export const ProductsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <HeroSection />
      <AllProducts />
      <WhyBuyFromUs />
      <FAQ />
      <ProductSearch />
      <SendMessage
        openModal={openModal}
        closeModal={closeModal}
        message={" Request a Quote or Ask About a Product"}
      />
      <Modal isOpen={isOpen} openModal={openModal}>
        <Confirm />
      </Modal>
    </>
  );
};
