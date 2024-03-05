import { Dispatch, SetStateAction } from "react";
import { CafeProps } from "../../../../service/apiInterfaces";
import { createGoogleMapFromLatLong } from "../../../../utils/helperFunctions";
import CreateCommentComponent from "../Comments/CreateCommentComponent";
import "./CafeDetails.scss";

export interface cafeStateProps {
  cafe: CafeProps;
  setCafe: Dispatch<SetStateAction<CafeProps | undefined>>;
}

const MoreCafeDetailsComponent = ({ cafe, setCafe }: cafeStateProps) => {
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
      <CreateCommentComponent cafe={cafe} setCafe={setCafe} />
    </div>
  );
};

export default MoreCafeDetailsComponent;
