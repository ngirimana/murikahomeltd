import React from "react";
import classes from "./TextInput.module.scss";

const TextInput = (props) => (
  <div className={classes.TextInputContainer}>
    {props.label && <label className={classes.Label}>{props.label}</label>}
    <input
      className={classes.TextInput}
      type={props.type || "text"}
      value={props.value}
      onChange={(e) => props.onChange(e)}
      placeholder="Price/Month"
      title={props.title}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          props.onFilter();
          return false;
        }
        return true;
      }}
    />
  </div>
);

export default TextInput;
