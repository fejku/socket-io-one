import { IGracz } from "./../model/Gracz";
import { IUzytkownik } from "./../model/Uzytkownik";

export class GraczDTO implements IGracz {
  public uzytkownik: IUzytkownik;
  public gotowy: boolean;
}
