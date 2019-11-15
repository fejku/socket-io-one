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

      socket.on(SocketEvent.READY, (id: number) => {
        const pokoj = this.pokoje.dajPokoj(id);
        if (pokoj) {
          if (pokoj.gra.czyWszyscyGracze()) {
            this.namespace.to(pokoj.gra.aktualnyGracz().id.toString()).emit(SocketEvent.MY_TURN);
            this.namespace.to(pokoj.gra.nieaktywnyGracz().id.toString()).emit(SocketEvent.OPPONENT_TURN);
          }
        }
      });

      socket.on(SocketEvent.DISCONNECT, () => {
        console.log(`Client ${socket.id} disconnected`);
      });
    });
  }
}