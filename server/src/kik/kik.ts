import { Server, Namespace, Socket } from 'socket.io';

import { SocketEvent } from './constants';
import { Pokoj, Gracz } from './model';
import { Pokoje } from './pokoje';

export class KiK {
  private static readonly NAMESPACE: string = '/kik';
  
  private namespace: Namespace;
  private pokoje: Pokoje;
  
  constructor(io: Server) {
    this.namespace = io.of(KiK.NAMESPACE);
    this.pokoje = new Pokoje();
  }

  public addNamespace(): void {
    this.namespace.on(SocketEvent.CONNECT, (socket: Socket) => {
      console.log(`Client ${socket.id} connected`);

      socket.on(SocketEvent.GET_ROOMS, (response: (pokoje: Pokoj[]) => void) => {
        response(this.pokoje.listaPokoi);
      });

      socket.on(SocketEvent.CREATE_ROOM, (nazwaPokoju: string, response: (pokoj: Pokoj) => {}) => {
        const pokoj = this.pokoje.nowyPokoj(nazwaPokoju, socket.id);
        socket.join(pokoj.id.toString());
        this.namespace.emit(SocketEvent.REFRESH_ROOMS, this.pokoje.listaPokoi);
        response(pokoj);
      });

      socket.on(SocketEvent.JOIN_ROOM, (pokojId: number) => {
        if (this.pokoje.dolaczDoPokoju(pokojId, socket.id)) {
          socket.join(pokojId.toString());
          this.namespace.emit(SocketEvent.REFRESH_ROOMS, this.pokoje.listaPokoi);
        }
      });

      socket.on(SocketEvent.READY, (pokojId: number) => {
        const pokoj = this.pokoje.dajPokoj(pokojId);
        if (pokoj) {
          if (pokoj.gra.czyWszyscyGracze()) {
            const gra = pokoj.gra;
            gra.wylosujKolejnosc();
            this.namespace.to(gra.aktualnyGracz().id.toString()).emit(SocketEvent.MY_TURN, gra.plansza, gra.aktywnyGracz);
            this.namespace.to(gra.nieaktywnyGracz().id.toString()).emit(SocketEvent.OPPONENT_TURN, gra.plansza);
          }
        }
      });

      socket.on(SocketEvent.MOVE, (pokojId:number, poleId: number) => {
        const pokoj = this.pokoje.dajPokoj(pokojId);
        if (pokoj) {
          const gra = pokoj.gra;
          gra.ruch(poleId);
          // if (pokoj.gra.czyWygrana()) {
          //   emit win
          //   emit lose
          // }
          // if (pokoj.gra.czyRemis() {
          //   emit room tie
          // }
          gra.nastepnyGracz();
          this.namespace.to(gra.aktualnyGracz().id.toString()).emit(SocketEvent.MY_TURN, gra.plansza, gra.aktywnyGracz);
          this.namespace.to(gra.nieaktywnyGracz().id.toString()).emit(SocketEvent.OPPONENT_TURN, gra.plansza);          
        }
      });

      socket.on(SocketEvent.DISCONNECT, () => {
        console.log(`Client ${socket.id} disconnected`);
      });
    });
  }
}