import { IBaseDTO } from "./IBaseDTO";
import { IGracz } from "./IGracz";

export interface IGra extends IBaseDTO {
  gracze: IGracz[];
  aktywnyGracz: number;
  plansza: number[];
}
