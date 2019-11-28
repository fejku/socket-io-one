import React, { useContext } from "react";
import Zakladka from "./../../../Zakladka/Zakladka";
import Gracze from "./Gracze/Gracze";

import { KikSocketContext } from "./../../../../KolkoIKrzyzyk";
import { ZakladkiContext } from "./../../../Zakladki";

import { dajSocketId } from "../../../../../../utils";
import { IPokoj } from "./../../../../../../model/IPokoj";

import "./Pokoj.css";

interface IPokojProps {
  pokoj: IPokoj;
}

const Pokoj: React.FC<IPokojProps> = ({ pokoj }) => {
  const socket = useContext(KikSocketContext);
  const [zakladki, setZakladki] = useContext(ZakladkiContext);

  const iloscGraczy = pokoj.gra.gracze.length;
  const czyPokojPelny = iloscGraczy === 2 ? "(Full)" : "";
  const napisIloscGraczy = iloscGraczy + "/2";

  const czyGraczWPokoju = () => {
    if (socket) {
      for (const gracz of pokoj.gra.gracze) {
        if (gracz.uzytkownik.socketId === dajSocketId(socket.id)) {
          return true;
        }
      }
    }

    return false;
  };

  const handleDolaczDoPokoju = () => {
    if (socket) {
      socket.emit("join room", pokoj.id);
    }
    setZakladki([...zakladki, pokoj]);
  };

  return (
    <Zakladka>
      <div className="pokoj" key={pokoj.id}>
        <div className="pokoj_name">
          {pokoj.nazwa} - {napisIloscGraczy} {czyPokojPelny}
          {czyGraczWPokoju() || czyPokojPelny ? null : <button onClick={handleDolaczDoPokoju}>Dołącz</button>}
        </div>
        <Gracze gracze={pokoj.gra.gracze} />
      </div>
    </Zakladka>
  );
};

export default Pokoj;
