import React from "react";
import { NavLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <h1>
      Home
      <NavLink to="/kik">Kik</NavLink>
    </h1>
  );
};

export default Home;
