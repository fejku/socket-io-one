import React from "react";

import { IPokoj } from "../../../../../model/IPokoj";

interface IElementMenuProps {
  index: number;
  pokoj: IPokoj;
  onClick: (index: number) => void;
 }

const ElementMenu: React.FC<IElementMenuProps> = ({ index, pokoj, onClick }) => {
  const handleClick = () => {
    onClick(index);
  };

  return <li onClick={handleClick}>{pokoj.nazwa}</li>;
};

export default ElementMenu;
