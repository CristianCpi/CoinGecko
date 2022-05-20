import {CoinMarket} from "../models/CoinMarket";
import {createReducer, on} from "@ngrx/store";
import {retrieveCoinMarketDataList} from "./coins.actions";

export const initialState: CoinMarket[] = [];

export const coinsMarketDataReducer = createReducer(
  initialState,
  on(retrieveCoinMarketDataList, (state, { coinsMarketData }) => coinsMarketData),
);
