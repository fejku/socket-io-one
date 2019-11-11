import React, { useEffect, useContext } from 'react';
import Gracze from './Gracze/Gracze';
import { KiKSocketContext, KiKPoczekalniaContext } from './../../../KiK';

import './Room.css'

const Room = ({room}) => {
  const socket = useContext(KiKSocketContext);
  const setPoczekalnia = useContext(KiKPoczekalniaContext);

  const iloscGraczy = room.gracze.length;
  const czyPokojPelny = iloscGraczy === 2 ? '(Full)' : '';
  const czyGraczWPokoju = room.gracze.includes(socket.id);
  const napisIloscGraczy = iloscGraczy + '/2';

  useEffect(() => {
    socket.on('start game', () => {
      // history.push('/kik/game', {socket: 'qwe'});
      setPoczekalnia(false);
    });

    return () => {
      socket.off('start game');
    };
  }, []);

  const handleDolaczDoPokoju = () => {
    socket.emit('join room', room.nazwa)
  }; 

  return (
    <div className="room" key={room.nazwa}>
      <div className="room_name">
        {room.nazwa} - {napisIloscGraczy} {czyPokojPelny}
        {czyGraczWPokoju || czyPokojPelny ? null : <button onClick={handleDolaczDoPokoju}>Dołącz</button>}        
      </div>            
      <Gracze gracze={room.gracze} />  
    </div>
  )
}

export default Room;