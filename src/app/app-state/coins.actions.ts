import {createAction, props} from "@ngrx/store";
import {CoinMarket} from "../models/CoinMarket";

export const retrieveCoinMarketDataList = createAction(
  '[CoinMarket List/API] Retrieve Coins Market Data Success',
  props<{ coinsMarketData: CoinMarket[] }>()
);

// export const filterCoinMarketDataList = createAction(
//   '[Filter CoinMarket List/API] Filer Coins Market Data Success',
//   props<{ coinsMarketData: CoinMarket[] }>()
// );
