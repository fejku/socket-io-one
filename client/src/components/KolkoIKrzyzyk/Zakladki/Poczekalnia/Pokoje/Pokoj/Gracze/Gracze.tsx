import React from "react";
import Gracz from "./Gracz/Gracz";

import { IGracz } from "./../../../../../../../model/IGracz";

import "./Gracze.css";

interface IGraczeProps {
  gracze: IGracz[];
}

const Gracze: React.FC<IGraczeProps> = ({ gracze }) => {

  return (
    <div className="gracze">
      {gracze.map((gracz) => <Gracz key={gracz.uzytkownik.socketId} gracz={gracz} />)}
    </div>
  );
};

export default Gracze;
