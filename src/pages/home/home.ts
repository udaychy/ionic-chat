import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(
    public navCtrl: NavController,
    public navParam: NavParams) {
  }

  goToContactTab(){
    (this.navCtrl.parent as Tabs).select(2);
  }

  goToChatPage(){
    var chat = {
      number:9999999999,
      name:"Test"
    }
    this.navCtrl.parent.parent.push(ChatPage, chat)
  }
}
