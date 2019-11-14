import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client';
import { isObjectEmpty } from '../../utils';

import Zakladki from './Zakladki/Zakladki';

export const SocketContext = React.createContext({});

const KolkoIKrzyzyk = () => {
  const ENDPOINT = 'http://localhost:3001/kik';

  const [socket, setSocket] = useState({});
  
  useEffect(() => {
    const socketIO = socketIOClient(ENDPOINT); 
      
    socketIO.on('connect', () => {
      setSocket(socketIO);
    })
  }, []);

  const czySocket = isObjectEmpty(socket) === false;
  
  return (
    <SocketContext.Provider value={socket}>
        {czySocket && <Zakladki />}
    </SocketContext.Provider>
  )
}

export default KolkoIKrzyzyk;