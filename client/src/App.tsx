import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";

import Home from "./components/Home/Home";
import KolkoIKrzyzyk from "./components/KolkoIKrzyzyk/KolkoIKrzyzyk";
import Nazwa from "./components/Nazwa";
import NazwaRoute from "./components/NazwaRoute";
import Header from "./global/Header";
import { getUUIDv4 } from "./utils";

import "./App.css";

const App: React.FC = () => {
  const ENDPOINT = "http://localhost:3001/users";

  useEffect(() => {
    let uuid = sessionStorage.getItem("uuid");
    if (uuid === null) {
      uuid = getUUIDv4();
      sessionStorage.setItem("uuid", uuid);
    }

    const socketIO = socketIOClient(ENDPOINT);
    socketIO.emit("init", uuid);
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
