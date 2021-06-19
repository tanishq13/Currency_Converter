import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from '../../services/message/message.service';
import {DataService} from '../../services/data/data.service';
@Component({
  selector: 'app-select-currency-options',
  templateUrl: './select-currency-options.component.html',
  styleUrls: ['./select-currency-options.component.css']
})
export class SelectCurrencyOptionsComponent implements OnInit {
  currency_types=[];
  openCurrencyModal;
  subscription : Subscription;
  constructor(private dataservice : DataService,private messageService : MessageService) {
    // this.subscription = this.messageService.getMessage().subscribe(message=>{
    //   if(message['text'] == 'openCurrencyModal'){
    //     this.openCurrencyModal = true;
    //   }
    // })
  }

  ngOnInit(): void {
    this.dataservice.currSymbols().subscribe(data=>{
      let sample_values = data['symbols'];
      for (const [key, value] of Object.entries(sample_values)) {
        let obj = {};
        obj['short_name'] = key;
        obj['full_name'] = value;
        this.currency_types.push(obj)
        // console.log(key,':', value);
      }
      
      console.log(this.currency_types);
    });
  }
  currency_selected(short_name){
    this.dataservice.newCurrency(short_name);
  }

}
