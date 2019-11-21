import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import KolkoIKrzyzyk from "./components/KolkoIKrzyzyk/KolkoIKrzyzyk";
import Nazwa from "./components/Nazwa";
import NazwaRoute from "./components/NazwaRoute";
import Header from "./global/Header";
import { getUUIDv4 } from "./utils";

import "./App.css";

const App: React.FC = () => {

  useEffect(() => {
    if (sessionStorage.getItem("uuid") === null) {
      sessionStorage.setItem("uuid", getUUIDv4());
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/nazwa" component={Nazwa} />
          <NazwaRoute exact path="/kik">
            <KolkoIKrzyzyk />
          </NazwaRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
