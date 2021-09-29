import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SqdatabaseService {
book_wishlist_array:any;
  constructor(private storage: Storage) { 
    
  }
  public adddownloadedBook(book_id,user_name,book_url) {

  }

  addBookWishlist(id,user_name,book_name,image_url){

    var list_wishlist = {id:id,user_name:user_name,book_name:book_name,image_url:image_url};
    this.book_wishlist_array = this.storage.get('wishlist');
    this.book_wishlist_array.then(val=>{
      if(val != null){
       val.push(list_wishlist);
        this.storage.set('wishlist',this.book_wishlist_array);
      } else{
        this.book_wishlist_array = [];
        this.book_wishlist_array.push(list_wishlist);
        this.storage.set('wishlist',this.book_wishlist_array);
      }
    })
  }
  getWishlistData(){
    return this.storage.get('wishlist');
  }

  deletewishlist1(index){
    this.book_wishlist_array = this.storage.get('wishlist');
    this.book_wishlist_array.then(val=>{
       val.splice(index,1);
        this.storage.set('wishlist',this.book_wishlist_array);
     
    })
  
  }

  addBookDownload(id,user_name,book_name,image_url,book_location){

    var list_wishlist = {id:id,user_name:user_name,book_name:book_name,image_url:image_url,book_location:book_location};
    this.book_wishlist_array = this.storage.get('download_book_location');
    this.book_wishlist_array.then(val=>{
      if(val != null){
       val.push(list_wishlist);
        this.storage.set('download_book_location',this.book_wishlist_array);
      } else{
        this.book_wishlist_array = [];
        this.book_wishlist_array.push(list_wishlist);
        this.storage.set('download_book_location',this.book_wishlist_array);
      }
    })
  }
  getDownloadedBookLocation(){
    return this.storage.get('download_book_location');
  }
  

}
