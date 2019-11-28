import React from "react";

import "./Pole.css";

interface IPoleProps {
  id: number;
  wartosc: number;
  klasy: string[];
  onClick: (id: number) => void;
}

const Pole: React.FC<IPoleProps> = ({ id, wartosc, klasy, onClick }) => {

  const dajKlasy = () => {
    const result = ["pole", ...klasy];
    return result.join(" ");
  };

  const dajSymbol = (wartosc: number) => {
    switch (wartosc) {
      case 0: return "O";
      case 1: return "X";
      default: return "";
    }
  };

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className={dajKlasy()} onClick={handleClick}>
      {dajSymbol(wartosc)}
    </div>
  );
};

export default Pole;
