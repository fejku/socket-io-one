import React, { useContext } from 'react';
import Plansza from './Plansza/Plansza';
import {KiKSocketContext} from './../KiK';

import './Game.css';

const Game = () => {
  const socket = useContext(KiKSocketContext);

  return (
    <div className="game">
      <div className="title">
        <p>Socket id: {socket.id}</p>
        <p>Tura: </p>
      </div>      
      <Plansza />
    </div>
  ) 
}

export default Game;