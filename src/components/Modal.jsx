const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div>
      <div
        className="overlay"
        style={{
          backgroundColor: "#222831c7",
          position: "fixed",
          top: "100px",
          right: "0px",
          borderRadius: "10px",
          width: "400px",
          maxWidth: "100%",
          zIndex: "100",
        }}
      >
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
