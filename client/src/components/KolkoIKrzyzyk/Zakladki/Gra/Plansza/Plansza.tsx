import React, { Dispatch, SetStateAction, useContext } from "react";

import { KikSocketContext } from "./../../../KolkoIKrzyzyk";

import { IPokoj } from "./../../../../../model/IPokoj";

import Pole from "./Pole/Pole";

import "./Plansza.css";

interface IPlanszaProps {
  statusAktywny: boolean;
  planszaState: [number[], Dispatch<SetStateAction<number[]>>];
  aktywnyGracz: number;
  pokoj: IPokoj;
}

const Plansza: React.FC<IPlanszaProps> =
  ({ statusAktywny, planszaState: [plansza, setPlansza], aktywnyGracz, pokoj }) => {

  const socket = useContext(KikSocketContext);

  const dajKlasy = (index: number) => {
    const result = [];

    if ([1, 4, 7].includes(index)) {
      result.push("pion");
    }

    if ([3, 4, 5].includes(index)) {
      result.push("poziom");
    }

    return result;
  };

  const czyPoleAktywne = (pole: number) => {
    return statusAktywny && (pole === -1);
  };

  const handlePoleClick = (poleId: number) => {
    if (czyPoleAktywne(plansza[poleId])) {
      const nowaPlansza = [...plansza];
      nowaPlansza[poleId] = aktywnyGracz;
      setPlansza(nowaPlansza);

      if (socket) {
        socket.emit("move", pokoj.id, poleId);
      }
    }
  };

  const listaPol = plansza.map((pole, index) => {
    return <Pole
      key={index}
      id={index}
      wartosc={plansza[index]}
      klasy={dajKlasy(index)}
      onClick={handlePoleClick}
    />;
  });

  return (
    <div className="plansza">
      {listaPol}
    </div>
  );
};

export default Plansza;
