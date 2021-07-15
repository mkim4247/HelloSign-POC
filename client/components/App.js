import React from "react";
import Home from "./Home";
import Success from "./Success";
import { withRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/success" component={Success} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
