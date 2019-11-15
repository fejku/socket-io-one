import React, { useContext } from 'react';
import Zakladka from '../../../Zakladka/Zakladka';
import Gracze from './Gracze/Gracze';
import Gra from '../../../Gra/Gra';

import { SocketContext } from '../../../../KolkoIKrzyzyk';
import { ZakladkiContext } from '../../../Zakladki';

import './Pokoj.css'

const Pokoj = ({pokoj}) => {
  const socket = useContext(SocketContext);
  const [zakladki, setZakladki] = useContext(ZakladkiContext);

  const iloscGraczy = pokoj._gra._gracze.length;
  const czyPokojPelny = iloscGraczy === 2 ? '(Full)' : '';
  const czyGraczWPokoju = pokoj._gra._gracze.includes(socket.id);
  const napisIloscGraczy = iloscGraczy + '/2';

  const handleDolaczDoPokoju = () => {
    socket.emit('join room', pokoj._id);
    setZakladki([...zakladki, <Gra nazwa={pokoj._nazwa} pokoj={pokoj} />])
  }; 

  return (
    <Zakladka>
      <div className="pokoj" key={pokoj._id}>
        <div className="pokoj_name">
          {pokoj._nazwa} - {napisIloscGraczy} {czyPokojPelny}
          {czyGraczWPokoju || czyPokojPelny ? null : <button onClick={handleDolaczDoPokoju}>Dołącz</button>}        
        </div>            
        <Gracze gracze={pokoj._gra._gracze} />  
      </div>
    </Zakladka>
  )
}

export default Pokoj;