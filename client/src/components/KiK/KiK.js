import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client';
import { isObjectEmpty } from './../../utils';
import Poczekalnia from './Poczekalnia/Poczekalnia';
import Game from './Game/Game';

export const KiKSocketContext = React.createContext({});
export const KiKPoczekalniaContext = React.createContext(() => {});

const KiK = () => {
  const ENDPOINT = 'http://localhost:3001/kik';

  const [socket, setSocket] = useState({});
  const [czyPoczekalnia, setCzyPoczekalnia] = useState(true);
  
  const czySocket = isObjectEmpty(socket) === false;

  useEffect(() => {
    const socketIO = socketIOClient(ENDPOINT);
    setSocket(socketIO);
  }, []);

  return (
    <KiKSocketContext.Provider value={socket}>
      <KiKPoczekalniaContext.Provider value={setCzyPoczekalnia}>
        {czySocket && (czyPoczekalnia ? <Poczekalnia /> : <Game />)}
      </KiKPoczekalniaContext.Provider>
    </KiKSocketContext.Provider>
  )
}

export default KiK;