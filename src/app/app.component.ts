import { Component,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Platform, AlertController,IonRouterOutlet } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet,{ static : true}) routerOutlet:IonRouterOutlet;
  constructor(private platform: Platform, private _location: Location,private storage: Storage,
    public alertController: AlertController) {
      this.backButtonEvent();
   
      // this.initializeApp();
    this.storage.create();
    // this.initializeApp();
    this.storage.get('dark').then((ev) => {
   
    if(ev != true || ev==null){
      document.body.classList.add('dark');
    } 
    });
  



    }
    // initializeApp() {
    
    // this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
    //   console.log('Back press handler!');
    //   if (this._location.isCurrentPathEqualTo('/home')) {

    //     // Show Exit Alert!
    //     console.log('Show Exit Alert!');
    //     this.showExitConfirm();
    //     processNextHandler();
    //   } else {

    //     // Navigate to back page
    //     console.log('Navigate to back page');
    //     this._location.back();

    //   }

    // });

  //   this.platform.backButton.subscribeWithPriority(5, () => {
  //     console.log('Handler called to force close!');
  //     this.alertController.getTop().then(r => {
  //       if (r) {
  //         navigator['app'].exitApp();
  //       }
  //     }).catch(e => {
  //       console.log(e);
  //     })
  //   });

  // }

  // showExitConfirm() {
  //   this.alertController.create({
  //     header: 'App termination',
  //     message: 'Do you want to close the app?',
  //     backdropDismiss: false,
  //     buttons: [{
  //       text: 'Stay',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Application exit prevented!');
  //       }
  //     }, {
  //       text: 'Exit',
  //       handler: () => {
  //         navigator['app'].exitApp();
  //       }
  //     }]
  //   })
  //     .then(alert => {
  //       alert.present();
  //     });
  // }
    backButtonEvent(){
      this.platform.backButton.subscribeWithPriority(10,()=>{
     
        if(!this.routerOutlet.canGoBack()){
          this.backButtonAlert();
        } else{
          this._location.back();
        }
      });
    }
    async backButtonAlert(){
    const alert = await this.alertController.create({
      header: 'Universal Book',
      message: 'Are you sure you want to quit?',
      buttons:[{
        text: 'No',
        role: 'cancel'
      },{
        text: 'Yes',
        handler: ()=> {
          navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
    }
}
