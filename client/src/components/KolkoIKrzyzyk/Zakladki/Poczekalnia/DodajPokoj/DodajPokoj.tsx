import React, { useContext, useState } from "react";
import { SocketContext } from "../../../KolkoIKrzyzyk";
import { ZakladkiContext } from "../../Zakladki";

import { IPokoj } from "model/Pokoj";

import Gra from "../../Gra/Gra";

interface IDodajPokojParam {
  nazwa: string;
}

const DodajPokoj = () => {
  const socket = useContext(SocketContext);
  const [zakladki, setZakladki] = useContext(ZakladkiContext);

  const [nazwaPokoju, setNazwaPokoju] = useState("");

  const handleDodajPokoj = () => {
    if (socket) {
      socket.emit("create room", nazwaPokoju, (pokoj: IPokoj) => {
        socket.emit("join room", pokoj.id);
        //   setZakladki([...zakladki, <Gra nazwa={pokoj._nazwa} pokoj={pokoj} />]);
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
