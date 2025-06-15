import React from "react";
import Slider from "./Slider";
import Banner from "./Banner";
import Stats from "./Stats";

const Home = () => {
  document.title = "Home";
  return (
    <div>
      <Banner></Banner>
      <Slider></Slider>
      <Stats></Stats>
    </div>
  );
};

export default Home;
