import {Component, Input} from '@angular/core';

import {CoinMarket} from "../../models/CoinMarket";

@Component({
  selector: 'app-search-coins',
  templateUrl: './search-coins.component.html',
  styleUrls: ['./search-coins.component.scss', '../../app.component.scss']
})
export class SearchCoinsComponent {

  @Input() coinsMarketData: CoinMarket[] | null = [];

}
