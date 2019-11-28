import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import Zakladki from "./Zakladki/Zakladki";

import { SocketEvent } from "../../model/SocketEvent";

export const KikSocketContext = React.createContext<SocketIOClient.Socket | null>(null);

const KolkoIKrzyzyk: React.FC = () => {
  const ENDPOINT = "http://localhost:3001/kik";

  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const socketIO = socketIOClient(ENDPOINT);

    socketIO.on(SocketEvent.CONNECT, () => {
      setSocket(socketIO);
    });
  }, []);

  return (
    <KikSocketContext.Provider value={socket}>
        {socket && <Zakladki />}
    </KikSocketContext.Provider>
  );
};

export default KolkoIKrzyzyk;
