import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './../api/book.service';
import { LoadingController } from '@ionic/angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
// import { AuthenticationService } from './../api/authentication.service';
import { Network } from '@capacitor/network';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
// , private fcm: FCM
export class HomePage {
  resultwithid: any;
  result: any;
  result_category: any;
  result2: any;
  networkstatus:any;
  loading:any;
  constructor(private activatedRouter: Router, private book: BookService
    , public loadingController: LoadingController,) {
   

    Network.getStatus().then(val=>{
      if(val.connected == false){
       this.networkstatus = false;
       this.activatedRouter.navigate(['/account']);
       this.loading.dismiss();
      } else{
       this.networkstatus = true;
     
       this.getapidata();
      }
         })

         Network.addListener('networkStatusChange', status => {
          if(status.connected == false){
            this.networkstatus = false;
            this.activatedRouter.navigate(['/account']);
            this.loading.dismiss();
           } else{
            this.networkstatus = true;
            console.log(this.networkstatus);
            this.getapidata();
           }
        });
        
        const logCurrentNetworkStatus = async () => {
          const status = await Network.getStatus();
          if(status.connected == false){
            this.networkstatus = false;
            this.activatedRouter.navigate(['/account']);
            this.loading.dismiss();
           } else{
            this.networkstatus = true;
            console.log(this.networkstatus);
            this.getapidata();
           }
        };

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      // alert('Push registration success, token: ' + token.value);
      console.log('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
 
   
    // Network.addListener('networkStatusChange', status => {
    //   console.log('Network status changed', status.connected);
      
    //   if(status.connected == false){
    //     this.networkstatus = false;
    //     this.activatedRouter.navigate(['/mybooks']);
    //   } else{
    //     this.networkstatus = true;
    //   }
    // });
    
    // const logCurrentNetworkStatus = async () => {
    //   const status = await Network.getStatus();
      
    //   if(status.connected == false){
    //     this.networkstatus = false;
    //     this.activatedRouter.navigate(['/mybooks']);
    //   } else{
    //     this.networkstatus = true;
    //   }
    // };

  }

  viewItem(item_id) {
    this.activatedRouter.navigate(['/product-view', { id: item_id }]);

  }
  viewCategory(category_id, title) {
 
    this.activatedRouter.navigate(['/categoryreader', { cate_id: category_id, title: title }]);
  }

  async getapidata() {
    

      this.loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
        });
        await this.loading.present();
    
    
        await this.book.getBooks().subscribe((response) => {
    
          this.result = response;
          console.log(this.result)
          // console.log(response[0].images[0].src);
          this.book.getCategory().subscribe((response) => {
            this.result_category = response;
            this.loading.dismiss();
          });
        });
    
    
   
  }

  getdataRefresh(event) {
    this.book.getBooks().subscribe((response) => {

      this.result = response;

      if (event)
        event.target.complete();
    }, error => {
      console.log(error);
      if (event)
        event.target.complete();
      // console.log(response[0].images[0].src);
    });
    this.book.getCategory().subscribe(response => {
      this.result_category = response;

    });

  }
}
