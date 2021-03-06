import React from "react";
import StartScreen from "./containers/StartScreen";
import GameScreen from "./containers/GameScreen";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./assets/styles/App.css";

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route exact={true} path="/" component={StartScreen} />
        <Route path={"/game"} component={GameScreen} />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default App;
