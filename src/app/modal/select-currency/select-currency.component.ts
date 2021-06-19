import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from '../../services/message/message.service';
import {DataService} from '../../services/data/data.service';
@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.component.html',
  styleUrls: ['./select-currency.component.css']
})
export class SelectCurrencyComponent implements OnInit {
  subscription : Subscription;
  openCurrencyModal=false;
  currency_types=[];
  constructor(private messageService : MessageService,private dataservice: DataService) {
    this.subscription = this.messageService.getMessage().subscribe(message=>{
      if(message['text'] == 'openCurrencyModal'){
        this.openCurrencyModal = true;
      }
    })
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
  currency_selected(currency_name){
    console.log(currency_name);
    this.dataservice.updateConversionList(currency_name);
    this.messageService.sendMessage("closeModal");
  }

}
