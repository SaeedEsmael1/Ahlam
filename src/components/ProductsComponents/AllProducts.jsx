import { useState } from "react";
import Confirm from "../Confirm";

export const AllProducts = () => {
  const [success, setSuccess] = useState(false);
  return (
    <div className="my-5 py-5">
      <div className="container">
        <div className="content">
          <h1 style={{ color: "var(--heading-color)" }}>AllProducts Here</h1>
        </div>
      </div>
    </div>
  );
};
