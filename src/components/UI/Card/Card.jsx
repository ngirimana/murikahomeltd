import React from "react";
import classes from "./Card.module.scss";
import CardImage from "../../../assets/images/card-image.jpg";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <Link
      className={classes.Card}
      to={`/houses/${props.id}`}
      onClick={props.clicked}
    >
      <div className={classes.FrontSide}>
        <div className={classes.CardImage}>
          <img src={props.houseImages[0].url || CardImage} alt="" />
        </div>

        <div className={classes.InfoGrid}>
          <div className={classes.Attribute}>
            <strong>Monthly rent:</strong> {props.monthlyRent}RWF
          </div>
          <div className={classes.Attribute}>
            <strong>Rooms</strong>: {props.rooms}
          </div>
          <div className={classes.Attribute}>
            <strong>Location</strong>: {props.district}, {props.sector}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
