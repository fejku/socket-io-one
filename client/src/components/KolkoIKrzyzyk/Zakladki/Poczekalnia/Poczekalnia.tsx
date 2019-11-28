import React, { useContext } from "react";

import { KikSocketContext } from "../../KolkoIKrzyzyk";
import Zakladka from "../Zakladka/Zakladka";
import DodajPokoj from "./DodajPokoj/DodajPokoj";
import Pokoje from "./Pokoje/Pokoje";

import { dajSocketId } from "../../../../utils";

import "./Poczekalnia.css";

const Poczekalnia: React.FC = () => {
  const socket = useContext(KikSocketContext);

  const nazwa = sessionStorage.getItem("nazwa uzytkownika");

  return (
    <Zakladka>
      <div className="poczekalnia">
        <p>Użytkownik {nazwa} Socket id: {socket && dajSocketId(socket.id)} </p>
        <DodajPokoj />
        <hr/>
        <Pokoje />
      </div>
    </Zakladka>
  );
};

export default Poczekalnia;
