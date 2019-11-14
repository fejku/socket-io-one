import React from 'react'

import './Pole.css';

const Pole = ({id, klasy, onClick}) => {

  const dajKlasy = () => {
    const result = ['pole', ...klasy];
    return result.join(' ');
  }

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className={dajKlasy()} onClick={handleClick}>
      
    </div>
  )
}

export default Pole;
