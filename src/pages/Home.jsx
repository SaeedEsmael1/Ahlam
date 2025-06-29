import Modal from "../components/Modal";
import {
  HeaderSection,
  OurNumbersSection,
  BestSellerSection,
  OurProductsSection,
  WhyChooseAhlam,
  AboutSection,
  RolesSection,
  ConnectSection,
} from "../components/homeComponents";
import Confirm from "../components/Confirm";
import { useState } from "react";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <HeaderSection />
      <OurNumbersSection />
      <BestSellerSection />
      <OurProductsSection />
      <WhyChooseAhlam />
      <AboutSection />
      <RolesSection />
      <ConnectSection openModal={openModal} closeModal={closeModal} />
      <Modal isOpen={isOpen} openModal={openModal}>
        <Confirm />
      </Modal>
    </>
  );
};
