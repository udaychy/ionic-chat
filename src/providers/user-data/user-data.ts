import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SqlStorageProvider } from '../sql-storage/sql-storage';
import { NativeDataProvider } from '../native-data/native-data';
import * as _ from 'lodash';
import { FirebaseDataProvider } from '../firebase-data/firebase-data';
import { Contact } from '@ionic-native/contacts';
import {ContactModel} from '../../model/contact-model'

@Injectable()
export class UserDataProvider {
  private allContacts: ContactModel[]
  public contacts: any[]
  
  constructor(
    private sqlite: SqlStorageProvider,
    private nativeProvider: NativeDataProvider,
    private fbService: FirebaseDataProvider ) {
    console.log('Hello UserDataProvider Provider');
  }

  addUser(key: string, value: any) {
    return this.sqlite.set(this.sqlite.tables.user, key, value);
  }
  
  getCurrentUser(){
    return this.sqlite.getAll(this.sqlite.tables.user);
  }

  storeAllContactsLocally(contacts: ContactModel[]): void{
    var kvContacts = _.flatMap(contacts, (contact) => {
      // return contact.phoneNumbers.map(number => {
      //     var key = number.value;
      //     var value = new ContactModel(contact.displayName, number.value, number.type, contact.photos)
      //     return { key: key, value: value };
      //   })

      return { key: contact.number, value: contact };
    });
    return this.sqlite.bulkInsert(this.sqlite.tables.contacts, kvContacts, true);
  }

  getAllContacts(forchRefresh: boolean = false): Promise<any> {
    return new Promise((res, rej) => {

      if (!forchRefresh && this.allContacts) { res(this.allContacts); return }
      if (!this.allContacts) {
        this.sqlite.getAll(this.sqlite.tables.contacts).then((contacts) => {
          if (contacts && contacts.length > 0) {
            this.allContacts = contacts;
            res(contacts)
          } else {
            this.fetchFromNativeContact().then(() => {
              this.storeAllContactsLocally(this.allContacts);
              res(this.allContacts);
            });
          }
        })
      }
      else if (forchRefresh) {
        this.fetchFromNativeContact().then(() => {
          this.storeAllContactsLocally(this.allContacts);
          res(this.allContacts);
        });
      }
    });
  }

  filterContact(searchKeyword):ContactModel[]{
    if(!searchKeyword) return this.allContacts;

    var filteredRes = _.find(this.allContacts, function(contact) { 
      var isContain = contact.displayName.toLowerCase().includes(searchKeyword.toLowerCase()) 
      || contact.numbertoLowerCase().includes(searchKeyword.toLowerCase())
      console.log(isContain)
      return isContain;
     });
     console.log(filteredRes);
     return filteredRes;
  }


  private fetchFromNativeContact() {
    return this.nativeProvider.filterContacts().then(data => {
      this.allContacts = _.flatMap(data, (contact) => {
        return contact.phoneNumbers.map(number => {
           return new ContactModel(contact.displayName, number.value, number.type, contact.photos)
          //   displayName: contact.displayName,
          //   number: number.value,
          //   type: number.type,
          //   avatar: contact.photos
          // }
        })
      });
      this.storeAllContactsLocally(this.allContacts);
    });
  }
}
