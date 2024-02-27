import { CafeProps } from "../../../../service/apiInterfaces";
import "./CafeDetails.scss";

const MoreCafeDetailsComponent = ({ cafe }: { cafe: CafeProps }) => {
  return (
    <div>
        <hr />
      <img className="img-thumbnail my-5 w-75 cafe-image" src={cafe.imgUrl} />
      <hr />
      <h4>
        <h2 className="my-4">Comments</h2>
        {cafe.comments.map((comment) => (
          <h5>
            {comment.text} {comment.date}
          </h5>
        ))}
      </h4>
    </div>
  );
};

export default MoreCafeDetailsComponent;
