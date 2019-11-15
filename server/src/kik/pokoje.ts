import { Pokoj, Gracz } from "./model";

export class Pokoje {
  private aktualneId: number;
  private _listaPokoi: Pokoj[];

  constructor() {
    this.aktualneId = 0;
    this._listaPokoi = [];
  }

  public dajPokoj(id: number) {
    return this.listaPokoi.find(pokoj => pokoj.id === id);
  }

  public nowyPokoj(nazwa: string, gracz: string): Pokoj {
    const pokoj = new Pokoj(this.aktualneId++, nazwa, gracz);
    this.listaPokoi.push(pokoj);
    return pokoj;
  }

  public dolaczDoPokoju(id: number, gracz: Gracz): boolean {
    const pokoj = this.dajPokoj(id);
    if (pokoj) {
      pokoj.gracze.push(gracz);
      return true;
    }
    return false;
  }

  public get listaPokoi(): Pokoj[] {
    return this._listaPokoi;
  }
  public set listaPokoi(value: Pokoj[]) {
    this._listaPokoi = value;
  }
}