import React from 'react';

import './Gracz.css';

const Gracz = ({gracz}) => {
  return (
    <div className="gracz" key={gracz}>
      {gracz._id}
    </div>
  )
}

export default Gracz;