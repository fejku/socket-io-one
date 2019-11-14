import React, { useState, useEffect, useContext } from 'react';
import Plansza from './Plansza/Plansza';
import { SocketContext } from '../../KolkoIKrzyzyk';

import './Gra.css';

const Gra = ({pokoj}) => {
  const socket = useContext(SocketContext);

  const [plansza, setPlansza] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const [statusAktywny, setStatusAktywny] = useState(false);
  const [status, setStatus] = useState('Oczekiwanie na przeciwnika');
  const [aktywnyGracz, setAktywnyGracz] = useState(0);

  useEffect(() => {   
    socket.emit('ready', pokoj._id);

    socket.on('my turn', (plansza, aktywnyGracz) => {
      console.log('my turn');
      
      setPlansza(plansza);
      setStatusAktywny(true);
      setStatus('Moja tura');
      setAktywnyGracz(aktywnyGracz);
    });

    socket.on('opponent turn', (plansza, aktywnyGracz) => {
      console.log('opponent turn');
      
      setPlansza(plansza);
      setStatusAktywny(false);
      setStatus('Tura przeciwnika');
      setAktywnyGracz(aktywnyGracz);
    });    

    return () => {
      socket.off('my turn');
      socket.off('opponent turn');
    }
  }, [socket, pokoj]);

  // useEffect(() => {
  //   console.log('qwe');
    
  // }, [plansza]);

  return (
    <div className="gra">
      <div className="title">
        <p>Socket id: {socket.id}</p>
        {/* <p>Tura: {aktywnyGracz === 0 ? 'O' : 'X'}</p> */}
        <p>{status}</p>
      </div>      
      <Plansza statusAktywny={statusAktywny} planszaState={[plansza, setPlansza]} aktywnyGracz={aktywnyGracz} />
    </div>
  ) 
}

export default Gra;