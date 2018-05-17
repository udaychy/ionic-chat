import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName, ContactFieldType } from '@ionic-native/contacts';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NativeDataProvider } from '../../providers/native-data/native-data';
import { UserDataProvider } from '../../providers/user-data/user-data';
import {ContactModel} from '../../model/contact-model'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public allContacts: Contact[];
  public searchKeyword: string = "";
  public contactList: ContactModel[];
  public isSearchActive:boolean = false;

  constructor(
    public navCtrl: NavController,
    private contacts: Contacts,
    private alertCtrl: AlertController,
    private nativeProvider: NativeDataProvider,
    private userService: UserDataProvider){
  }

  ionViewDidLoad(){
    this.loadContacts()
  }

  ionViewDidEnter(){
    //this.filterContacts();
  }

  filterContacts() {
    //this.nativeProvider.filterContacts(this.searchKeyword)
    // .then((contacts) => this.contactList = contacts)
    // .catch(error => this.presentAlert(error));
    this.contactList = this.userService.filterContact(this.searchKeyword)
  }

  presentAlert(msg:string) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  createContact(){
    let contact: Contact = this.contacts.create();
    
    contact.name = new ContactName(null, 'Uday', 'Kumar');
    contact.phoneNumbers = [new ContactField('mobile', '9999999900')];
    contact.save().then(
      () => {
        console.log('Contact saved!', contact)
        alert('Contact saved');
      },
      (error: any) => console.error('Error saving contact.', error)
    );
  }

  loadContacts(hardReload:boolean = false){
    return this.userService.getAllContacts(hardReload)
    .then((contacts) => this.contactList = contacts)
    .catch(error => this.presentAlert(error));
  }

  public clearAndToggleSearchBar(){
    this.isSearchActive = !this.isSearchActive; 
    this.searchKeyword = "";
  }

  refreshContacts(refresher) {
    this.loadContacts(true).then(() => refresher.complete());
  }

}
