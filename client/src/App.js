import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './global/Header';
import Home from './components/Home/Home';
import KolkoIKrzyzyk from './components/KolkoIKrzyzyk/KolkoIKrzyzyk';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/kik" component={KolkoIKrzyzyk} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
