import loadingGif from "../../../assets/images/loading.gif";

const Loading = () => {
  return (
    <div className="container my">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-9">
          <img className="img-fluid w-75" src={loadingGif} alt="Loading..." />
        </div>
      </div>
    </div>
  );
};

export default Loading;
