import React from "react";
import "./HomePage.css";
import Carousel from "../../components/Carousel/Carousel";

const HomePage: React.FC = () => {
  return (
    <div className="homePageContainer">
      <Carousel />

      <div className="quoteContainer">
        Handmade products carry with them the quiet dignity of the human touch.
        Each stitch, each carve, each brushstroke tells a story of dedication,
        patience, and craftsmanship. In a world driven by speed and automation,
        handmade goods remind us of the beauty of imperfection, the value of
        time, and the deep connection between maker and object. They are not
        just items—we hold in our hands the hours, the care, and the soul of the
        artisan who brought them to life. To choose handmade is to honor
        tradition, support creativity, and embrace authenticity in its most
        tangible form.
      </div>
    </div>
  );
};

export default HomePage;
