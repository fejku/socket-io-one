import { IUzytkownik } from '../../uzytkownicy/model/Uzytkownik';

export class Gracz {
  private _uzytkownik: IUzytkownik;
  private _gotowy: boolean;

  constructor(uzytkownik: IUzytkownik, gotowy?: boolean) {
    this._uzytkownik = uzytkownik;
    this._gotowy = gotowy ? true : false;
  }

  public get uzytkownik(): IUzytkownik {
    return this._uzytkownik;
  }
  public set uzytkownik(value: IUzytkownik) {
    this._uzytkownik = value;
  }
  public get gotowy(): boolean {
    return this._gotowy;
  }
  public set gotowy(value: boolean) {
    this._gotowy = value;
  }
}