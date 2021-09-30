import { Component, OnInit } from '@angular/core';
import { SqdatabaseService } from './../api/sqdatabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  wishlistData:any;
  constructor(private storage:SqdatabaseService,private activatedRouter: Router) { 

  }

  ngOnInit() {
    this.storage.getWishlistData().then(val=>{
      this.wishlistData = val;
      
     
    });
  }
  viewItem(item_id) {
    this.activatedRouter.navigate(['/product-view', { id: item_id }]);

  }
  getUsersList(event) {
    return  this.storage.getWishlistData().then(val=>{
      this.wishlistData = val;

        if (event)
          event.target.complete();
      }, error => {
        console.log(error);
        if (event)
          event.target.complete();
      })
  }

}
