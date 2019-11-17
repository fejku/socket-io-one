import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Nazwa = () => {
  const history = useHistory();
  const location = useLocation();
  const [nazwa, setNazwa] = useState('');

  const { from } = location.state || { from: { pathname: "/" } };

  const handleUstawNazwe = () => {
    sessionStorage.setItem('nazwa uzytkownika', nazwa);
    history.replace(from);
  };

  return (
    <div>
      <input type="text" value={nazwa} onChange={(e) => setNazwa(e.target.value)} />
      <button onClick={handleUstawNazwe}>Zapisz</button>
    </div>
  );
}

export default Nazwa;