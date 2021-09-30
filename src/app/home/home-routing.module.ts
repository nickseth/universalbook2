import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: '',
    component: HomePage
    
  },
 
    {
      path: 'bookreader/:id', loadChildren:'../bookreader/bookreader.module'
      
    },
    {
      path: 'product-view/:id', loadChildren:'../product-view/product-view.module'
      
    },
 
    {
      path: 'categoryreader/:cate_id', loadChildren:'../categoryreader/categoryreader.module'
      
    },
    {
      path: 'login',
      loadChildren:'../login/login.module'
   
    },
    {
      path: 'registration',
      loadChildren:'../registration/registration.module'
    }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
