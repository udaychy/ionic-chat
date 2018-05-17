import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { NativeDataProvider } from '../../providers/native-data/native-data';
import { Platform } from 'ionic-angular/platform/platform';
import { ImagePicker } from '@ionic-native/image-picker';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { TabsPage } from '../tabs/tabs';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { UserDataProvider } from '../../providers/user-data/user-data';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  @ViewChild(Slides)
  public slides: Slides;
  public availableSims: any[]
  public readonly imagePanda:string = "assets/imgs/welcome_panda.jpg"
  public readonly imageDummy:string = "assets/imgs/no_image.png"
  public readonly imageHurray:string = "assets/imgs/minion_hurray.jpg"

  public userPhoneNumber: any;
  public userName: any;
  public userStatus: any ="Hey there, I am using Ionic Chat app";
  public userAvatar:string = this.imageDummy;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativeService: NativeDataProvider,
    private platform: Platform,
    private imagePicker: ImagePicker,
    private toaster: ToastController,
    private fbService: FirebaseDataProvider,
    private userService: UserDataProvider,
    private alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');

    this.slides.lockSwipeToNext(true);

    // setting the available sims
    if (!this.nativeService.availableSim || this.nativeService.availableSim.length == 0) {
      this.nativeService.getAvailableSim().then(sims => {
        this.availableSims = sims;
        // setting the first sim as default selected 
        if(sims && sims.length > 0){
          this.userPhoneNumber = sims[0];
          this.checkUser(this.userPhoneNumber);
        }
        console.log('available sims', this.availableSims);
      });
    }
     
  }

  validateFirstSlide(){
    this.slides.lockSwipeToNext(!this.userName || !this.userPhoneNumber);
  }

  validateSecondSlide(){
    this.slides.lockSwipeToNext(!this.userStatus);
  }

  pickImage() {
    var options = { maximumImagesCount: 1 }

    this.imagePicker.getPictures(options).then((imageData) => {
      if(!imageData || imageData.length == 0) return;

      this.userAvatar = 'data:image/jpeg;base64,' + imageData[0];
      console.log('Image URI: ' + imageData[0]);
      this.presentToaster("Looking awesome");
    }, (err) => {
      this.imagePicker.hasReadPermission().then(hasPermit => {
        if (!hasPermit) {
          this.presentToaster("Permission Denied");
          this.imagePicker.requestReadPermission();
        } else {
          this.presentToaster("Upload failed");
          console.log(err);
        }
      })
    });
  }

  goToTabPage(){
    this.navCtrl.setRoot(TabsPage);
  }

  getStarted(){
    var userInfo = {
      number: this.userPhoneNumber,
      name: this.userName,
      status: this.userStatus,
      avatar: this.userAvatar
    }

    var key = this.fbService.addUser(userInfo);
    this.userService.addUser(key, userInfo)
    this.goToTabPage()
  }

  checkUser(phone: number){
    this.fbService.getUser(phone).subscribe((user) => {
      user && this.showConfirm(user);
    })
  }

  showConfirm(user) {
    let confirm = this.alertCtrl.create({
      title: 'This number is already registered',
      message: 'Do you want to continue as <b>'+ user.name +'</b>?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => this.goToTabPage()
        }
      ]
    });

    confirm.present();
  }

  private presentToaster(msg:string){
    let toast = this.toaster.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
