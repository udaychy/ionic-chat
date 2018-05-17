import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabContact = ContactPage;
  public newUserInfo: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.newUserInfo = this.navParams.data;
      console.log('nav param received in the tabs page', this.newUserInfo);
  }
}
