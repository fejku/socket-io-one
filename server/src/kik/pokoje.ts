import { IUzytkownik } from "./../model/IUzytkownik";
import { Pokoj } from "./model";

export class Pokoje {
  private _aktualneId: number;
  private _listaPokoi: Pokoj[];

  constructor() {
    this._aktualneId = 0;
    this._listaPokoi = [];
  }

  public dajPokoj(id: number) {
    return this.listaPokoi.find((pokoj) => pokoj.id === id);
  }

  public nowyPokoj(nazwa: string): Pokoj {
    const pokoj = new Pokoj(this._aktualneId++, nazwa);
    this.listaPokoi.push(pokoj);
    return pokoj;
  }

  public dolaczDoPokoju(pokojId: number, uzytkownik: IUzytkownik): boolean {
    const pokoj = this.dajPokoj(pokojId);
    if (pokoj) {
      return pokoj.gra.dolaczGracza(uzytkownik);
    }
    return false;
  }

  public wyjdzZPokoju(pokojId: number, uzytkownik: IUzytkownik) {
    const pokoj = this.dajPokoj(pokojId);
    if (pokoj) {
      pokoj.gra.wyrzucGracza(uzytkownik);
      if (this.czyPokojPusty(pokoj)) {
        this.usunPokoj(pokoj);
      }
    }
  }

  public dajPokoje(socketId: string) {
    return this.listaPokoi.filter(
      (p) => p.gra.gracze.some(
        (g) => g.uzytkownik.socketId === socketId));
  }

  private czyPokojPusty(pokoj: Pokoj) {
    return pokoj.gra.gracze.length === 0;
  }

  private usunPokoj(pokoj: Pokoj) {
    const pokoje = this.listaPokoi.filter((p) => p.id !== pokoj.id);
    this.listaPokoi = pokoje;
  }

  public get listaPokoi(): Pokoj[] {
    return this._listaPokoi;
  }
  public set listaPokoi(value: Pokoj[]) {
    this._listaPokoi = value;
  }
}