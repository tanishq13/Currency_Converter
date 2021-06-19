import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
// import { symbols } from 'fixer-api';
import {MessageService} from '../message/message.service';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  subscription : Subscription; 
  index;
  baseURL = "http://data.fixer.io/api/";
  endpoint = '';
  key = env.fixer.access_key;
  conversion_list = [];
  currency_rates_list;
  currWithSymbols = {};
  currWithRates = {};
  constructor(public http: HttpClient,private messageService : MessageService) {
    // this.subscription = this.messageService.getMessage().subscribe(message=>{
    //   if(message == 'updateConversionList'){

    //   }
    // })
  }
  
  currSymbols(){
    this.endpoint = 'symbols';
    return this.http.get(
      this.baseURL + this.endpoint + '?access_key=' + this.key
    );
  }
  currencyRate() {
    return this.http.get(this.baseURL + "latest?access_key=" + this.key);
  }
  setDataSymbols(objSymbols){
    this.currWithSymbols = objSymbols;
    console.log(objSymbols)
  }
  setDataRates(objRates){
    this.currWithRates = objRates;
    console.log(objRates)
  } 
  newCurrency(short_name){
    let obj = {};
    obj['short_name'] = short_name;
    obj['rate'] = parseFloat(this.currWithRates[short_name]);
    obj['value'] = 0;
    this.conversion_list.push(obj);
    console.log(this.conversion_list)
    this.messageService.sendMessage('currency_list_updated')
  }
  getCurrencyList(){
    return this.conversion_list;
  }
  setCurrencyIndex(index){
    this.index = index;
  }
  updateConversionList(short_name){
    // console.log(this.index)
    this.conversion_list[this.index].short_name = short_name;
    this.conversion_list[this.index].rate = parseFloat(this.currWithRates[short_name]);
    this.conversion_list[this.index].value = 0;
    console.log(this.conversion_list)
    this.messageService.sendMessage('conversionListUpdated')
  }
}
