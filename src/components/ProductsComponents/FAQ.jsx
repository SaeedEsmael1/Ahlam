import AccordionComponent from "../AccordionComponent";
export function FAQ() {
  const faqs = [
    {
      id: 1,
      question: "Do you export to all countries?",
      answer:
        "Yes, we export to many global markets, adhering to each country’s specific certification and quality requirements.",
    },
    {
      id: 2,
      question: "Are your products certified?",
      answer:
        "Absolutely! All our products comply with international certifications including Global GAP and ISO standards.",
    },
    {
      id: 3,
      question: "How do you ensure product freshness?",
      answer:
        "We use modern cold chain logistics and quick freezing techniques to maintain quality from farm to shipment.",
    },
    {
      id: 4,
      question: "What’s the minimum order quantity?",
      answer:
        "Our MOQ varies depending on the product. Contact us directly to discuss your specific needs.",
    },
  ];

  return (
    <div style={{ color: "var(--heading-color)" }} className="container my-5">
      <h4 className="fw-bold text-center mb-4">Frequently Asked Questions About Our Products</h4>

      <div>
        <AccordionComponent faqs={faqs} />
      </div>
    </div>
  );
}
