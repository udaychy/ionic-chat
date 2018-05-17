import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';

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
}
