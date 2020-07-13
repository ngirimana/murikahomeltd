import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "./hoc/AsyncComponent/AsyncComponent";
import Layout from "./hoc/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout.jsx";
import HomePage from "./containers/HomePage/HomePage";
import classes from "./App.module.scss";
import HousePage from "./containers/HousesPage/Houses";
import * as actions from "./store/actions/index";
import SingleHouse from "./containers/singleHouse/SingleHouse.jsx";
const asyncSignup = asyncComponent(() => {
  return import("./containers/Auth/Signup.jsx");
});
const asyncLogin = asyncComponent(() => {
  return import("./containers/Auth/Login.jsx");
});
const asyncAddHouse = asyncComponent(() => {
  return import("./containers/house/Addhouse.jsx");
});

class App extends Component {
  UNSAFE_componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={asyncLogin} />
        <Route path="/auth" component={asyncSignup} />
        <Route path="/sinlgeHouse" component={SingleHouse} />
        <Route path="/houses/" exact component={HousePage} />
        <Route path="/houses/:id" exact component={SingleHouse} />
        <Route
          path="/houses/search-result/:searchQuery"
          exact
          component={HomePage}
        />
        <Route path="/" exact component={HomePage} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/login" component={asyncLogin} />
          <Route path="/auth" component={asyncSignup} />
          <Route path="/add-house" component={asyncAddHouse} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={HomePage} />

          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className={classes.App}>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
