import {CoinMarket} from "../models/CoinMarket";

export interface AppState {
  coinsMarketData: CoinMarket[];
  coinId: string;
}
