import React from "react";
import Slider from "./Slider";
import Banner from "./Banner";
import Stats from "./Stats";
import Popular from "./Popular";

const Home = () => {
  document.title = "Home";
  return (
    <div>
      <Banner></Banner>
      <Slider></Slider>
      <Popular></Popular>
      <Stats></Stats>
    </div>
  );
};

export default Home;
