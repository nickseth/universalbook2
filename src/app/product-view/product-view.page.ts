import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from './../api/book.service';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';
import { SqdatabaseService } from './../api/sqdatabase.service';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from './../api/authentication.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Platform } from "@ionic/angular";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({  
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],     
})
export class ProductViewPage implements OnInit {
  data:any;
  img_src:any;
  price:any;
  description:any;
  book_name:any;
  book_id:any;
  colorVar:any;
  file_exist_status:any;
  filename:any = '';
  request:any;
  progress:any;
  fileurl:any;
  // private downloader: Downloader
  wishlistData:any;
  wishlist_index:any;
  token:any;
  buttonDisabled:any = false;
  valueDisplay:any='none';
  constructor(private router:Router,private route: ActivatedRoute,private book:BookService,
    private file:File,public alertController: AlertController
    ,private activatedRouter: Router,private sqdatabase:SqdatabaseService,
    public loadingController: LoadingController,private authenticationService:AuthenticationService,
    private transfer: FileTransfer,
    private platform: Platform,
    private androidPermissions:AndroidPermissions
    ) { 
    
     
      this.authenticationService.getToken().then(val => {
       this.token =  val.value;
      });
    
        }

  ngOnInit() {
    this.book_id = this.route.snapshot.paramMap.get('id');
this.fetchapiData(this.book_id);
  this.addAndFetchWishlist();

  this.sqdatabase.getDownloadedBookLocation().then(val=>{
    console.log(val)
    // val.forEach(element => {
    //   if(element.user_name == this.token && element.id ==this.book_id){
    //     this.filename = element.book_location;
    //     alert(this.filename);
    //     this.file.checkFile(this.file.externalRootDirectory+'Universal-Book/',this.filename).then(_ => {this.file_exist_status = true;
    //     }).catch(err =>
    //     {
    //       this.file_exist_status = false;} );
    //   }
     
    // }); 
    });

  }
  async fetchapiData(id){
    
    let loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
 
  
 
    await this.book.getBookone(id).subscribe((response) => {
    this.data = response;
    this.img_src = this.data.images[0].src; 
    this.price = this.data.price;
    this.book_name = this.data.name;
    this.description = this.data.description;
    
  if(this.data.downloads[0] != undefined){
    this.filename = this.data.downloads[0].name;
 }
 if(this.data.downloads[0] != undefined){
    this.fileurl = this.data.downloads[0].file;
    
}
    loading.dismiss();
	}); 
  }

  addAndFetchWishlist(){
  
    this.sqdatabase.getWishlistData().then(val=>{
      if(val != null){
        val.forEach((element,index) => {
          if(element.id == this.book_id){
         this.wishlist_index = index;
         this.wishlistData = val;
          } 
        });
      }
  
    });
  }

  setwishlist(){
if(this.token != null){
  this.sqdatabase.addBookWishlist(this.book_id,this.token,this.book_name,this.img_src);
  
      this.wishlistData = true;
} else{
  this.activatedRouter.navigate(['/login']);
}
 
  }
  
  deletewishlist(){
    this.sqdatabase.deletewishlist1(this.wishlist_index);
   
      this.wishlistData = false;
   
      // book_location
   
  }
 
  public async getDownloadPath() {
    if (this.platform.is('ios')) {
        // return this.file.documentsDirectory + "/Universal-Book/";
        return this.file.externalRootDirectory + "/Universal-Book/";
    }

    await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
        result => {
            if (!result.hasPermission) {
                return this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
            }
        }
    );
    this.file.checkDir(this.file.externalRootDirectory , 'Universal-Book').then(_ => console.log('Directory exists'))
      .catch(err =>{ 
      this.file.createDir(this.file.externalRootDirectory , 'Universal-Book', true);
      console.log('Directory doesn\'t exist');
    } );

    return this.file.externalRootDirectory + "Universal-Book/";
}
  async downloadFileone(fileurl ,filename){
    if(this.token != null){
      this.buttonDisabled= true;
      this.valueDisplay = 'block';
  const fileTransfer: FileTransferObject = this.transfer.create();
  let fileexternalurl = await this.getDownloadPath();

  // /let url = "https://standardebooks.org/ebooks/robert-louis-stevenson/treasure-island/downloads/robert-louis-stevenson_treasure-island.epub";
 let url = fileurl;
  let filename1 = url.substring(url.lastIndexOf('/')+1);
   let geturlfinal = encodeURI(url);
 fileTransfer.onProgress((progressEvent) => {
var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
this.progress = perc;
});
 await fileTransfer.download(geturlfinal,fileexternalurl+ filename1,true).then((entry) => {
  this.sqdatabase.addBookDownload(this.book_id,this.token,this.book_name,this.img_src,filename1);
    console.log(entry.toURL());
    setTimeout(()=>{
      this.valueDisplay = 'none';
    },1000)
    this.file_exist_status = true;
  }, (error) => {
   console.log(error)
  });  
} else{
  this.activatedRouter.navigate(['/login']);
}
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
    
    readFile(item_id){
      if(this.token != null){
        this.activatedRouter.navigate(['/bookreader', { id: item_id }]);
      } else{
        this.activatedRouter.navigate(['/login']);
      }

    }
}
