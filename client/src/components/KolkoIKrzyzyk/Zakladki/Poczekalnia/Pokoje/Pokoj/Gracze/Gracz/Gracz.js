import React from 'react';

import './Gracz.css';

const Gracz = ({gracz}) => {
  return (
    <div className="gracz" key={gracz}>
      {gracz.id}
    </div>
  )
}

export default Gracz;