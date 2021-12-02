export interface ExchangeInfo {
  provider: string;
  WARNING_UPGRADE_TO_V6: string;
  terms: string;
  base: string;
  date: string;
  time_last_updated: number;
}

export interface ExchangeRatesDO extends ExchangeInfo {
  rates: { [key: string]: number };
}

export interface Rates {
  currency: string;
  rate: number;
}

export interface ExchangeRate extends ExchangeInfo {
  rates: Rates[];
}
