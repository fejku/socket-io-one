import React from "react";

interface IElementMenuProps {
  index: number;
  nazwa: string;
  onClick: (index: number) => void;
 }

const ElementMenu: React.FC<IElementMenuProps> = ({ index, nazwa, onClick }) => {
  const handleClick = () => {
    onClick(index);
  };

  return <li onClick={handleClick}>{nazwa}</li>;
};

export default ElementMenu;
