import { Gracz } from "../model";
import { KiK } from "../kik";

export class Gra {
  public static readonly MAX_ILOSC_GRACZY = 2;

  private _gracze: Gracz[];
  private aktywnyGracz: number;
  private plansza: number[];
  
  constructor(private gracz: string) {   
    this.aktywnyGracz = 0;
    this.plansza = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    this._gracze = [new Gracz(gracz)];
  }

  private wylosujKolejnosc(): void {
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

  private nastepnyGracz(): Gracz {
    if (++this.aktywnyGracz === Gra.MAX_ILOSC_GRACZY) {
      this.aktywnyGracz = 0;
    }
    return this.aktualnyGracz();
  }

  public czyWszyscyGracze(): boolean {
    return this._gracze.length === Gra.MAX_ILOSC_GRACZY;
  }
}