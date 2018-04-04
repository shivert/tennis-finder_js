/* eslint-disable import/no-named-as-default */
import React from "react";
import { Switch, Route } from "react-router-dom";

import LoginPage from "./containers/LoginPage";
import RegistrationPage from "./containers/RegistrationPage";
import TopLevelContainer from "./containers/TopLevelContainer";

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
          <Route component={TopLevelContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
