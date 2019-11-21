import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import Zakladki from "./Zakladki/Zakladki";

export const SocketContext = React.createContext<SocketIOClient.Socket>(undefined);

const KolkoIKrzyzyk = () => {
  const ENDPOINT = "http://localhost:3001/kik";

  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(undefined);

  useEffect(() => {
    const socketIO = socketIOClient(ENDPOINT);

    socketIO.on("connect", () => {
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
