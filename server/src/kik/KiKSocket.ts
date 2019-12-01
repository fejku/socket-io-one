import { Namespace, Server, Socket } from "socket.io";

import { KikRoomSocketEvent, KikSocketEvent, SocketEvent } from "./../model/SocketEvent";

import { Uzytkownicy } from "../uzytkownicy/Uzytkownicy";
import { Pokoje } from "./Pokoje";

import { dajSocketId, zlozSocketId } from "../utils";
import { IPokoj } from "./../model/IPokoj";

export class KiKSocket {
  private static readonly NAMESPACE: string = "/kik";

  private namespace: Namespace;
  private pokoje: Pokoje;
  private uzytkownicy: Uzytkownicy;

  constructor(io: Server, uzytkownicy: Uzytkownicy) {
    this.namespace = io.of(KiKSocket.NAMESPACE);
    this.pokoje = new Pokoje();
    this.uzytkownicy = uzytkownicy;
  }

  public addNamespace(): void {
    this.namespace.on(SocketEvent.CONNECT, (socket: Socket) => {
      console.log(`Client ${socket.id} connected`);

      socket.on(KikRoomSocketEvent.GET_ROOMS, (response: (pokoje: IPokoj[]) => void) => {
        response(this.pokoje.listaPokoi.map((p) => p.dajDTO()));
      });

      socket.on(KikRoomSocketEvent.GET_MY_ROOMS, (response: (pokoje: IPokoj[]) => void) => {
        response(this.pokoje.dajPokoje(dajSocketId(socket.id)).map((p) => p.dajDTO()));
      });

      socket.on(KikRoomSocketEvent.CREATE_ROOM, (nazwaPokoju: string, response: (pokoj: IPokoj) => void) => {
        const pokoj = this.pokoje.nowyPokoj(nazwaPokoju);
        socket.broadcast.emit(KikRoomSocketEvent.REFRESH_ROOMS, this.pokoje.listaPokoi.map((p) => p.dajDTO()));
        response(pokoj.dajDTO());
      });

      socket.on(KikRoomSocketEvent.JOIN_ROOM, (pokojId: number, response: () => void) => {
        const uzytkownik = this.uzytkownicy.dajUzytkownikaSocketId(dajSocketId(socket.id));
        if (uzytkownik) {
          if (this.pokoje.dolaczDoPokoju(pokojId, uzytkownik)) {
            socket.join(pokojId.toString());
            socket.broadcast.emit(KikRoomSocketEvent.REFRESH_ROOMS, this.pokoje.listaPokoi.map((p) => p.dajDTO()));
          }
        }
        response();
      });

      socket.on(KikRoomSocketEvent.LEAVE_ROOM, (pokojId: number, response: () => void) => {
        const uzytkownik = this.uzytkownicy.dajUzytkownikaSocketId(dajSocketId(socket.id));
        if (uzytkownik) {
          this.pokoje.wyjdzZPokoju(pokojId, uzytkownik);
          socket.leave(pokojId.toString());
          socket.broadcast.emit(KikRoomSocketEvent.REFRESH_ROOMS, this.pokoje.listaPokoi.map((p) => p.dajDTO()));
        }
        response();
      });

      socket.on(KikSocketEvent.READY, (pokojId: number) => {
        const pokoj = this.pokoje.dajPokoj(pokojId);
        if (pokoj) {
          pokoj.gra.ustawAktywnoscGracza(dajSocketId(socket.id), true);
          if (pokoj.gra.czyWszyscyGracze()) {
            const gra = pokoj.gra;
            gra.inicjujNowaGre();
            this.namespace.to(zlozSocketId(KiKSocket.NAMESPACE, gra.aktualnyGracz().uzytkownik.socketId))
              .emit(KikSocketEvent.MY_TURN, gra.plansza, gra.aktywnyGracz);
            this.namespace.to(zlozSocketId(KiKSocket.NAMESPACE, gra.nieaktywnyGracz().uzytkownik.socketId))
              .emit(KikSocketEvent.OPPONENT_TURN, gra.plansza);
          }
        }
      });

      socket.on(KikSocketEvent.MOVE, (pokojId: number, poleId: number) => {
        const pokoj = this.pokoje.dajPokoj(pokojId);
        if (pokoj) {
          const gra = pokoj.gra;
          gra.ruch(poleId);
          if (pokoj.gra.czyWygrana()) {
            gra.koniecGry();
            this.namespace.to(zlozSocketId(KiKSocket.NAMESPACE, gra.aktualnyGracz().uzytkownik.socketId))
              .emit(KikSocketEvent.END, gra.plansza, "win");
            this.namespace.to(zlozSocketId(KiKSocket.NAMESPACE, gra.nieaktywnyGracz().uzytkownik.socketId))
              .emit(KikSocketEvent.END, gra.plansza, "lose");
          } else if (pokoj.gra.czyRemis()) {
            gra.koniecGry();
            this.namespace.to(poleId.toString()).emit(KikSocketEvent.END, gra.plansza, "tie");
          } else {
            gra.nastepnyGracz();
            this.namespace.to(zlozSocketId(KiKSocket.NAMESPACE, gra.aktualnyGracz().uzytkownik.socketId))
              .emit(KikSocketEvent.MY_TURN, gra.plansza, gra.aktywnyGracz);
            this.namespace.to(zlozSocketId(KiKSocket.NAMESPACE, gra.nieaktywnyGracz().uzytkownik.socketId))
              .emit(KikSocketEvent.OPPONENT_TURN, gra.plansza);
          }
        }
      });

      socket.on(SocketEvent.DISCONNECT, () => {
        console.log(`Client ${socket.id} disconnected`);
      });
    });
  }
}
