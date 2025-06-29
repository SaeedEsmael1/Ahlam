import { Link } from "react-router-dom";
import logo from "../../images/logo.webp";
import React, { useState, Suspense, lazy } from "react"; // <--- أضف Suspense و lazy

import { useTranslation } from "../contexts/TranslationContext";
import SubscribeForm from "./SubscribeForm";
import Modal from "./Modal"; // استيراد مكون Modal

// const Subescripe = lazy(() => import("./Subescripe")); // <--- هذا هو التعديل الأساسي
// بما أن Subescripe هو default export بالفعل، لا تحتاج to .then(module => ({ default: module.Subescripe }))
// لو كنت تستخدم export const Subescripe في ملف Subescripe.jsx كنت ستحتاج للطريقة الأخرى

// تأكد من المسار الصحيح لملف Subescripe في مجلد 'components'
const LazySubescripe = lazy(() => import("./Subescripe")); // <--- هذا هو التعديل الأساسي

const Footer = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <footer style={{ color: "var(--heading-color)" }}>
      {/* Grid container */}
      <div className="container py-5">
        {/* Grid row */}
        <div className="row justify-content-between grid-link">
          <div className="mb-4 mb-md-0 col-lg-6">
            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="logo-png" width="75" height="50" loading="lazy" />
            </Link>
            {/* Form */}
            <SubscribeForm openModal={openModal} closeModal={closeModal} />
          </div>

          <div className="d-flex flex-wrap justify-content-between col-md-12 col-lg-5">
            <div className="m-3">
              <h5>{t("footer_products_heading", "Products")}</h5>
              <ul className="list-unstyled mt-3 footer-link">
                <li>
                  <Link to="/products#fresh-fruits" className="text-body">
                    {t("fresh_fruits_link", "Fresh Fruits")}
                  </Link>
                </li>
                <li>
                  <Link to="/products#frozen-fruits" className="text-body">
                    {t("frozen_fruits_link", "Frozen Fruits")}
                  </Link>
                </li>
                <li>
                  <Link to="/products#fresh-vegetables" className="text-body">
                    {t("fresh_vegetables_link", "Fresh Vegetables")}
                  </Link>
                </li>
                <li>
                  <Link to="/products#frozen-vegetables" className="text-body">
                    {t("frozen_vegetables_link", "Frozen Vegetables")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="m-3">
              <h5>{t("footer_links_heading", "Links")}</h5>
              <ul className="list-unstyled mt-3 footer-link">
                <li>
                  <Link to="/Supplier" className="text-body">
                    {t("supplier_link", "Supplier")}
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-body">
                    {t("products_link", "Products")}
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="text-body">
                    {t("faqs_link", "FAQs")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="text-body">
                    {t("contact_us_link", "Contact us")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="m-3">
              <h5>{t("follow_us_heading", "Follow us")}</h5>
              <ul className="list-unstyled mt-3 footer-link">
                <li>
                  <a href="https://facebook.com" className="text-body">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" className="text-body">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" className="text-body">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://whatsapp.com" className="text-body">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Grid row */}

        {/* Copyright */}
        <div className="d-flex justify-content-between mt-3 py-3 copy-right">
          <span>{t("copyright_text", "Copyright © 2025 AHLAM")}</span>
          <Link to="/privacy">{t("privacy_policy_link", "Privacy Policy")}</Link>
        </div>
        {/* Copyright */}
      </div>

      {/* المودال الخاص بالاشتراك */}
      {/* استخدم Suspense حوالين المكون اللي بيتعمله lazy load */}
      <Modal isOpen={isOpen} openModal={openModal}>
        <Suspense>
          <LazySubescripe />
        </Suspense>
      </Modal>
    </footer>
  );
};

export default Footer;
