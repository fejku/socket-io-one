import React, { useState, useEffect, useContext } from 'react';
import Rooms from './Rooms/Rooms';
import { KiKSocketContext } from './../KiK';

import './Poczekalnia.css';

const Poczekalnia = () => {
  const socket = useContext(KiKSocketContext);

  const [rooms, setRooms] = useState([]);
  const [nazwaPokoju, setNazwaPokoju] = useState('');

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
    socket.emit('create room', nazwaPokoju);
  };

  return (
    <div className="poczekalnia">
      <p>Socket id: {socket.id}</p>
      <div>
        <label htmlFor="">Nazwa pokoju:</label>
        <input type="text" value={nazwaPokoju} onChange={e => setNazwaPokoju(e.target.value)}></input>        
        <button onClick={handleCreateRoom}>Create room</button>        
      </div>
      <hr/>      
      <Rooms rooms={rooms} />
    </div>
  );
}

export default Poczekalnia;