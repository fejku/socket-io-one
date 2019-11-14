import React from 'react';

const ElementMenu = ({index, nazwa, onClick}) => {
  const handleClick = () => {
    onClick(index);
  }

  return <li onClick={handleClick}>{nazwa}</li>
};

export default ElementMenu;