import React, { useState, useEffect, useContext } from 'react';
import Plansza from './Plansza/Plansza';
import {KiKSocketContext} from './../KiK';

import './Game.css';

const Game = () => {
  const socket = useContext(KiKSocketContext);

  const [plansza, setPlansza] = useState([]);
  const [aktywnyGracz, setAktywnyGracz] = useState(0);
  const [statusAktywny, setStatusAktywny] = useState(false);

  useEffect(() => {
    socket.on('my turn', (plansza, aktywnyGracz) => {
      console.log('my turn', plansza, aktywnyGracz);
      
      setPlansza(plansza);
      setAktywnyGracz(aktywnyGracz);
      setStatusAktywny(true);
    });

    return () => {
      socket.off('my turn');
    }
  }, []);

  return (
    <div className="game">
      <div className="title">
        <p>Socket id: {socket.id}</p>
        <p>Tura: {aktywnyGracz === 0 ? 'O' : 'X'}</p>
      </div>      
      <Plansza statusAktywny={statusAktywny} plansza={plansza} />
      {JSON.stringify(plansza)}
    </div>
  ) 
}

export default Game;