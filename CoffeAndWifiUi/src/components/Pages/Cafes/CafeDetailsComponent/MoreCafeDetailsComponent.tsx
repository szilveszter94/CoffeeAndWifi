import { CafeProps } from "../../../../service/apiInterfaces";
import { createGoogleMapFromLatLong } from "../../../../utils/helperFunctions";
import CreateCommentComponent from "../Comments/CreateCommentComponent";
import "./CafeDetails.scss";

const MoreCafeDetailsComponent = ({ cafe }: { cafe: CafeProps }) => {
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
            <h5>
              {comment.text} {comment.date}
            </h5>
          ))
        ) : (
          <h5>No comments.</h5>
        )}
      </div>
      <CreateCommentComponent />
    </div>
  );
};

export default MoreCafeDetailsComponent;
