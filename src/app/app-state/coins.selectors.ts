import {createFeatureSelector} from "@ngrx/store";
import {CoinMarket} from "../models/CoinMarket";

export const selectCoinMarketData = createFeatureSelector<CoinMarket[]>('coinsMarketData');
