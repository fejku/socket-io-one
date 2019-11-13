import React, { useState, useEffect, useContext } from 'react';
import Rooms from './Rooms/Rooms';
import { KiKSocketContext, KiKPoczekalniaContext } from './../KiK';

import './Poczekalnia.css';

const Poczekalnia = () => {
  const socket = useContext(KiKSocketContext);
  const setPoczekalnia = useContext(KiKPoczekalniaContext);

  const [rooms, setRooms] = useState([]);
  const [nazwaPokoju, setNazwaPokoju] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    socket.emit('get rooms', (rooms) => {     
      setRooms(rooms);
    });

    socket.on('refresh rooms', (rooms) => {
      console.log('refresh rooms', rooms);
      setRooms(rooms);
    });  

    //unmount
    return () => {
      socket.off('refresh rooms');
    }
  }, [socket]);  

  const handleCreateRoom = () => {
    socket.emit('join room', nazwaPokoju, true, (result) => {
      if (result) {
        setPoczekalnia(false);
      } else {
        setError('Istnieje pokój o takiej nazwie');
      }
    });    
  };

  return (
    <div className="poczekalnia">
      <p>Socket id: {socket.id}</p>
      <div>
        <label htmlFor="">Nazwa pokoju:</label>
        <input type="text" value={nazwaPokoju} onChange={e => setNazwaPokoju(e.target.value)}></input>        
        <button onClick={handleCreateRoom}>Create room</button>
        {error && <p>{error}</p>}
      </div>
      <hr/>      
      <Rooms rooms={rooms} />
    </div>
  );
}

export default Poczekalnia;