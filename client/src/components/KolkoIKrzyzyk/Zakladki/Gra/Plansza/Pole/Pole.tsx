import React from "react";

import "./Pole.css";

interface IPoleProps {
  id: number;
  wartosc: number;
  onClick: (id: number) => void;
}

const Pole: React.FC<IPoleProps> = ({ id, wartosc, onClick }) => {

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
    <div className="pole" onClick={handleClick}>
      {dajSymbol(wartosc)}
    </div>
  );
};

export default Pole;
