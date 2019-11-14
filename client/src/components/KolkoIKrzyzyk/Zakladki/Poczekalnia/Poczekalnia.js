import React, { useContext } from 'react';
import Zakladka from '../Zakladka/Zakladka';
import Pokoje from './Pokoje/Pokoje';
import { SocketContext } from '../../KolkoIKrzyzyk';

import './Poczekalnia.css';
import DodajPokoj from './DodajPokoj/DodajPokoj';

const Poczekalnia = () => {
  const socket = useContext(SocketContext);

   return (
    <Zakladka>
      <div className="poczekalnia">
        <p>Socket id: {socket.id}</p>
        <DodajPokoj />
        <hr/>      
        <Pokoje />
      </div>
    </Zakladka>
  );
}

export default Poczekalnia;