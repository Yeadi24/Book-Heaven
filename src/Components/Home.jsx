import React from "react";
import Slider from "./Slider";
import Banner from "./Banner";
import Stats from "./Stats";
import Popular from "./Popular";
import Fiction from "./Fiction";
import NonFiction from "./NonFiction";
import Fantasy from "./Fantasy";
import Offer from "./Offer";
import GiftPrepaidCards from "./GiftPrepaidCards";

const Home = () => {
  document.title = "Home";
  return (
    <div>
      <Banner></Banner>
      <Slider></Slider>
      <Popular></Popular>
      <Fiction></Fiction>
      <NonFiction></NonFiction>
      <Fantasy></Fantasy>
      <Offer></Offer>
      <GiftPrepaidCards></GiftPrepaidCards>
      <Stats></Stats>
    </div>
  );
};

export default Home;
