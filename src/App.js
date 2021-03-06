import classes from "./App.module.css";
import "antd/dist/antd.css";
import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./component/home/Home";
import Login from "./component/login/Login";

function App() {
  return (
    <div className={classes.app}>
      <Router>
        <Switch>
          <PrivateRoute path="/home">
            <Home/>
          </PrivateRoute>
          <Route path="/login">
            <Login/>
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
