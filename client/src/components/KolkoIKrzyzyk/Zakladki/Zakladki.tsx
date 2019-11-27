import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

import { IPokoj } from "../../../model/IPokoj";
import { KikRoomSocketEvent } from "./../../../model/SocketEvent";

import ElementMenu from "./Elementy/ElementMenu/ElementMenu";
import Gra from "./Gra/Gra";
import Poczekalnia from "./Poczekalnia/Poczekalnia";

import { SocketContext } from "../KolkoIKrzyzyk";

import "./Zakladki.css";

export const ZakladkiContext = React.createContext<[IPokoj[], Dispatch<SetStateAction<IPokoj[]>>]>([[], () => {}]);

const Zakladki: React.FC = () => {
  const socket = useContext(SocketContext);

  const [aktualnaZakladka, setAktualnaZakladka] = useState(0);
  const [zakladki, setZakladki] = useState<IPokoj[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on(KikRoomSocketEvent.GET_MY_ROOMS, (pokoje: IPokoj[]) => {
        setZakladki(pokoje);
      });
    }

    return () => {
      if (socket) {
        socket.off(KikRoomSocketEvent.GET_MY_ROOMS);
      }
    };
  }, []);

  // TODO: Aktualnie tylko dodawnie nowych pokoi, ale w przyszłości trzeba będzie
  // zrobić sprawdzanie z poprzednim stanem (useRef) i jesli pokój został zamknięty
  // to powracać do poczekalni? a może zawsze powrót do ostatniego pokoju?
  useEffect(() => {
    const ostatniaZakladka = zakladki.length;
    setAktualnaZakladka(ostatniaZakladka);
  }, [zakladki]);

  const handlePoczekalniaClick = () => {
    setAktualnaZakladka(0);
  };

  const handleMenuClick = (index: number) => {
    setAktualnaZakladka(index + 1);
  };

  return (
    <ZakladkiContext.Provider value={[zakladki, setZakladki]}>
      <div className="zakladki">
        <ul className="zakladki_menu">
          <li onClick={handlePoczekalniaClick}>Poczekalnia</li>
            {zakladki.map((zakladka, index) => <ElementMenu
              key={index}
              index={index}
              pokoj={zakladka}
              onClick={handleMenuClick}
            />)}
        </ul>
        {aktualnaZakladka === 0 ? <Poczekalnia /> : <Gra pokoj={zakladki[aktualnaZakladka - 1]} />}
      </div>
    </ZakladkiContext.Provider>
  );
};

export default Zakladki;
