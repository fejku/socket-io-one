import { IUzytkownik } from "./Uzytkownik";

export interface IGracz {
  uzytkownik: IUzytkownik;
  gotowy: boolean;
}