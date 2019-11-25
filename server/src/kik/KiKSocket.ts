import { Namespace, Server, Socket } from "socket.io";

import { KikRoomSocketEvent, KikSocketEvent, SocketEvent, IUzytkownik } from "model";
import { Pokoj } from "./model";
import { Pokoje } from "./Pokoje";
import { Uzytkownicy } from "../uzytkownicy/Uzytkownicy";

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

      socket.on(KikRoomSocketEvent.GET_ROOMS, (response: (pokoje: Pokoj[]) => void) => {
        response(this.pokoje.listaPokoi);
      });

      socket.on(KikRoomSocketEvent.CREATE_ROOM, (nazwaPokoju: string, response: (pokoj: Pokoj) => {}) => {
        const pokoj = this.pokoje.nowyPokoj(nazwaPokoju);
        this.namespace.emit(KikRoomSocketEvent.REFRESH_ROOMS, this.pokoje.listaPokoi);
        response(pokoj);
      });

      socket.on(KikRoomSocketEvent.JOIN_ROOM, (pokojId: number) => {
        const uzytkownik = this.uzytkownicy.dajUzytkownikaSocketid(socket.id);
        if (uzytkownik) {
          if (this.pokoje.dolaczDoPokoju(pokojId, uzytkownik)) {
            socket.join(pokojId.toString());
            this.namespace.emit(KikRoomSocketEvent.REFRESH_ROOMS, this.pokoje.listaPokoi);
          }
        }
      });

      socket.on(KikSocketEvent.READY, (pokojId: number) => {
        const pokoj = this.pokoje.dajPokoj(pokojId);
        if (pokoj) {
          pokoj.gra.ustawAktywnoscGracza(socket.id, true);
          if (pokoj.gra.czyWszyscyGracze()) {
            const gra = pokoj.gra;
            gra.wylosujKolejnosc();
            this.namespace.to(gra.aktualnyGracz().id.toString()).emit(KikSocketEvent.MY_TURN, gra.plansza, gra.aktywnyGracz);
            this.namespace.to(gra.nieaktywnyGracz().id.toString()).emit(KikSocketEvent.OPPONENT_TURN, gra.plansza);
          }
        }
      });

      socket.on(KikSocketEvent.MOVE, (pokojId:number, poleId: number) => {
        const pokoj = this.pokoje.dajPokoj(pokojId);
        if (pokoj) {
          const gra = pokoj.gra;
          gra.ruch(poleId);
          if (pokoj.gra.czyWygrana()) {
            gra.koniecGry();
            this.namespace.to(gra.aktualnyGracz().id.toString()).emit(KikSocketEvent.END, gra.plansza, 'win');
            this.namespace.to(gra.nieaktywnyGracz().id.toString()).emit(KikSocketEvent.END, gra.plansza, 'lose');  
          } else if (pokoj.gra.czyRemis()) {
            gra.koniecGry();
            this.namespace.to(poleId.toString()).emit(KikSocketEvent.END, gra.plansza, 'tie');  
          } else {
            gra.nastepnyGracz();
            this.namespace.to(gra.aktualnyGracz().id.toString()).emit(KikSocketEvent.MY_TURN, gra.plansza, gra.aktywnyGracz);
            this.namespace.to(gra.nieaktywnyGracz().id.toString()).emit(KikSocketEvent.OPPONENT_TURN, gra.plansza);
          }
        }
      });

      socket.on(SocketEvent.DISCONNECT, () => {
        console.log(`Client ${socket.id} disconnected`);
      });
    });
  }
}
