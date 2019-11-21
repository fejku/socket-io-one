import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Nazwa: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [nazwa, setNazwa] = useState("");

  const { from } = location.state || { from: { pathname: "/" } };

  const handleZmienNazwe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNazwa(e.target.value);
  };

  const handleUstawNazwe = () => {
    sessionStorage.setItem("nazwa uzytkownika", nazwa);
    history.replace(from);
  };

  return (
    <div>
      <input type="text" value={nazwa} onChange={handleZmienNazwe} />
      <button onClick={handleUstawNazwe}>Zapisz</button>
    </div>
  );
};

export default Nazwa;
