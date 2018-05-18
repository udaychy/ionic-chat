import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlStorageProvider {
  private db: SQLiteObject;
  public readonly tables = {
    user : 'user',
    chats: 'chats',
    messages: 'messages',
    contacts: 'contacts'
  }

  constructor(private sqLite: SQLite) {
    console.log('Hello SqlStorageProvider Provider');
  }

  getAll(table:string) {
    return this.db.executeSql('SELECT key, value FROM '+ table +'', [])
      .then(data => {
        console.log('getAll', data);
        let results = [];
        for (let i = 0; i < data.rows.length; i++) {
          results.push(JSON.parse(data.rows.item(i).value));
        }
        return results;
      });
  }

  get(table:string, key: string) {
    return this.db.executeSql('select key, value from '+ table +' where key = ? limit 1', [key])
      .then(data => {
        console.log('get', data);
        if (data.rows.length > 0) {
          return JSON.parse(data.rows.item(0).value);
        }
      });
  }

  remove(table:string, key: string) {
    return this.db.executeSql('delete from '+ table +' where key = ?', [key]);
    
  }

  removeAll(table:string) {
    return this.db.executeSql('delete from '+ table, []);
    
  }

  set(table:string, key: string, value: any) {
    return this.db.executeSql('insert or replace into '+ table +'(key, value) values (?, ?)', [key, JSON.stringify(value)])
      .then(data => {
        console.log('set', data);
        if (data.rows.length > 0) {
          return JSON.parse(data.rows.item(0).value);
        }
      });
  }

  bulkInsert(table:string, data: {key:string, value:any}[], clearBeforeInsert:boolean = false){

    var deletePromise = clearBeforeInsert ? this.db.executeSql('delete from ' + table, [])
      : new Promise((res, rej) => { res() });

    deletePromise.then(() => {
      for (var i = 0; i < data.length; i++) {
        this.db.executeSql('INSERT INTO ' + table + ' (key, value) VALUES (?, ?)',
          [data[i].key, JSON.stringify(data[i].value)]);
      }
    })
  }

  updateKey(table:string, oldKey:string, newKey:string){
    return this.db.executeSql('update '+ table +' SET key = ? WHERE key = ?', [newKey, oldKey])
    .then(data => {
      console.log('updateKey', data);
    });
  }

  initializeDatabase() {
    return this.sqLite.create({ name: 'data.chat', location: 'default' })
      .then(db => {
        this.db = db;
        this.db.executeSql('CREATE TABLE IF NOT EXISTS '+ this.tables.contacts +' (key text, value text)', [])
        this.db.executeSql('CREATE TABLE IF NOT EXISTS '+ this.tables.user +' (key text primary key, value text)', [])
        this.db.executeSql('CREATE TABLE IF NOT EXISTS '+ this.tables.chats +' (key text primary key, value text)', [])
        this.db.executeSql('CREATE TABLE IF NOT EXISTS '+ this.tables.messages +' (key text primary key, value text)', [])
         
      });
  }
}
