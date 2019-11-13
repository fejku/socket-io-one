import { Pokoj } from "./model";

export class Pokoje {
  private aktualneId: number;
  private _listaPokoi: Pokoj[];

  constructor() {
    this.aktualneId = 0;
    this._listaPokoi = [];
  }

  public nowyPokoj(nazwa: string, gracz: string): Pokoj {
    const gracze: string[] = [];
    gracze.push(gracz)

    const pokoj = new Pokoj(this.aktualneId++, nazwa, gracze);
    this.listaPokoi.push(pokoj);
    return pokoj;
  }

  public get listaPokoi(): Pokoj[] {
    return this._listaPokoi;
  }
  public set listaPokoi(value: Pokoj[]) {
    this._listaPokoi = value;
  }
}