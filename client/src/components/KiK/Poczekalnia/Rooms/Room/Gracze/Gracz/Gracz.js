import React from 'react';

import './Gracz.css';

const Gracz = ({gracz}) => {
  return (
    <div className="gracz" key={gracz}>
      {gracz}
    </div>
  )
}

export default Gracz;