import React, { useContext } from "react";
import Gra from "./../../../Gra/Gra";
import Zakladka from "./../../../Zakladka/Zakladka";
import Gracze from "./Gracze/Gracze";

import { SocketContext } from "./../../../../KolkoIKrzyzyk";
import { ZakladkiContext } from "./../../../Zakladki";

import { IPokoj } from "./../../../../../../model/IPokoj";

import "./Pokoj.css";

interface IPokojProps {
  pokoj: IPokoj;
}

const Pokoj: React.FC<IPokojProps> = ({ pokoj }) => {
  const socket = useContext(SocketContext);
  const [zakladki, setZakladki] = useContext(ZakladkiContext);

  const iloscGraczy = pokoj.gra.gracze.length;
  const czyPokojPelny = iloscGraczy === 2 ? "(Full)" : "";
  const czyGraczWPokoju = pokoj.gra.gracze.includes(socket.id);
  const napisIloscGraczy = iloscGraczy + "/2";

  const handleDolaczDoPokoju = () => {
    if (socket) {
      socket.emit("join room", pokoj.id);
    }
    setZakladki([...zakladki, <Gra nazwa={pokoj.nazwa} pokoj={pokoj} />])
  };

  return (
    <Zakladka>
      <div className="pokoj" key={pokoj.id}>
        <div className="pokoj_name">
          {pokoj.nazwa} - {napisIloscGraczy} {czyPokojPelny}
          {czyGraczWPokoju || czyPokojPelny ? null : <button onClick={handleDolaczDoPokoju}>Dołącz</button>}
        </div>
        <Gracze gracze={pokoj.gra.gracze} />
      </div>
    </Zakladka>
  );
};

export default Pokoj;
