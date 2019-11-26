import React, { useContext } from 'react';
import Pole from './Pole/Pole';

import { SocketContext } from '../../../KolkoIKrzyzyk';

import './Plansza.css';

function Plansza({statusAktywny, planszaState: [plansza, setPlansza], aktywnyGracz, pokoj}) {
  const socket = useContext(SocketContext);

  const dajKlasy = (index) => {
    let result = [];
    if ([1, 4, 7].includes(index)) {
      result.push('pion');
    }
    if([3, 4, 5].includes(index)) {
      result.push('poziom')
    }
    return result;
  }

  const czyPoleAktywne = (pole) => {
    return statusAktywny && (pole === -1);
  }

  const handlePoleClick = (poleId) => {
    if (czyPoleAktywne(plansza[poleId])) {
      const nowaPlansza = [...plansza];
      nowaPlansza[poleId] = aktywnyGracz;
      setPlansza(nowaPlansza);

      socket.emit('move', pokoj.id, poleId);
    }    
  };

  const listaPol = plansza.map((pole, index) => {
    return <Pole 
      key={index} 
      id={index} 
      wartosc={plansza[index]}
      klasy={dajKlasy(index)} 
      onClick={handlePoleClick}
    />
  });

  return (
    <div className="plansza">
      {listaPol}
    </div>
  )
}

export default Plansza
