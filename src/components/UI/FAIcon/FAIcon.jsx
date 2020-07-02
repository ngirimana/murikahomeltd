import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./FAIcon.module.scss";

const FAIcon = (props) => (
  <FontAwesomeIcon icon={props.icon} className={classes.FAIcon} />
);
export default FAIcon;
