import InputComponent from "../../../FormComponents/InputComponent";
import SecondaryButton from "../../../Buttons/Secondary/SecondaryButton";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { fetchData } from "../../../../service/apiService";
import {
  CafeProps,
  CommentResponse,
  CommentWithUserProps,
} from "../../../../service/apiInterfaces";
import SnackBar from "../../../Snackbar/Snackbar";
import { SnackbarContextValue } from "../../../../context/SnackbarContext";
import { authProps } from "../../../../service/authService";

export interface commentProps {
  comments: CommentWithUserProps[] | undefined;
  setComments: Dispatch<SetStateAction<CommentWithUserProps[] | undefined>>;
  cafe: CafeProps;
  currentUser: authProps | null;
}

const CreateCommentComponent = ({
  comments,
  setComments,
  cafe,
  currentUser,
}: commentProps) => {
  const [comment, setComment] = useState<string>("");
  const [localSnackbar, setLocalSnackbar] = useState<
    SnackbarContextValue["snackbar"]
  >({
    open: false,
    message: "",
    type: undefined,
  });

  const handlePostComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = {
        cafeId: cafe.id,
        authorId: currentUser?.data.userId,
        text: comment,
        date: new Date(),
      };
      const response = await fetchData({
        path: "/Cafe/Comment",
        method: "POST",
        body: body,
      });
      const commentResponse = response as CommentResponse;
      if (response.ok) {
        const newComment = {
          comment: commentResponse.data,
          user: {
            email: currentUser ? currentUser.data.email : "",
            id: currentUser ? currentUser.data.userId : "",
            userName: currentUser ? currentUser.data.username : "Anonymus",
          },
        };
        const updatedComments = comments
          ? [...comments, newComment]
          : [newComment];
        setComments(updatedComments);
        setLocalSnackbar({
          open: true,
          message: response.message,
          type: "success",
        });
      } else {
        setLocalSnackbar({
          open: true,
          message: response.message,
          type: "error",
        });
      }
    } catch (error) {
      setLocalSnackbar({
        open: true,
        message: "Server not responding",
        type: "error",
      });
    }
    setComment("");
  };

  const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="mt-5">
      <SnackBar
        {...localSnackbar}
        setOpen={() => setLocalSnackbar({ ...localSnackbar, open: false })}
      />
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handlePostComment}>
            <InputComponent
              name="comment"
              type="text"
              value={comment}
              placeholder="Write a comment"
              onChange={handleChangeComment}
            />
            <SecondaryButton
              text="Submit"
              className="fs-3 my-3"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommentComponent;
