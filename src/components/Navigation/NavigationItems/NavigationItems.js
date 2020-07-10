import React from "react";
import classes from "./NavigationItems.module.css";
import Auxilary from "../../../hoc/Auxiliary/Auxiliary";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Home
    </NavigationItem>
    {!props.isAuthenticated ? (
      <Auxilary>
        <NavigationItem link="/auth">Account</NavigationItem>
        <NavigationItem link="/houses/id">SingleHouse</NavigationItem>
      </Auxilary>
    ) : (
      <Auxilary>
        {" "}
        <NavigationItem link="/add-house">AddHouse</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Auxilary>
    )}
  </ul>
);

export default navigationItems;
