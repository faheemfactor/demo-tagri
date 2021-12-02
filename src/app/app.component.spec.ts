import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AgGridModule } from 'ag-grid-angular';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ExchangeDataService } from './exchange-data.service';
import { GridOptions } from "ag-grid-community";

describe('AppComponent', () => {
  const mockSvcData = {
    provider: 'https://www.exchangerate-api.com',
    WARNING_UPGRADE_TO_V6: 'https://www.exchangerate-api.com/docs/free',
    terms: 'https://www.exchangerate-api.com/terms',
    base: 'GBP',
    date: '2021-12-01',
    time_last_updated: 1638316802,
    rates: [
      { currency:'GBP', rate: 1.27 },
      { currency:'CAD', rate: 4.89 }
    ]
  };

  const mockExchangeDataService = {

    getRates$() {
      return of(mockSvcData);
    }
  };

  let gridOptions: GridOptions = <GridOptions>{};

  beforeEach(async () => {
    // mockExchangeDataService = jasmine.createSpyObj([
    //   'getRates$'
    // ]);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AgGridModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: ExchangeDataService,
          useValue: 
            mockExchangeDataService
          
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tagri'`, () => {
    
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tagri');
  });

  it('should show exchange info', () => {
    // mockExchangeDataService.getRates$.and.returnValue(of(mockSvcData));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#provider-value')?.textContent).toContain(mockSvcData.provider);
    expect(fixture.componentInstance.rates$)
  });


  it('should show grid', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(`ag-grid-angular`)?.textContent).not.toBeNull();
  });

});
