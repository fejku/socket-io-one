import { Namespace, Socket } from 'socket.io';
import { SocketEvent } from '../constants';
import { KiK } from '../kik';
import { Pokoj, Gracz } from '../model';

export class Gra {
  private aktywnyGracz: number;
  private plansza: number[];

  constructor(private namespace: Namespace, private socket: Socket, private pokoj: Pokoj) {   
    this.wylosujKolejnosc();
    this.aktywnyGracz = 0;
    this.plansza = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
  }

  private wylosujKolejnosc(): void {
    if (Math.floor(Math.random() * 2)) {
      const pom = this.pokoj.gracze[0];
      this.pokoj.gracze[0] = this.pokoj.gracze[1];
      this.pokoj.gracze[1] = pom;
    };
  }

  private aktualnyGracz(): Gracz {
    return this.pokoj.gracze[this.aktywnyGracz];
  }

  private nieaktywnyGracz(): Gracz {
    const idGracza = this.aktywnyGracz === 0 ? 1 : 0;
    return this.pokoj.gracze[idGracza];
  }

  private nastepnyGracz(): Gracz {
    if (++this.aktywnyGracz === KiK.WIELKOSC_POKOJU) {
      this.aktywnyGracz = 0;
    }
    return this.aktualnyGracz();
  }

  public start(): void {
    this.namespace.to(this.aktualnyGracz().id.toString()).emit(SocketEvent.MY_TURN, this.plansza, this.aktywnyGracz);
    this.namespace.to(this.nieaktywnyGracz().id.toString()).emit(SocketEvent.OPPONENT_TURN, this.plansza, this.aktywnyGracz);
    // this.namespace.to(this.pokoj.id.toString()).emit(SocketEvent.START_GAME);

    // Pobieram graczy
    // this.gracze = Object.keys(this.namespace.adapter.rooms[this.nazwaPokoju].sockets);

    // this.socket.on('ready', () => {
    //   console.log('TEST');
    //   this.namespace.to(this.aktualnyGracz()).emit(SocketEvent.MY_TURN, this.plansza, this.aktywnyGracz);      
    // })
  }
}