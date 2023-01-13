import { Component } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addMessageData } from '../ngrx-store/messageAction';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  messageData: Observable<any>;
  loader:boolean = false;

  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any> | any;

  constructor(
    private dialog: MatDialog,
    private store: Store<{ messageData: any ,apiLoader:any }>,
    private apiServices: ApiService,
    private snackbar: MatSnackBar
  ) {
    this.messageData = this.store.select('messageData');
    this.messageData =  this.apiServices.getAll()
   this.store.select('messageData').subscribe(e =>{
    if(e.length>0){
      this.loader = false
      let msg = 'Message send successfuly'
        this.snackbarMsg(msg)
    }
   })
   
    
  }

  callAPI() {
    this.dialog.open(this.callAPIDialog);
  }

  closeMsgDialog() {
    this.dialog.closeAll();
  }

  snackbarMsg(msg:any){
    this.snackbar.open(msg, '');
    setTimeout(() => {
      this.snackbar.dismiss();
    }, 1000);
  }

  submit(data: any) {
    if (data.name != '' && data.message != '') {
      this.loader = true
      this.store.dispatch(addMessageData(data));
      this.dialog.closeAll();
    } else {
      let msg = 'All fields is requierd'
      this.snackbarMsg(msg)
    }
  }
}
