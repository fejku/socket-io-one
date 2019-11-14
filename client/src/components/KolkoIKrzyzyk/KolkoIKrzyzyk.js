import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client';

import Zakladki from './Zakladki/Zakladki';

export const SocketContext = React.createContext({});

const KolkoIKrzyzyk = () => {
  const ENDPOINT = 'http://localhost:3001/kik';

  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    const socketIO = socketIOClient(ENDPOINT); 

    socketIO.on('connect', () => {
      setSocket(socketIO);
    });
  }, []);
  
  return (
    <SocketContext.Provider value={socket}>
        {socket && <Zakladki />}
    </SocketContext.Provider>
  )
}

export default KolkoIKrzyzyk;