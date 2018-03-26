import React, { Component } from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "react-router-redux";
import { withRouter } from "react-router";
import { Provider } from "react-redux";
import App from "./App";

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    const ConnectedApp = withRouter(App);
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConnectedApp />
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
