import { IGra } from "./../../model/IGra";
import { IGracz } from "./../../model/IGracz";
import { IUzytkownik } from "./../../model/IUzytkownik";
import { Gracz } from "./../model";

export class Gra implements IGra {
  public static readonly MAX_ILOSC_GRACZY = 2;

  private _gracze: IGracz[];
  private _aktywnyGracz: number;
  private _plansza: number[];

  constructor() {
    this._aktywnyGracz = 0;
    this._plansza = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    this._gracze = [];
  }

  public dajDTO = () => {
    const dto = {
      aktywnyGracz: this.aktywnyGracz,
      gracze: this.gracze.map((g) => g.dajDTO()),
      plansza: this.plansza,
    } as IGra;

    return dto;
  }

  public wylosujKolejnosc(): void {
    if (Math.floor(Math.random() * 2)) {
      const pom = this._gracze[0];
      this._gracze[0] = this._gracze[1];
      this._gracze[1] = pom;
    }
  }

  public dolaczGracza(uzytkownik: IUzytkownik): boolean {
    if (this._gracze.length >= Gra.MAX_ILOSC_GRACZY) {
      return false;
    }

    const gracz = new Gracz(uzytkownik);
    this._gracze.push(gracz);
    return true;
  }

  public aktualnyGracz(): IGracz {
    return this._gracze[this.aktywnyGracz];
  }

  public nieaktywnyGracz(): IGracz {
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

  public czyWygrana(): boolean {
    return this.czyWygranaPionPoziom() || this.czyWygranaSkos();
  }

  public czyRemis(): boolean {
    for (const pole of this.plansza) {
      if (pole === -1) {
        return false;
      }
    }
    return true;
  }

  public koniecGry() {
    for (const gracz of this._gracze) {
      gracz.gotowy = false;
    }
  }

  public ustawAktywnoscGracza(socketId: string, gotowy: boolean) {
    const gracz = this._gracze.find((g) => g.uzytkownik.socketId = socketId);
    if (gracz) {
      gracz.gotowy = gotowy;
    }
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
    if ((this.plansza[0] === this.aktywnyGracz)
      && (this.plansza[4] === this.aktywnyGracz)
      && (this.plansza[8] === this.aktywnyGracz)) {
      return true;
    }
    if ((this.plansza[2] === this.aktywnyGracz)
      && (this.plansza[4] === this.aktywnyGracz)
      && (this.plansza[6] === this.aktywnyGracz)) {
      return true;
    }
    return false;
  }

  public get gracze(): IGracz[] {
    return this._gracze;
  }
  public set gracze(value: IGracz[]) {
    this._gracze = value;
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
