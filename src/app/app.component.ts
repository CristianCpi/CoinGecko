import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {CoinGeckoService} from "./services/coin-gecko.service";
import {retrieveCoinMarketDataList} from "./app-state/coins.actions";
import {selectCoinMarketData} from "./app-state/coins.selectors";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public coinsMarketData$ = this.store.select(selectCoinMarketData);
  public page: number = 1;
  public pageCount: number = 1;
  public filteredCoins: boolean = false;
  private ngUnsubscribe = new Subject();

  constructor(private coinGeckoService: CoinGeckoService,
              private store: Store) {
  }

  public ngOnInit(): void {
    this.getAllCoinsMarketData();
  }

  public search(term: string): void {
    term = term.toLowerCase();
    if (term != "") {
      this.coinGeckoService.getFilteredCoinMarketData(term).pipe(takeUntil(this.ngUnsubscribe)).subscribe(coinsMarketData => {
        this.filteredCoins = true;
        this.store.dispatch(retrieveCoinMarketDataList({coinsMarketData}));
        this.ngUnsubscribe.next(coinsMarketData);
        this.ngUnsubscribe.complete();
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
    this.pageCount -= 100;
    this.getAllCoinsMarketData(this.page);
  }

  public getNextPage(): void {
    this.page++;
    this.pageCount += 100;
    this.getAllCoinsMarketData(this.page);
  }

  public getAllCoinsMarketData(page: number = 0): void {
    this.coinGeckoService.getAllCoins(page).pipe(takeUntil(this.ngUnsubscribe)).subscribe((coinsMarketData) => {
      this.store.dispatch(retrieveCoinMarketDataList({coinsMarketData}));
      this.ngUnsubscribe.next(coinsMarketData);
      this.ngUnsubscribe.complete();
    });
  }

  public reload(): void {
    window.location.reload()
  }

}
