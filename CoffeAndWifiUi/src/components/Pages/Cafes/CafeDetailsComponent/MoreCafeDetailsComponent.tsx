import { Dispatch, SetStateAction, useContext } from "react";
import { CafeProps, CommentWithUserProps } from "../../../../service/apiInterfaces";
import { createGoogleMapFromLatLong } from "../../../../utils/helperFunctions";
import CreateCommentComponent from "../Comments/CreateCommentComponent";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./CafeDetails.scss";
import { formatDate } from "../../../../utils/helperFunctions";

export interface cafeStateProps {
  cafe: CafeProps;
  comments: CommentWithUserProps[] | undefined;
  setCafe: Dispatch<SetStateAction<CafeProps | undefined>>;
}

const MoreCafeDetailsComponent = ({ cafe, comments, setCafe }: cafeStateProps) => {
  console.log(comments);
  
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
        {comments ? (
          comments.map((comment) => (
            <h5 key={comment.comment.id}>
              {comment.comment.text} {formatDate(comment.comment.date)} {comment.user.userName}
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
