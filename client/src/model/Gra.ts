import { IGracz } from "./Gracz";

export interface IGra {
  gracze: IGracz[];
  aktywnyGracz: number;
  plansza: number[];
}
