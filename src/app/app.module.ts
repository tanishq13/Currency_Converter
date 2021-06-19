import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SelectCurrencyComponent } from './modal/select-currency/select-currency.component';
import { SelectCurrencyOptionsComponent } from './modal/select-currency-options/select-currency-options.component';
// import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    SelectCurrencyComponent,
    SelectCurrencyOptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
