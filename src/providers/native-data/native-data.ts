
import { Injectable } from '@angular/core';
import { Sim } from '@ionic-native/sim';
import { Contacts, Contact, ContactField, ContactName, ContactFieldType } from '@ionic-native/contacts';
import { Platform } from 'ionic-angular/platform/platform';
import * as _ from 'lodash';

@Injectable()
export class NativeDataProvider {
  public availableSim: any[];

  constructor(
    private sim: Sim,
    private contacts: Contacts,
    private platform: Platform ) {

    console.log('Hello NativeDataProvider Provider');
    this.getAvailableSim().then(info => {
      this.availableSim = info;
    })
  }

  public getAvailableSim(): Promise<any> {

    return new Promise((res, rej) => {
      this.platform.ready().then(() => {
        this.sim.getSimInfo().then((info) => {
          console.log('Sim info: ', info);
          var phnNums = info.cards.map((card) => {
            if (card.phoneNumber) {
              return card.phoneNumber
            }
          });
          res(phnNums);
        }, (err) => {
          console.log('Unable to get sim info: ', err)
          this.sim.hasReadPermission().then((hasPermission) => {
            console.log('Has permission: ', hasPermission)

            if (!hasPermission) {
              this.sim.requestReadPermission().then(
                () => res(this.getAvailableSim()),
                () => rej("Premission Denied"))
            } else {
              rej(err);
            }
          });
        });
      })
    });
  }

  filterContacts(searchKeyword: string = ""): Promise<Contact[]> {
    var fields: ContactFieldType[] = ['displayName', 'name', 'phoneNumbers', 'emails', 'photos'];
    var options = { filter: searchKeyword, multiple: true };

    return this.contacts.find(fields, options)
      .then((contacts) => {
        console.log(contacts);
        return contacts
      });
  }

}
