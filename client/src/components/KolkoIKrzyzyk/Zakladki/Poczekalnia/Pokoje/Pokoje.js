import React, { useState, useEffect, useContext } from 'react';
import Pokoj from './Pokoj/Pokoj';

import './Pokoje.css';
import { SocketContext } from '../../../KolkoIKrzyzyk';

const Pokoje = () => {
  const socket = useContext(SocketContext);
    
  const [pokoje, setPokoje] = useState([]);

  useEffect(() => {
    socket.emit('get rooms', (pokoje) => {     
      setPokoje(pokoje);
    });

    socket.on('refresh rooms', (pokoje) => {
      console.log('refresh rooms', pokoje);
      setPokoje(pokoje);
    });  

    //unmount
    return () => {
      socket.off('refresh rooms');
    }
  }, [socket]); 

  const listPokoi = pokoje.map(pokoj => <Pokoj key={pokoj.id} pokoj={pokoj} />);

  return (
    <div className="pokoje">
      <h3>Lista pokoi</h3>
      {listPokoi}
    </div>
  );
}

export default Pokoje;