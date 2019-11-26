import { IUzytkownik } from "./../model/Uzytkownik";
import { Uzytkownik } from "./model/Uzytkownik";

export class Uzytkownicy {
  private _listaUzytkownikow: IUzytkownik[];

  constructor() {
    this._listaUzytkownikow = [];
  }

  public dajUzytkownikaUuid(uuid: string) {
    return this.listaUzytkownikow.find((u) => u.id === uuid);
  }

  public dajUzytkownikaSocketid(socketId: string) {
    return this.listaUzytkownikow.find((u) => u.socketId === socketId);
  }

  public dodajUzytkownika(uuid: string, socketId: string) {
    this.listaUzytkownikow.push(new Uzytkownik(uuid, socketId));
  }

  public get listaUzytkownikow(): IUzytkownik[] {
    return this._listaUzytkownikow;
  }
  public set listaUzytkownikow(value: IUzytkownik[]) {
    this._listaUzytkownikow = value;
  }
}
