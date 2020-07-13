import React, { Component } from "react";

const asyncCompnponent = (importedComponent) => {
  return class extends Component {
    state = {
      component: null,
    };
    UNSAFE_componentWillMount() {
      importedComponent().then((cmp) => {
        this.setState({
          component: cmp.default,
        });
      });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};
export default asyncCompnponent;
