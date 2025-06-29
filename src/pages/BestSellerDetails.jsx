import { useParams } from "react-router-dom";
import { FetchDetails } from "../components/BestSellerDetailsComponents";
export const BestSellerDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <FetchDetails id={id} />
    </div>
  );
};
