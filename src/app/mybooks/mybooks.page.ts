import { Component, OnInit } from '@angular/core';
import { SqdatabaseService } from './../api/sqdatabase.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.page.html',
  styleUrls: ['./mybooks.page.scss'],
})
export class MybooksPage implements OnInit {
  bookData:any;
  constructor(private sqdatabase:SqdatabaseService,private activatedRouter:Router
    ,private storage: Storage,public alertController: AlertController,private file:File) { 
  }

  ngOnInit() {
this.datafunc();
  }
    datafunc(){
      this.sqdatabase.getDownloadedBookLocation().then(val=>{
        this.bookData = val;
      });
    }
    
  
  getUsersList(event) {
    return  this.sqdatabase.getDownloadedBookLocation().then(val=>{
      this.bookData = val;

        if (event)
          event.target.complete();
      }, error => {
        console.log(error);
        if (event)
          event.target.complete();
      })
  }
  viewItem(book_location) {

  
     this.activatedRouter.navigate(['/readpdf', { id: book_location }]);

  }

  viewItemdelete(id,path,file_name){
      var location_book = this.storage.get('download_book_location');
    location_book.then(val => {
        let index = val.findIndex((rank, index) => rank.id === id);
          val.splice(index, 1);
          this.storage.set('download_book_location', location_book);
        
      });
      this.file.removeFile(path,file_name);
      setTimeout(() => {
        this.datafunc();
      }, 1000);
     
  }
  async DownloadAlert(erro){
    const alert = await this.alertController.create({
      message: erro,
      buttons:[{
        text: 'Ok',
        role: 'cancel'
      }]
    });
    await alert.present();
    } 

}
