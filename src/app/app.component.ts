import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ExchangeDataService } from './exchange-data.service';
import { Rates, ExchangeInfo } from './exchange-rates-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  sub!: Subscription;

  rates = new BehaviorSubject<Rates[]>([]);
  rates$ = this.rates.asObservable();

  exchangeInfo = new BehaviorSubject<ExchangeInfo | undefined>(undefined);
  exchangeInfo$ = this.exchangeInfo.asObservable();

  columnDefs!: ColDef[];
  gridOptions!: GridOptions;

  title = 'tagri';
  /**
   *
   */
  constructor(private dataSvc: ExchangeDataService) {}

  ngOnInit() {
    this.setupGrid();
    this.sub = this.dataSvc.getRates$().subscribe((response) => {
      // this.data.next(response);
      this.rates.next(response.rates);
      this.exchangeInfo.next(response);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  setupGrid() {
    this.columnDefs = [
      {
        headerName: 'Currency',
        field: 'currency',
        sortable: true
      },
      {
        headerName: 'Exchange Rate',
        sortable: true,
        field: 'rate'
      }
    ];
    this.gridOptions = {
      domLayout: 'autoHeight',
      headerHeight: 40,
      pagination: true,
      paginationPageSize: 10
    };
  }
}

