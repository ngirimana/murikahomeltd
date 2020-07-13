import React from "react";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./SlideShow.css";

const zoomOutProperties = {
  duration: 20000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true,
};

const Slideshoww = (props) => {
  return (
    <div className="slide-container">
      <Zoom {...zoomOutProperties}>
        {props.images.map((each, index) => (
          <img
            key={index}
            style={{ width: "100%", height: "50vh" }}
            src={each}
            alt=""
          />
        ))}
      </Zoom>
    </div>
  );
};

export default Slideshoww;
