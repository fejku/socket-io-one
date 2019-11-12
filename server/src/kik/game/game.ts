import { Namespace } from 'socket.io';
import { SocketEvent } from '../constants';
import { KiK } from '../kik';

export class Game {
  constructor(private namespace: Namespace, private nazwaPokoju: string) {}

  public start(): void {
    this.namespace.to(this.nazwaPokoju).emit(SocketEvent.START_GAME);

    // Pobieram graczy
    const gracze = Object.keys(this.namespace.adapter.rooms[this.nazwaPokoju].sockets);
    // Losuję aktywnego gracza
    const aktywnyGracz = Math.floor(Math.random() * KiK.WIELKOSC_POKOJU);
    // let aktywnyGracz = gracze
    // // Wysyłam pierwszemu graczowi sygnał 
  }
}