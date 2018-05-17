import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';
import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';
import { NativeDataProvider } from '../providers/native-data/native-data';
import { UserDataProvider } from '../providers/user-data/user-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private sqlStore: SqlStorageProvider,
    private userService: UserDataProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      sqlStore.initializeDatabase().then(() => {
        userService.getCurrentUser().then(user => {
          this.rootPage = user ? TabsPage : SignupPage
        })
      });
      
    });
  }
}
