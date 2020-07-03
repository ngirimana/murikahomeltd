import React from "react";
import BackToTop from "react-back-to-top-button";
import classes from "./BackToTop.module.scss";

const ToTop = (props) => (
  <BackToTop showOnScrollUp showAt={100} speed={1000} easing="easeInOutQuint">
    <span className={classes.CarretContainer}>
      <span className={classes.Carret}></span>
      <span className={classes.Carret}></span>
    </span>
  </BackToTop>
);

export default ToTop;
