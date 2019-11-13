import React, { useState, useEffect, useContext } from 'react';
import Plansza from './Plansza/Plansza';
import {KiKSocketContext} from './../KiK';

import './Game.css';

const Game = () => {
  const socket = useContext(KiKSocketContext);

  const [plansza, setPlansza] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const [aktywnyGracz, setAktywnyGracz] = useState(0);
  const [statusAktywny, setStatusAktywny] = useState(false);

  useEffect(() => {   
    // socket.emit('ready');
    socket.on('my turn', (plansza, aktywnyGracz) => {
      console.log('my turn');
      
      setPlansza(plansza);
      setAktywnyGracz(aktywnyGracz);
      setStatusAktywny(true);
    });

    return () => {
      socket.off('my turn');
    }
  }, [socket]);

  useEffect(() => {
    console.log('qwe');
    
  }, [plansza]);

  return (
    <div className="game">
      <div className="title">
        <p>Socket id: {socket.id}</p>
        {/* <p>Tura: {aktywnyGracz === 0 ? 'O' : 'X'}</p> */}
        <p>Oczekiwanie na przeciwnika</p>
      </div>      
      <Plansza statusAktywny={statusAktywny} planszaState={[plansza, setPlansza]} aktywnyGracz={aktywnyGracz} />
    </div>
  ) 
}

export default Game;