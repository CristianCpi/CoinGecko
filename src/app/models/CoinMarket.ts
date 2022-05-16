export interface CoinMarket {
  id: string,
  symbol: string,
  name: string,
  image: string,
  current_price: number,
  market_cap: number,
  total_volume: number,
  high_24h: number,
  low_24h: number,
  price_change_24h: number,
  market_cap_change_24h: number,
  last_updated: string,
  market_cap_rank: number
}
