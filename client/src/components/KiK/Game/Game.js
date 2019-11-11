import React, { useContext } from 'react';
import Plansza from './Plansza/Plansza';
import {KiKSocketContext} from './../KiK';

const Game = () => {
  const socket = useContext(KiKSocketContext);

  return (
    <React.Fragment>
      <p>Socket id: {socket.id}</p>
      <Plansza />
    </React.Fragment>
  )
}

export default Game;