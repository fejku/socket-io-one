import React, { useContext } from "react";
import { SocketContext } from "../../KolkoIKrzyzyk";
import Zakladka from "../Zakladka/Zakladka";
import Pokoje from "./Pokoje/Pokoje";

import DodajPokoj from "./DodajPokoj/DodajPokoj";
import "./Poczekalnia.css";

const Poczekalnia: React.FC = () => {
  const socket = useContext(SocketContext);

  const nazwa = sessionStorage.getItem("nazwa uzytkownika");

  return (
    <Zakladka>
      <div className="poczekalnia">
        <p>Użytkownik {nazwa} Socket id: {socket && socket.id} </p>
        <DodajPokoj />
        <hr/>
        <Pokoje />
      </div>
    </Zakladka>
  );
};

export default Poczekalnia;
