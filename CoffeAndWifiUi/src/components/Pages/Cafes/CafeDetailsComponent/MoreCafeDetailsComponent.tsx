import { Dispatch, SetStateAction, useContext } from "react";
import { CafeProps } from "../../../../service/apiInterfaces";
import { createGoogleMapFromLatLong } from "../../../../utils/helperFunctions";
import CreateCommentComponent from "../Comments/CreateCommentComponent";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./CafeDetails.scss";

export interface cafeStateProps {
  cafe: CafeProps;
  setCafe: Dispatch<SetStateAction<CafeProps | undefined>>;
}

const MoreCafeDetailsComponent = ({ cafe, setCafe }: cafeStateProps) => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/loginRegister");
  };

  return (
    <div>
      <hr />
      <img className="img-thumbnail my-5 w-75 cafe-image" src={cafe.imgUrl} />
      <hr />
      <div className="text-center">
        <div className="google-map mt-5">
          <iframe
            src={createGoogleMapFromLatLong(cafe.latitude, cafe.longitude)}
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div>
        <h2 className="my-4">Comments</h2>
        {cafe.comments ? (
          cafe.comments.map((comment) => (
            <h5 key={comment.id}>
              {comment.text} {comment.date}
            </h5>
          ))
        ) : (
          <h5>No comments.</h5>
        )}
      </div>
      {currentUser ? (
        <CreateCommentComponent
          cafe={cafe}
          setCafe={setCafe}
          currentUser={currentUser}
        />
      ) : (
        <div>
          <h2>Login first to write a comment.</h2>
          <button onClick={handleNavigateToLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default MoreCafeDetailsComponent;
