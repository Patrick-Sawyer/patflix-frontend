import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Signin} />
          <Route exact path={"/signup"} component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
