import { Server, Namespace, Socket } from 'socket.io';
import { SocketEvent } from './constants';

import { Pokoj } from './model';
import { Game } from './game/game';

export class KiK {
  private static readonly NAMESPACE: string = '/kik';
  public static readonly WIELKOSC_POKOJU: number = 2;
  private namespace: Namespace;
  
  constructor(io: Server) {
    this.namespace = io.of(KiK.NAMESPACE);
  }

  private dajPokoje(): Pokoj[] {
    const rooms = this.namespace.adapter.rooms;          
    const allRoomsNames = Object.keys(rooms);

    return allRoomsNames
      .filter(roomName => !roomName.startsWith(KiK.NAMESPACE + '#'))
      .map(room => new Pokoj(room, Object.keys(rooms[room].sockets)));    
  }

  public addNamespace(): void {
    this.namespace.on(SocketEvent.CONNECT, (socket: Socket) => {
      console.log(`Client ${socket.id} connected`);

      socket.on(SocketEvent.GET_ROOMS, (response: (pokoje: Pokoj[]) => void) => {
        response(this.dajPokoje());
      });

      socket.on(SocketEvent.CREATE_ROOM, (nazwaPokoju: string) => {
        // TODO: sprawdzenie czy pokoj o takiej nazwie już istnieje
        socket.join(nazwaPokoju);
        this.namespace.emit(SocketEvent.REFRESH_ROOMS, this.dajPokoje());
      });

      socket.on(SocketEvent.JOIN_ROOM, (nazwaPokoju: string) => {
        // TODO: sprawdzenie czy nadal tylko jeden możliwe dołączenie do pokoju
        socket.join(nazwaPokoju);
        this.namespace.emit(SocketEvent.REFRESH_ROOMS, this.dajPokoje());

        const iloscGraczyWPokoju = this.namespace.adapter.rooms[nazwaPokoju].length;
        if (KiK.WIELKOSC_POKOJU === iloscGraczyWPokoju) {
          const game = new Game(this.namespace, nazwaPokoju);
          game.start();
        }
      });      

      socket.on(SocketEvent.DISCONNECT, () => {
        console.log(`Client ${socket.id} disconnected`);
      });
    });
  }
}