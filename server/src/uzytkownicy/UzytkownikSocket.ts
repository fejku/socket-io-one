import { Namespace, Server, Socket } from "socket.io";

import { SocketEvent, UzytkownikSocketEvent } from "model";
import { Uzytkownicy } from "./Uzytkownicy";

export class UzytkownikSocket {
  private static readonly NAMESPACE = "/users";

  private namespace: Namespace;
  private _uzytkownicy: Uzytkownicy;

  constructor(io: Server) {
    this.namespace = io.of(UzytkownikSocket.NAMESPACE);
    this._uzytkownicy = new Uzytkownicy();
  }

  public dodajNamespace() {
    this.namespace.on(SocketEvent.CONNECT, (socket: Socket) => {
      console.log(`Client ${socket.id} connected`);

      socket.on(UzytkownikSocketEvent.INIT, (uuid: string) => {
        const uzytkownik = this.uzytkownicy.dajUzytkownikaUuid(uuid);
        if (uzytkownik) {
          uzytkownik.socketId = socket.id;
        } else {
          this.uzytkownicy.dodajUzytkownika(uuid, socket.id);
        }
      });

      socket.on(SocketEvent.DISCONNECT, () => {
        console.log(`Client ${socket.id} disconnected`);
      });
    });
  }

  public get uzytkownicy(): Uzytkownicy {
    return this._uzytkownicy;
  }
  public set uzytkownicy(value: Uzytkownicy) {
    this._uzytkownicy = value;
  }
}
