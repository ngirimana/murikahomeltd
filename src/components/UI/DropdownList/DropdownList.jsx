import React from "react";
import classes from "./DropdownList.module.scss";

let key = 1;
const DropdownList = (props) => {
  const customProps = {};
  if (props.disabled) {
    customProps["disabled"] = true;
  }
  return (
    <div className={classes.DropdownListContainer}>
      <span className={classes.Label}>{props.name}</span>
      <select
        value={props.value}
        onChange={props.onChange}
        className={classes.DropdownList}
        name={props.name}
        {...customProps}
      >
        {props.options.map((option) => (
          <option value={option} key={key++}>
            {option}
          </option>
        ))}
        {customProps.disabled && <option>All</option>}
      </select>
    </div>
  );
};

export default DropdownList;
