import {Component, Input} from '@angular/core';
import {Sort} from "@angular/material/sort";

import {CoinMarket} from "../../models/CoinMarket";

@Component({
  selector: 'app-coins-market-data',
  templateUrl: './coins-market-data.component.html',
  styleUrls: ['./coins-market-data.component.scss', '../../app.component.scss']
})
export class CoinsMarketDataComponent {

  @Input() coinsMarketData: CoinMarket[] | null = [];

  public sortData(sort: Sort): void {
    if (this.coinsMarketData != undefined) {
      const data = this.coinsMarketData.slice();
      if (!sort.active || sort.direction == '') {
        this.coinsMarketData = data;
        return;
      }

      this.coinsMarketData = data.sort((a: any, b: any) => {
        let isAsc = sort.direction == 'asc';
        switch (sort.active) {
          case 'price':
            return compare(a.current_price, b.current_price, isAsc);
          case 'priceCap':
            return compare(a.price_change_24h, b.price_change_24h, isAsc);
          case 'marketCap':
            return compare(a.market_cap_change_24h, b.market_cap_change_24h, isAsc);
          default:
            return 0;
        }
      });
    }
  }
}

function compare(a: number, b: number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
