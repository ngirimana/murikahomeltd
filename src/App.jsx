import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/AsyncComponent/AsyncComponent';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
const asyncSignup = asyncComponent(() => {
  return import('./containers/Auth/Signup.jsx')
})
const asyncLogin = asyncComponent(() => {
  return import('./containers/Auth/Login.jsx')
})
const asyncAddHouse = asyncComponent(() => {
  return import('./containers/house/Addhouse.jsx')
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>

        <Route path="/login" component={ asyncLogin } />
        <Route path="/auth" component={ asyncSignup } />
        <Route path="/add-house" component={ asyncAddHouse } />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated || this.props.isAuth) {
      routes = (
        <Switch>

          <Route path="/login" component={ asyncLogin } />
          <Route path="/auth" component={ asyncSignup } />
          <Route path="/add-house" component={ asyncAddHouse } />
          <Route path="/logout" component={ Logout } />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.signup.token !== null,
    isAuthenticated: state.login.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


