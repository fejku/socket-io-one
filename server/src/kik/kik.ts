import { Server, Namespace, Socket } from 'socket.io';
import { SocketEvent } from './constants';

import { Pokoj, Gracz } from './model';
import { Gra } from './game/game';
import { Pokoje } from './pokoje';

export class KiK {
  private static readonly NAMESPACE: string = '/kik';
  public static readonly WIELKOSC_POKOJU: number = 2;
  private namespace: Namespace;
  private pokoje: Pokoje;
  private gry: Gra[];
  // TODO: gra zaczyna się albo w create game co ma sens albo ew w ready gdy jest obu graczy
  // pokoj wydaje sie, że powinien być częśćią gry???
  
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

      socket.on(SocketEvent.JOIN_ROOM, (id: number) => {
        if (this.pokoje.dolaczDoPokoju(id, new Gracz(socket.id))) {
          socket.join(id.toString());
          this.namespace.emit(SocketEvent.REFRESH_ROOMS, this.pokoje.listaPokoi);
        }
      });

      socket.on(SocketEvent.READY, (id: number) => {
        const pokoj = this.pokoje.dajPokoj(id);
        if (pokoj) {
          if (KiK.WIELKOSC_POKOJU === pokoj.gracze.length) {
            const game = new Game(this.namespace, socket, pokoj);
            game.start();            
          }
        }
      });

      socket.on(SocketEvent.DISCONNECT, () => {
        console.log(`Client ${socket.id} disconnected`);
      });
    });
  }
}