import { fetchData } from "../../../service/apiService";
import PrimaryButton from "../../Buttons/PrimaryButton";
import "./Home.css";

const Home = () => {
  const handleDataFetch = async () => {
    const response = await fetchData({
      path: "/Coffee",
      method: "GET",
      body: null,
    });
    console.log(response);
  };

  return (
    <div className="main vh-100">
      <PrimaryButton onClick={handleDataFetch} text="Click"></PrimaryButton>
    </div>
  );
};

export default Home;
