import { Component, OnInit, Renderer2 } from '@angular/core';
 import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalculatorPage } from '../calculator/calculator.page';
import { AuthenticationService } from './../api/authentication.service';
import { UserdetailsService } from './../api/userdetails.service';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage{
  darkValue: any;
token:any='';
userdetails:any;
user:any;
  constructor(private  storage: Storage,
    private activatedRouter: Router,
    public modalController: ModalController,
    public authenticationService:AuthenticationService,
    public userdetailsService:UserdetailsService) {

    this.storage.get('dark').then((ev) => {
      if(ev!=true){ 
      } else{
        this.darkValue = true;
      }
    });
  this.authenticationService.getToken().then(val => {
    this.token = val.value;
    let data = {'token':this.token};
    this.userdetailsService.getUserDeatils(data).subscribe(val=>{
      this.userdetails = val;
      if(this.userdetails.fname == undefined){
        this.user = "Guest";
      } else{
        this.user = this.userdetails.fname +" " +this.userdetails.lname;
      }
     
    })
});

  }

  setTheme(ev){
    if(ev.detail.checked == true){
      document.body.classList.remove('dark');
    
     } else{
      document.body.classList.add('dark');
     }
     localStorage.test = ev.detail.checked;
     this.storage.set('dark', ev.detail.checked);
    
   }
 
   async presentModal() {
    const modal = await this.modalController.create({
      component: CalculatorPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      animated:true,
      presentingElement: await this.modalController.getTop()
    });
    return await modal.present();
  }


  async logout() {
    await this.authenticationService.logout();
    this.activatedRouter.navigateByUrl('/', { replaceUrl: true });
  }

}
