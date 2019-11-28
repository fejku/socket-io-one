import React from "react";

import { IGracz } from "./../../../../../../../../model/IGracz";

import "./Gracz.css";

interface IGraczProps {
  gracz: IGracz;
}

const Gracz: React.FC<IGraczProps> = ({gracz}) => {
  return (
    <div className="gracz">
      {gracz.uzytkownik.nazwa}
    </div>
  );
};

export default Gracz;
