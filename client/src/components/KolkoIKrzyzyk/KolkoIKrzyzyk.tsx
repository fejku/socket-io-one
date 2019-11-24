import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import Zakladki from "./Zakladki/Zakladki";

export const SocketContext = React.createContext<SocketIOClient.Socket | null>(null);

const KolkoIKrzyzyk = () => {
  const ENDPOINT = "http://localhost:3001/kik";

  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const socketIO = socketIOClient(ENDPOINT);
console.log('connected kik');
    socketIO.on("connect", () => {
      console.log('connected3 kik');
      setSocket(socketIO);
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
        {socket && <Zakladki />}
    </SocketContext.Provider>
  );
};

export default KolkoIKrzyzyk;
