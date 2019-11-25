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

  public nowyPokoj(nazwa: string): Pokoj {
    const pokoj = new Pokoj(this.aktualneId++, nazwa);
    this.listaPokoi.push(pokoj);
    return pokoj;
  }

  public dolaczDoPokoju(pokojId: number, graczId: string): boolean {
    const pokoj = this.dajPokoj(pokojId);
    if (pokoj) {
      return pokoj.gra.dolaczGracza(graczId);
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