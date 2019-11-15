import { Gracz } from "../model";
import { KiK } from "../kik";

export class Gra {
  public static readonly MAX_ILOSC_GRACZY = 2;

  private _gracze: Gracz[];
  private _aktywnyGracz: number;
  private _plansza: number[];
  
  constructor(private gracz: string) {   
    this._aktywnyGracz = 0;
    this._plansza = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    this._gracze = [new Gracz(gracz)];
  }

  public wylosujKolejnosc(): void {
    if (Math.floor(Math.random() * 2)) {
      const pom = this._gracze[0];
      this._gracze[0] = this._gracze[1];
      this._gracze[1] = pom;
    };
  }

  public dolaczGracza(graczId: string): boolean {
    if(this._gracze.length >= Gra.MAX_ILOSC_GRACZY) {
      return false;
    }

    const gracz = new Gracz(graczId);
    this._gracze.push(gracz);
    return true;
  }

  public aktualnyGracz(): Gracz {
    return this._gracze[this.aktywnyGracz];
  }

  public nieaktywnyGracz(): Gracz {
    const idGracza = this.aktywnyGracz === 0 ? 1 : 0;
    return this._gracze[idGracza];
  }

  public nastepnyGracz(): void {
    if (++this.aktywnyGracz === Gra.MAX_ILOSC_GRACZY) {
      this.aktywnyGracz = 0;
    }
  }

  public czyWszyscyGracze(): boolean {
    return this._gracze.length === Gra.MAX_ILOSC_GRACZY;
  }

  public ruch(poleId: number): void {
    this.plansza[poleId] = this.aktywnyGracz;
  }

  public get plansza(): number[] {
    return this._plansza;
  }
  public set plansza(value: number[]) {
    this._plansza = value;
  }
  public get aktywnyGracz(): number {
    return this._aktywnyGracz;
  }
  public set aktywnyGracz(value: number) {
    this._aktywnyGracz = value;
  }
}