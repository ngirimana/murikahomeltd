import React from "react";
import classes from "./DropdownList.module.scss";

let key = 1;
const DropdownList = (props) => (
  <div className={classes.DropdownListContainer}>
    <select
      value={props.value}
      onChange={props.onChange}
      className={classes.DropdownList}
      name={props.name}
    >
      {props.options.map((option) => (
        <option value={option} key={key++}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default DropdownList;
