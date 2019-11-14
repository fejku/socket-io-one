import React, { useState, useEffect } from 'react'
import Poczekalnia from './Poczekalnia/Poczekalnia';
import ElementMenu from './Elementy/ElementMenu/ElementMenu';

import './Zakladki.css';

export const ZakladkiContext = React.createContext([[], () => {}]);

const Zakladki = () => {
  const [aktualnaZakladka, setAktualnaZakladka] = useState(0);
  const [zakladki, setZakladki] = useState([<Poczekalnia nazwa="Poczekalnia" />]);

  // TODO: Aktualnie tylko dodawnie nowych pokoi, ale w przyszłości trzeba będzie
  // zrobić sprawdzanie z poprzednim stanem (useRef) i jesli pokój został zamknięty
  // to powracać poczekalni
  useEffect(() => {
    const ostatniaZakladka = zakladki.length - 1;
    setAktualnaZakladka(ostatniaZakladka);    
  }, [zakladki])

  const handleMenuClick = (index) => {
    setAktualnaZakladka(index);
  }

  return (
    <ZakladkiContext.Provider value={[zakladki, setZakladki]}>
      <div>
        <ul className="zakladki">
          {React.Children.map(zakladki, (item, index) => (
            <ElementMenu 
              key={index}
              index={index} 
              nazwa={item.props.nazwa} 
              onClick={handleMenuClick}
            />
          ))}
        </ul>
        {React.Children.toArray(zakladki)[aktualnaZakladka]}
      </div>
    </ZakladkiContext.Provider>
  )
}

export default Zakladki
