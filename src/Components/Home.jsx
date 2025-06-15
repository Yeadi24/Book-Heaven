import React from "react";
import Slider from "./Slider";
import Banner from "./Banner";

const Home = () => {
  document.title = "Home";
  return (
    <div>
      <Banner></Banner>
      <Slider></Slider>
    </div>
  );
};

export default Home;
