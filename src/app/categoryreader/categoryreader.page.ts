import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from './../api/book.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-categoryreader',
  templateUrl: './categoryreader.page.html',
  styleUrls: ['./categoryreader.page.scss'],
})
export class CategoryreaderPage implements OnInit {
  id: any;
   data: any;
  categorytitle: any;
  loading: any;

  constructor(private route: ActivatedRoute,
    private router: Router,private book: BookService,public loadingController: LoadingController) { 
 
    }
    viewItem(item_id){

      this.router.navigate(['/product-view', { id: item_id }]);
  
              }

  ngOnInit() {
    
    this.id = this.route.snapshot.paramMap.get('cate_id');
    this.categorytitle = this.route.snapshot.paramMap.get('title');
    this.presentLoading()
    this.book.getCategoryOnes(this.id).subscribe((response) => {
      this.data = response;
      
      this.loading.dismiss();
     });

    }
    async presentLoading() {
      this.loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      });
      await this.loading.present();
      
       
   
    }

  }

