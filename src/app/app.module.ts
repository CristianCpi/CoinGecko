import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {MatSortModule} from '@angular/material/sort';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoinsMarketDataComponent} from './component/coins-market-data/coins-market-data.component';
import {coinsMarketDataReducer} from "./app-state/coins.reducer";
import {SearchCoinsComponent} from './component/search-coins/search-coins.component';


@NgModule({
  declarations: [
    AppComponent,
    CoinsMarketDataComponent,
    SearchCoinsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSortModule,
    RouterModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({coinsMarketData: coinsMarketDataReducer}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
