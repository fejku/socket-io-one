import React from 'react'

import './Pole.css';

const Pole = ({id, klasy}) => {
  const handlePoleClick = () => {
    console.log(id);
    
  };

  return (
    <div className={`pole${klasy ? ` ${klasy}` : ''}`} onClick={handlePoleClick}>
      
    </div>
  )
}

export default Pole
