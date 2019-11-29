import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

import { KikSocketContext } from "../../KolkoIKrzyzyk";

import { dajSocketId } from "../../../../utils";
import { ZakladkiContext } from "../Zakladki";
import { IPokoj } from "./../../../../model/IPokoj";
import { KikRoomSocketEvent, KikSocketEvent } from "./../../../../model/SocketEvent";

import KoniecGryModal from "./KoniecGryModal";
import Plansza from "./Plansza/Plansza";

import "./Gra.css";

interface IGraProps {
  pokoj: IPokoj;
  setAktualnaZakladka: Dispatch<SetStateAction<number>>;
}

const Gra: React.FC<IGraProps> = ({ pokoj, setAktualnaZakladka }) => {
  const socket = useContext(KikSocketContext);
  const [zakladki, setZakladki] = useContext(ZakladkiContext);

  const [plansza, setPlansza] = useState(
    [
      -1, -1, -1,
      -1, -1, -1,
      -1, -1, -1,
    ]);
  const [statusAktywny, setStatusAktywny] = useState(false);
  const [status, setStatus] = useState("Oczekiwanie na przeciwnika");
  const [aktywnyGracz, setAktywnyGracz] = useState(0);

  const nazwa = sessionStorage.getItem("nazwa uzytkownika");

  useEffect(() => {
    if (socket) {
      socket.emit(KikSocketEvent.READY, pokoj.id);

      socket.on(KikSocketEvent.MY_TURN, (plansza: number[], aktywnyGracz: number) => {
        setStatusAktywny(true);
        setStatus("Moja tura");
        setPlansza(plansza);
        setAktywnyGracz(aktywnyGracz);
      });

      socket.on(KikSocketEvent.OPPONENT_TURN, (plansza: number[]) => {
        setStatusAktywny(false);
        setStatus("Tura przeciwnika");
        setPlansza(plansza);
      });

      socket.on(KikSocketEvent.END, (plansza: number[], result: string) => {
        setStatusAktywny(false);
        setStatus(wynik(result));
        setPlansza(plansza);

        setKomnunikatModalKoniecGry(wynik(result));
      });
    }

    return () => {
      if (socket) {
        socket.off(KikSocketEvent.MY_TURN);
        socket.off(KikSocketEvent.OPPONENT_TURN);
      }
    };
  }, [socket, pokoj]);

  const wynik = (result: string) => {
    switch (result) {
      case "win": return "Wygrana";
      case "lose": return "Przegrana";
      case "tie": return "Remis";
      default: return "";
    }
  };

  const [komnunikatModalKoniecGry, setKomnunikatModalKoniecGry] = useState("");

  const handleZagrajPonownie = () => {
    setPlansza([
      -1, -1, -1,
      -1, -1, -1,
      -1, -1, -1,
    ]);
    setStatusAktywny(false);
    setStatus("Oczekiwanie na przeciwnika");
    setAktywnyGracz(0);
    setKomnunikatModalKoniecGry("");
    if (socket) {
      socket.emit(KikSocketEvent.READY, pokoj.id);
    }
  };

  const handleWyjdz = () => {
    if (socket) {
      socket.emit(KikRoomSocketEvent.LEAVE_ROOM, pokoj.id, () => {
        const noweZakladki = zakladki.filter((z) => z.id !== pokoj.id);
        setAktualnaZakladka(noweZakladki.length);
        setZakladki(noweZakladki);
      });
    }
  };

  return (
    <div className="gra">
      <KoniecGryModal tytul={komnunikatModalKoniecGry} onZagrajPonownie={handleZagrajPonownie} onWyjdz={handleWyjdz} />
      <div className="tytul">
        <p>Użytkownik {nazwa} Socket id: {socket && dajSocketId(socket.id)} </p>
        <p>{status}</p>
      </div>
      <Plansza
        statusAktywny={statusAktywny}
        planszaState={[plansza, setPlansza]}
        aktywnyGracz={aktywnyGracz}
        pokoj={pokoj}
      />
    </div>
  );
};

export default Gra;
