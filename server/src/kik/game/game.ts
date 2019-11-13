import { Namespace, Socket } from 'socket.io';
import { SocketEvent } from '../constants';
import { KiK } from '../kik';

export class Game {
  private gracze: string[];
  private aktywnyGracz: number;
  private plansza: number[];

  constructor(private namespace: Namespace, private socket: Socket, private nazwaPokoju: string) {   
    this.gracze = [];
    // Losuję aktywnego gracza
    this.aktywnyGracz = Math.floor(Math.random() * KiK.WIELKOSC_POKOJU);
    this.plansza = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
  }

  private aktualnyGracz(): string {
    console.log('wyslano', this.gracze[this.aktywnyGracz]);
    
    return this.gracze[this.aktywnyGracz];
  }

  private nastepnyGracz(): string {
    this.aktywnyGracz = this.aktywnyGracz === 0 ? 1 : 0;
    return this.aktualnyGracz();
  }

  public start(): void {
    this.namespace.to(this.nazwaPokoju).emit(SocketEvent.START_GAME);

    // Pobieram graczy
    this.gracze = Object.keys(this.namespace.adapter.rooms[this.nazwaPokoju].sockets);

    // this.socket.on('ready', () => {
    //   console.log('TEST');
    //   this.namespace.to(this.aktualnyGracz()).emit(SocketEvent.MY_TURN, this.plansza, this.aktywnyGracz);      
    // })
  }
}