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

  private czyWygranaPionPoziom(): boolean {
    for (let i = 0; i < 3; i++) {      
      let wygranaPion = true;
      let wygranaPoziom = true;
      for (let j = 0; j < 3; j++) {
        if (this.plansza[i + j * 3] !== this.aktywnyGracz) {
          wygranaPion = false;
        }
        if (this.plansza[i * 3 + j] !== this.aktywnyGracz) {
          wygranaPoziom = false;
        }        
      }
  
      if (wygranaPion || wygranaPoziom) {
        return true;
      }      
    }
    return false;
  }

  private czyWygranaSkos(): boolean {
    if ((this.plansza[0] === this.aktywnyGracz) && (this.plansza[4] === this.aktywnyGracz) && (this.plansza[8] === this.aktywnyGracz)) {
      return true;
    }
    if ((this.plansza[2] === this.aktywnyGracz) && (this.plansza[4] === this.aktywnyGracz) && (this.plansza[6] === this.aktywnyGracz)) {
      return true;
    }
    return false;    
  }

  public czyWygrana(): boolean {
    return this.czyWygranaPionPoziom() || this.czyWygranaSkos();
  }

  public czyRemis(): boolean {
    for(const pole of this.plansza) {
      if (pole === -1) {
        return false
      }
    }
    return true;
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