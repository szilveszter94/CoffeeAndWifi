import InputComponent from "../../../FormComponents/InputComponent";
import SecondaryButton from "../../../Buttons/Secondary/SecondaryButton";
import { ChangeEvent, FormEvent, useState } from "react";
import { fetchData } from "../../../../service/apiService";
import { cafeStateProps } from "../CafeDetailsComponent/MoreCafeDetailsComponent";
import { CommentResponse } from "../../../../service/apiInterfaces";
import SnackBar from "../../../Snackbar/Snackbar";
import { SnackbarContextValue } from "../../../../context/SnackbarContext";

const CreateCommentComponent = ({ cafe, setCafe }: cafeStateProps) => {
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
        authorId: "bestauthorever",
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
        const updatedCafe = {
          ...cafe,
          comments: [...cafe.comments, commentResponse.data],
        };
        setCafe(updatedCafe);
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
