import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ExchangeRate, ExchangeRatesDO } from './exchange-rates-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangeDataService {
  constructor(private httpSvc: HttpClient) {}

  getRates$(): Observable<ExchangeRate> {
    return this.httpSvc
      .get<ExchangeRatesDO>(`https://api.exchangerate-api.com/v4/latest/GBP`)
      .pipe(
        map((datum) => {
          const exchangeRates: ExchangeRate = { ...datum, rates: [] };

          if (datum?.rates) {
            const rk = datum.rates;
            const rates = Object.keys(rk).map((key) => ({
              currency: key,
              rate: rk[key]
            }));
            exchangeRates.rates = rates;
          }

          return exchangeRates;
        }),
        catchError((error: any) => {
          console.error(error);
          return throwError(() => new Error(error.json()));
        })
      );
  }
}
