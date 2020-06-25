import React from "react";
import { Link } from "react-router-dom";
import classes from "./CategoryCard.module.scss";

const CategoryCard = (props) => (
  <Link to={props.link} className={classes.CategoryCard}>
    <div>
      <img src={props.icon} alt="" />
    </div>
    <h3 className={classes.CategoryHeader}>{props.title}</h3>
    <p className={classes.CategoryText}>{props.children}</p>
  </Link>
);

export default CategoryCard;
