import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

import {CoinMarket} from "../models/CoinMarket";

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {

  private readonly coinGeckoMarketsUrl = 'https://api.coingecko.com/api/v3/';
  private readonly coinsMarketDataUrl = this.coinGeckoMarketsUrl + 'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&price_change_percentage=24h';
  private readonly coinsMarketDataSearchUrl = this.coinGeckoMarketsUrl + 'search';

  constructor(protected readonly http: HttpClient) {
  }

  public getAllCoins(page: number): Observable<Array<CoinMarket>> {
    if (page == 0) {
      return this.http.get<CoinMarket[]>(`${this.coinsMarketDataUrl}&page=1`);
    } else {
      return this.http.get<CoinMarket[]>(`${this.coinsMarketDataUrl}&page=${page}`);
    }
  }

  public getFilteredCoinMarketData(name: string): Observable<Array<CoinMarket>> {
    return this.http.get<{ coins: CoinMarket[] }>(`${this.coinsMarketDataSearchUrl}/?query=${name}`).pipe(map((coinsMarketData) => coinsMarketData.coins || []));
  }
}
