import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export function ProductSearch() {
  return (
    <div style={{ color: "var(--heading-color)" }}>
      <div className="container">
        <div className="text-center mt-5">
          <div className="mb-5">
            <h3 className="fw-bold mb-3">Ready to Buy? Let’s Get Started</h3>
            <p style={{ width: "800px", maxWidth: "100%", margin: "0 auto" }}>
              Submit your request today and let us help you with product selection, pricing, and
              export logistics tailored to your market
              <Link style={{ color: "var(--green-color)", padding: "0 4px" }} to={"/contact-us"}>
                Contact us
              </Link>
            </p>
          </div>

          <div className="mb-5">
            <h3 className="fw-bold mb-3">Find the Right Product for Your Market</h3>
            <p style={{ width: "800px", maxWidth: "100%", margin: "0 auto" }}>
              Use our smart search tool to browse through fresh and frozen agricultural products.
              Search by product name, category, or country of origin and find what fits your export
              needs.
            </p>
          </div>

          <div className="d-flex mb-5 w-50 mx-auto position-relative">
            <input
              style={{ border: "none", outline: "none", width: "100%" }}
              type="text"
              className="p-3  rounded-pill"
              placeholder="Type a product to find it"
              aria-label="Search product"
            />
            <button className="search-btn" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
