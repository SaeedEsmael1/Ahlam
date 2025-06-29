import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utilis/fetch";
import { useEffect, useState } from "react";
import SkeletonEffect from "./SkeletonEffect";
import Modal from "../Modal";
import Confirm from "../Confirm";
import GetCustomQuote from "../GetCustomQuote";
export const FetchDetails = ({ id }) => {
  const fetchDetails = () => {
    const res = fetchData(`/products/${id}`);
    return res;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["bestseller", `details-${id}`],
    queryFn: fetchDetails,
  });
  const details = data;
  console.log(data);

  const [allImages, setAllImages] = useState(details?.has_many_images || []);
  useEffect(() => {
    if (details?.has_many_images) {
      setAllImages(details.has_many_images);
    }
  }, [details]);

  const changeMainImage = (id) => {
    const updateImagesState = allImages.map((img) =>
      img.id !== id ? { ...img, is_main: 0 } : { ...img, is_main: 1 },
    );
    setAllImages(updateImagesState);
  };

  const [currentDescription, setCurrentDescription] = useState("");
  const [active, setActive] = useState("Description");

  const changeCurrentDescriptionAndActive = (tagName, description) => {
    setActive(tagName);
    setCurrentDescription(description);
  };

  useEffect(() => {
    if (details?.has_many_tags) {
      setActive(details.has_many_tags[0].name);
      setCurrentDescription(details.has_many_tags[0].description);
    }
  }, [details]);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (isLoading) return <SkeletonEffect />;
  if (isError) return <h3>{error.message}</h3>;

  return (
    <div className="py-5">
      <div className="container">
        {/* Images And Info */}
        <div className="row ">
          {/* Images Side */}
          <div className="col-12 col-lg-6">
            <div className="d-flex flex-column-reverse flex-md-row flex-md-row align-items-center gap-4 mb-4 ">
              {/* Side thumbnails */}
              <div className="d-flex flex-md-column gap-3">
                {allImages?.map((img) =>
                  !img.is_main ? (
                    <img
                      onClick={() => changeMainImage(img.id)}
                      className="rounded-3 pointer"
                      key={img.id}
                      width={70}
                      src={`https://api.ahlamfoods.com/storage/${img.image}`}
                      alt="img"
                    />
                  ) : null,
                )}
              </div>

              {/* Main image */}
              <div>
                {allImages.map((img) =>
                  img.is_main ? (
                    <img
                      key={img.id}
                      className="rounded-5 img-fluid"
                      style={{ width: "400px", maxWidth: "100%" }}
                      src={`https://api.ahlamfoods.com/storage/${img.image}`}
                      alt="img"
                    />
                  ) : null,
                )}
              </div>
            </div>

            {/* Buttons */}
            <div>
              <button
                className="py-2 rounded-3 px-2 w-100 mb-3 text-white"
                style={{ backgroundColor: "var(--green-color)" }}
              >
                Quick Price Request
              </button>
              <button
                className="py-2 rounded-3 px-2 w-100"
                style={{
                  backgroundColor: "var(--bg-green)",
                  color: "var(--green-color)",
                }}
              >
                Free Simple Request
              </button>
            </div>
          </div>

          {/* Info Side */}
          <div className="col-12 col-lg-6">
            <h2 className="mb-3" style={{ color: "var(--green-color)" }}>
              {details.name}
            </h2>
            <div>
              {details?.has_many_data?.map((d) => (
                <div key={d.id}>
                  <p style={{ color: "var(--heading-color)" }}>{d.name}</p>
                  <p className="w-75" style={{ color: "var(--gray-color)" }}>
                    {d.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="py-5">
          <div>
            <ul
              className="d-flex gap-3 pb-2 mb-2 border-bottom"
              style={{
                overflowX: "auto",
                overflowY: "hidden",
              }}
            >
              {details?.has_many_tags?.map((tag) => (
                <li
                  key={tag.id}
                  onClick={() =>
                    changeCurrentDescriptionAndActive(tag.name, tag.description)
                  }
                  className="position-relative pointer"
                  style={{
                    // overflow: "hidden",
                    color:
                      active === tag.name
                        ? "var(--green-color)"
                        : "var(--heading-color)",
                  }}
                >
                  {tag.name}
                  <span
                    className={`d-none d-md-${active === tag.name ? "block" : "none"} position-absolute start-0 w-100`}
                    style={{
                      height: "2px",
                      bottom: "-9px",
                      backgroundColor: "var(--green-color)",
                    }}
                  ></span>
                </li>
              ))}
            </ul>

            <p style={{ color: "var(--heading-color)" }}>
              {currentDescription}
            </p>
          </div>
        </div>

        {/* Form */}
        <div>
          <GetCustomQuote
            name={details?.name}
            openModal={openModal}
            closeModal={closeModal}
            message="Get a Custom Quote for Frozen Strawberries"
          />
          <Modal isOpen={isOpen} openModal={openModal}>
            <Confirm />
          </Modal>
        </div>

        {/* Related Products */}
        <div className="mb-5">
          <h3>Related Products Here: </h3>
        </div>

        {/*  */}
        {details?.description && (
          <div dangerouslySetInnerHTML={{ __html: details.description }} />
        )}
      </div>
    </div>
  );
};
