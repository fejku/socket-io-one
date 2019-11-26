import { IGracz } from "./../../model/IGracz";
import { IUzytkownik } from "./../../model/IUzytkownik";

export class Gracz implements IGracz {
  private _uzytkownik: IUzytkownik;
  private _gotowy: boolean;

  constructor(uzytkownik: IUzytkownik, gotowy?: boolean) {
    this._uzytkownik = uzytkownik;
    this._gotowy = gotowy ? true : false;
  }

  public dajDTO = () => {
    const dto = {
      gotowy: this.gotowy,
      uzytkownik: this._uzytkownik.dajDTO(),
    } as IGracz;

    return dto;
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