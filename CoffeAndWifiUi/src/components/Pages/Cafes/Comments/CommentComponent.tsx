import { CommentProps, UserProps } from "../../../../service/apiInterfaces";
import { formatDate } from "../../../../utils/helperFunctions";
import "./CommentComponent.scss";

interface CommentComponentProps {
  comment: CommentProps;
  user: UserProps;
}

const CommentComponent = ({ comment, user }: CommentComponentProps) => {
  return (
    <div className="col-md-8">
      <div className="text-start comment-container p-2 my-2">
        <p className="mb-0">
          <span className="comment-author">@{user.userName}</span>
          <span className="ms-2 comment-date">{formatDate(comment.date)}</span>
        </p>
        <h5 className="comment-text mt-1">{comment.text}</h5>
      </div>
    </div>
  );
};

export default CommentComponent;
