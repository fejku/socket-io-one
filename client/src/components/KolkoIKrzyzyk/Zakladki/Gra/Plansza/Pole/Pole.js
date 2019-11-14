import React from 'react'

import './Pole.css';

const Pole = ({id, wartosc, klasy, onClick}) => {

  const dajKlasy = () => {
    const result = ['pole', ...klasy];
    return result.join(' ');
  }

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className={dajKlasy()} onClick={handleClick}>
      {wartosc}
    </div>
  )
}

export default Pole;
