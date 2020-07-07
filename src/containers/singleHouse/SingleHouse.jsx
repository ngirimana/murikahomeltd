import React, { Component } from "react";
import SlideShoww from "../../components/UI/SlideShoww/SlideShoww";
import classes from "./singleHouse.module.scss";


class SingleHouse extends Component {
  render() {
    return (
      <div className={classes.SingleHouse}>
        {" "}
        <div className={classes.header}>
          <div className={classes.SlideShow}>
            <div><SlideShoww /></div>
          </div>
        </div>
      </div>
    );
  }
}
export default SingleHouse;
