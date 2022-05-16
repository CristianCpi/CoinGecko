import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {CoinGeckoService} from "./services/coin-gecko.service";
import {retrieveCoinMarketDataList} from "./app-state/coins.actions";
import {selectCoinMarketData} from "./app-state/coins.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public coinsMarketData$ = this.store.select(selectCoinMarketData);
  public page: number = 1;
  public filteredCoins: boolean = false;

  constructor(private coinGeckoService: CoinGeckoService,
              private store: Store,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.getAllCoinsMarketData();
  }

  public search(term: string): void {
    term = term.toLowerCase();
    console.log(term);
    if (term != "") {
      this.coinGeckoService.getFilteredCoinMarketData(term).subscribe(coinsMarketData => {
        this.filteredCoins = true;
        this.store.dispatch(retrieveCoinMarketDataList({coinsMarketData}));
      });
    } else {
      this.getAllCoinsMarketData();
    }
  }

  public getPreviousPage(): void {
    if (this.page < 2) {
      this.page = 1;
    } else {
      this.page--;
    }
    this.getAllCoinsMarketData(this.page);
  }

  public getNextPage(): void {
    this.page++;
    this.getAllCoinsMarketData(this.page);
  }

  public getAllCoinsMarketData(page: number = 0): void {
    this.coinGeckoService.getAllCoins(page).subscribe((coinsMarketData) => {
      this.store.dispatch(retrieveCoinMarketDataList({coinsMarketData}));
    });
  }

  public reload(): void {
    window.location.reload()
  }
}
