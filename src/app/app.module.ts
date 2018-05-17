import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts } from '@ionic-native/contacts';
import { SignupPage } from '../pages/signup/signup';
import { Sim } from '@ionic-native/sim';
import { ImagePicker } from '@ionic-native/image-picker';
import { SQLite } from '@ionic-native/sqlite';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { NativeDataProvider } from '../providers/native-data/native-data';
import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';
import { UserDataProvider } from '../providers/user-data/user-data';
import { FirebaseDataProvider } from '../providers/firebase-data/firebase-data';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

export const firebaseConfig = {
  apiKey: "AIzaSyBLv1eOAbHM-0g1hYOOQGCL1CBrqc9Jv28",
  authDomain: "ionicchat-ea670.firebaseapp.com",
  databaseURL: "https://ionicchat-ea670.firebaseio.com",
  projectId: "ionicchat-ea670",
  storageBucket: "ionicchat-ea670.appspot.com",
  messagingSenderId: "718042525698"
};

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Contacts,
    Sim,
    NativeDataProvider,
    ImagePicker,
    SqlStorageProvider,
    UserDataProvider,
    FirebaseDataProvider,
    HttpClient,
    SQLite
  ]
})
export class AppModule {}
