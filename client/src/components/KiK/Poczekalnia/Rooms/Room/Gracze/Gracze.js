import React from 'react';
import Gracz from './Gracz/Gracz'

import './Gracze.css';

const Gracze = ({gracze}) => {

  return (
    <div className="gracze">
      {gracze.map(gracz => <Gracz key={gracz} gracz={gracz} />)}
    </div>
  )
}

export default Gracze;