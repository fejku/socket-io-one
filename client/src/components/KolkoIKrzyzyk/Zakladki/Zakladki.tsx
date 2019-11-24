import React, { useEffect, useState } from "react";
import ElementMenu from "./Elementy/ElementMenu/ElementMenu";
import Poczekalnia from "./Poczekalnia/Poczekalnia";

import "./Zakladki.css";

export const ZakladkiContext = React.createContext([[], () => {}]);

const Zakladki: React.FC = () => {
  const [aktualnaZakladka, setAktualnaZakladka] = useState(0);
  const [zakladki, setZakladki] = useState([<Poczekalnia nazwa="Poczekalnia" />]);

  // TODO: Aktualnie tylko dodawnie nowych pokoi, ale w przyszłości trzeba będzie
  // zrobić sprawdzanie z poprzednim stanem (useRef) i jesli pokój został zamknięty
  // to powracać do poczekalni? a może zawsze powrót do ostatniego pokoju?
  useEffect(() => {
    const ostatniaZakladka = zakladki.length - 1;
    setAktualnaZakladka(ostatniaZakladka);
  }, [zakladki]);

  const handleMenuClick = (index: number) => {
    setAktualnaZakladka(index);
  };

  return (
    // <ZakladkiContext.Provider value={[zakladki, setZakladki]}>
      <div className="zakladki">
        {/* <ul className="zakladki_menu">
          {React.Children.map(zakladki, (item, index) => (
            <ElementMenu
              key={index}
              index={index}
              nazwa={item.props.nazwa}
              onClick={handleMenuClick}
            />
          ))}
        </ul>
        {React.Children.toArray(zakladki)[aktualnaZakladka]} */}
      </div>
    // </ZakladkiContext.Provider>
  );
};

export default Zakladki;
