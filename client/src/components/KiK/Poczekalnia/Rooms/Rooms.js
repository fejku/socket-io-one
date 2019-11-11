import React from 'react';
import Room from './Room/Room';

import './Rooms.css';

const Rooms = ({rooms}) => {

  const roomsList = rooms.map(room => <Room key={room} room={room} />);

  return (
    <div className="rooms">
      <h3>Rooms List</h3>
      {roomsList}
    </div>
  );
}

export default Rooms;