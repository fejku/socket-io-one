import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Plansza from './Plansza/Plansza';
import KoniecGryModal from './KoniecGryModal';
import { SocketContext } from '../../KolkoIKrzyzyk';

import './Gra.css';

const Gra = ({pokoj}) => {
  const history = useHistory();
  const socket = useContext(SocketContext);

  const [plansza, setPlansza] = useState(
    [
      -1, -1, -1, 
      -1, -1, -1, 
      -1, -1, -1
    ]);
  const [statusAktywny, setStatusAktywny] = useState(false);
  const [status, setStatus] = useState('Oczekiwanie na przeciwnika');
  const [aktywnyGracz, setAktywnyGracz] = useState(0);  

  useEffect(() => {   
    socket.emit('ready', pokoj._id);

    socket.on('my turn', (plansza, aktywnyGracz) => {
      setStatusAktywny(true);
      setStatus('Moja tura');
      setPlansza(plansza);
      setAktywnyGracz(aktywnyGracz);
    });

    socket.on('opponent turn', (plansza) => {
      setStatusAktywny(false);
      setStatus('Tura przeciwnika');
      setPlansza(plansza);      
    });
    
    socket.on('end', (plansza, result) => {
      setStatusAktywny(false);
      setStatus(wynik(result));
      setPlansza(plansza);

      setKomnunikatModalKoniecGry(wynik(result));      
    });

    return () => {
      socket.off('my turn');
      socket.off('opponent turn');
    }
  }, [socket, pokoj]);

  const wynik = (result) => {
    switch(result) {
      case 'win': return 'Wygrana';
      case 'lose': return 'Przegrana';
      case 'tie': return 'Remis';
      default: return '';
    };
  };

  const [komnunikatModalKoniecGry, setKomnunikatModalKoniecGry] = useState('');

  const handleZagrajPonownie = () => {
    setPlansza([
      -1, -1, -1, 
      -1, -1, -1, 
      -1, -1, -1
    ]);
    setStatusAktywny(false);
    setStatus('Oczekiwanie na przeciwnika');
    setAktywnyGracz(0);  
    setKomnunikatModalKoniecGry('');
    socket.emit('ready', pokoj._id);    
  }
  
  const handleWyjdz = () => {
    //TODO: wywalić użytkownika z pokoju
    history.push('/');
  }

  return (
    <div className="gra">
      <KoniecGryModal title={komnunikatModalKoniecGry} onZagrajPonownie={handleZagrajPonownie} onWyjdz={handleWyjdz} />
      <div className="title">
        <p>Socket id: {socket.id}</p>
        <p>{status}</p>
      </div>      
      <Plansza statusAktywny={statusAktywny} planszaState={[plansza, setPlansza]} aktywnyGracz={aktywnyGracz} pokoj={pokoj} />
    </div>
  ) 
}

export default Gra;