import React from 'react';
import Pole from './Pole/Pole';

import { SocketContext } from '../../../KolkoIKrzyzyk';

import './Plansza.css';

function Plansza({statusAktywny, planszaState: [plansza, setPlansza], aktywnyGracz}) {
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

  const handlePoleClick = (index) => {
    if (czyPoleAktywne(plansza[index])) {
      const nowaPlansza = [...plansza];
      nowaPlansza[index] = aktywnyGracz;
      setPlansza(nowaPlansza);

      socket.emit('move', index);
    }    
  };

  const listaPol = plansza.map((pole, index) => {
    return <Pole 
      key={index} 
      id={index} 
      wartosc={plansza[aktywnyGracz]}
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
