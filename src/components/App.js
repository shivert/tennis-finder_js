/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import { Switch, NavLink, Route } from "react-router-dom";
import FuelSavingsPage from "./containers/FuelSavingsPage";
import AboutPage from "./AboutPage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./containers/LoginPage";
import RegistrationPage from "./containers/RegistrationPage";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <div>
          <NavLink exact to="/" activeStyle={activeStyle}>
            Home
          </NavLink>
          {" | "}
          <NavLink to="/fuel-savings" activeStyle={activeStyle}>
            Demo App
          </NavLink>
          {" | "}
          <NavLink to="/about" activeStyle={activeStyle}>
            About
          </NavLink>
        </div> */}
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
          <Route path="/fuel-savings" component={FuelSavingsPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
