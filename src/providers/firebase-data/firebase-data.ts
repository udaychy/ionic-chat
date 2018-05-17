import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
import * as moment from 'moment'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseDataProvider {

  private userRef:AngularFireList<any>

  constructor(
    public http: HttpClient,
    private db: AngularFireDatabase) {
    console.log('Hello FirebaseDataProvider Provider');
    this.userRef = db.list('users');
  }

  addUser(userInfo:any){
    var ref = this.userRef.update(userInfo.number, this.getNewUserObject(userInfo));
    //var ref = this.userRef.push(this.getNewUserObject(userInfo));
    return userInfo.number;
  }

  getUser(phone: any): Observable<any> {
    return this.db.list('users/' + phone).valueChanges();
  }


  /********** Object Creation methods ***********/
  private getNewUserObject(userInfo){
    return{
      username: userInfo.name,
      number: userInfo.number,
      status: userInfo.status,
      avatar: userInfo.avatar,
      createdAt: moment().toString(),
      lastLogin: moment().toString(),
      conversation: ""
    }
  }
}
