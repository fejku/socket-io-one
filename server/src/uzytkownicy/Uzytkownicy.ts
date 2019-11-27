import { IUzytkownik } from "./../model/IUzytkownik";
import { Uzytkownik } from "./model/Uzytkownik";

export class Uzytkownicy {
  private _listaUzytkownikow: IUzytkownik[];

  constructor() {
    this._listaUzytkownikow = [];
  }

  public dajUzytkownikaUuid(uuid: string) {
    return this.listaUzytkownikow.find((u) => u.id === uuid);
  }

  public dajUzytkownikaSocketId(socketId: string) {
    return this.listaUzytkownikow.find((u) => this.porownajSocketId(u.socketId, socketId));
  }

  public dodajUzytkownika(uuid: string, socketId: string) {
    this.listaUzytkownikow.push(new Uzytkownik(uuid, socketId));
  }

  private porownajSocketId(socketId1: string, socketId2: string) {
    return socketId1.split("#")[1] === socketId2.split("#")[1];
  }

  public get listaUzytkownikow(): IUzytkownik[] {
    return this._listaUzytkownikow;
  }
  public set listaUzytkownikow(value: IUzytkownik[]) {
    this._listaUzytkownikow = value;
  }
}
