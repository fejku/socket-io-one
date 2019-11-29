import React, { useContext, useState } from "react";

import { KikSocketContext } from "./../../../KolkoIKrzyzyk";
import { ZakladkiContext } from "./../../Zakladki";

import { IPokoj } from "./../../../../../model/IPokoj";
import { KikRoomSocketEvent } from "./../../../../../model/SocketEvent";

interface IDodajPokojParam {
  nazwa: string;
}

const DodajPokoj: React.FC = () => {
  const socket = useContext(KikSocketContext);
  const [zakladki, setZakladki] = useContext(ZakladkiContext);

  const [nazwaPokoju, setNazwaPokoju] = useState("");

  const handleDodajPokoj = () => {
    if (socket) {
      socket.emit(KikRoomSocketEvent.CREATE_ROOM, nazwaPokoju, (pokoj: IPokoj) => {
        socket.emit(KikRoomSocketEvent.JOIN_ROOM, pokoj.id, () => {
          setZakladki([...zakladki, pokoj]);
        });
      });
    }
    setNazwaPokoju("");
  };

  return (
    <div>
      <label htmlFor="">Nazwa pokoju:</label>
      <input type="text" value={nazwaPokoju} onChange={(e) => setNazwaPokoju(e.target.value)}></input>
      <button onClick={handleDodajPokoj}>Create room</button>
    </div>
  );
};

export default DodajPokoj;
