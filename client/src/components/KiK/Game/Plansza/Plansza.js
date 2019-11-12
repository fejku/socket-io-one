import React from 'react'
import Pole from './Pole/Pole'

import './Plansza.css';

function Plansza() {
  return (
    <div className="plansza">
      <Pole id={0} />
      <Pole id={1} klasy={"pion"} />
      <Pole id={2} />

      <Pole id={3} klasy={"poziom"} />
      <Pole id={4} klasy={"pion poziom"} />
      <Pole id={5} klasy={"poziom"} />

      <Pole id={6} />
      <Pole id={7} klasy={"pion"} />
      <Pole id={8} />            
    </div>
  )
}

export default Plansza
