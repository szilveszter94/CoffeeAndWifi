import InputComponent from "../../../FormComponents/InputComponent";
import SecondaryButton from "../../../Buttons/Secondary/SecondaryButton";

const CreateCommentComponent = () => {
  return (
    <div className="mt-5">
      <h2>Write a comment.</h2>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <form>
            <InputComponent
              name="comment"
              type="text"
              value=""
              placeholder="Write a comment"
              onChange={() => null}
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
