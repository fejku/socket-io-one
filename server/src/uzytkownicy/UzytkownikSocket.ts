import { Namespace, Server, Socket } from "socket.io";

import { IUzytkownik, Uzytkownik } from "./model/Uzytkownik";
import { UzytkownikSocketEvent } from "./model/UzytkownikSocketEvent";
import { isObject } from 'util';

export class UzytkownikSocket {
  private static readonly NAMESPACE = "/users";

  private namespace: Namespace;
  private _uzytkownicy: IUzytkownik[];

  constructor(io: Server) {
    this.namespace = io.of(UzytkownikSocket.NAMESPACE);
    this._uzytkownicy = [];
  }

  public dodajNamespace() {
    this.namespace.on(UzytkownikSocketEvent.CONNECT, (socket: Socket) => {
      console.log(`Client ${socket.id} connected`);

      socket.on(UzytkownikSocketEvent.INIT, (uuid: string) => {
        const uzytkownik = this.uzytkownicy.find((u) => u.id === uuid);
        if (uzytkownik) {
          uzytkownik.socketId = socket.id;
        } else {
          this.uzytkownicy.push(new Uzytkownik(uuid, socket.id));
        }
      });

      socket.on(UzytkownikSocketEvent.DISCONNECT, () => {
        console.log(`Client ${socket.id} disconnected`);
      });
    });
  }

  public get uzytkownicy(): IUzytkownik[] {
    return this._uzytkownicy;
  }
  public set uzytkownicy(value: IUzytkownik[]) {
    this._uzytkownicy = value;
  }
}
