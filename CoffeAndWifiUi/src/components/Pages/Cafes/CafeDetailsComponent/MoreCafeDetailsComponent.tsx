import { Dispatch, SetStateAction, useContext } from "react";
import {
  CafeProps,
  CommentWithUserProps,
} from "../../../../service/apiInterfaces";
import { createGoogleMapFromLatLong } from "../../../../utils/helperFunctions";
import CreateCommentComponent from "../Comments/CreateCommentComponent";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./CafeDetails.scss";
import SecondaryButton from "../../../Buttons/Secondary/SecondaryButton";
import CommentComponent from "../Comments/CommentComponent";

export interface cafeStateProps {
  cafe: CafeProps;
  comments: CommentWithUserProps[] | undefined;
  setComments: Dispatch<SetStateAction<CommentWithUserProps[] | undefined>>;
}

const MoreCafeDetailsComponent = ({
  cafe,
  comments,
  setComments,
}: cafeStateProps) => {
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
      {currentUser ? (
        <CreateCommentComponent
          comments={comments}
          setComments={setComments}
          cafe={cafe}
          currentUser={currentUser}
        />
      ) : (
        <div className="my-5">
          <h2>Login first to write a comment.</h2>
          <SecondaryButton
            type="button"
            onClick={handleNavigateToLogin}
            text="Login"
            className="fs-4"
          />
        </div>
      )}
      <div className="mb-5">
        <h2 className="my-4">Comments</h2>
        <div className="row d-flex justify-content-center">
          {comments ? (
            comments.map((comment) => (
              <CommentComponent
                key={comment.comment.id}
                comment={comment.comment}
                user={comment.user}
              />
            ))
          ) : (
            <h5>No comments.</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreCafeDetailsComponent;
