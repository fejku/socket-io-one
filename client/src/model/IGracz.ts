import { IBaseDTO } from "./IBaseDTO";
import { IUzytkownik } from "./IUzytkownik";

export interface IGracz extends IBaseDTO {
  uzytkownik: IUzytkownik;
  gotowy: boolean;
}
