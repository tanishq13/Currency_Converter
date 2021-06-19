import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import {MessageService} from '../services/message/message.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  myCurr = 'INR';
  resCurr = 'USD';
  input1;input2;
  currency_types;
  currency_rates;
  selectCurrencyModal=false;
  conversion_list=[]
  messages: any[] = [];
  subscription: Subscription;
  showCurrencyOptionModal = false
  constructor(private dataservice : DataService, private messageService : MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message['text'] == 'closeModal') {
        console.log(message)
        this.selectCurrencyModal = false;
        // this.conversion_list = this.dataservice.getCurrencyList();
      } 
      if(message['text']=='currency_list_updated'){
        console.log(message['text'])
        this.showCurrencyOptionModal = false
        this.conversion_list = this.dataservice.getCurrencyList();
      }
      if(message['text']=='conversionListUpdated'){
        for(let i=0;i<this.conversion_list.length;i++){
          this.conversion_list[i].value = 0;
        }
      }
      else {
        // clear messages when empty message received
        this.messages = [];
      }
    });
  }

  ngOnInit(): void {
    this.dataservice.currSymbols().subscribe(data=>{
      this.currency_types = data;
      console.log(this.currency_types);
      this.dataservice.setDataSymbols(data['symbols'])
    });
    this.dataservice.currencyRate().subscribe(data=>{
      this.currency_rates = Object.keys(data['rates']);
      console.log(data['rates']);
      this.dataservice.setDataRates(data['rates'])
    });
  }
  resetCurrency(index){
    this.selectCurrencyModal = true;
    this.dataservice.setCurrencyIndex(index);
    this.messageService.sendMessage("openCurrencyModal");
  }
  addCurrency(){
    // this.selectCurrencyModal = true;
    if(this.conversion_list.length <10){
      // this.dataservice.newCurrency();
      this.showCurrencyOptionModal = true;
    }
    else{
      alert("currency list limit")
    }
  }
  conversion_initiated(index){
    let base = this.conversion_list[index].value/this.conversion_list[index].rate;
    for(let j=0;j<this.conversion_list.length;j++){
      if(j!=index){
        this.conversion_list[j].value = 0;
        this.conversion_list[j].value = this.conversion_list[j].rate * base;
      }
    }
  }
}
