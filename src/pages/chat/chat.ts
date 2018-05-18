import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  public chat:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chat = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
