import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorePage } from './explore.page';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage,
  },
 
  {
    path: 'bookreader/:id', loadChildren:'../bookreader/bookreader.module'
    
  },

  {
    path: 'categoryreader/:cate_id', loadChildren:'../categoryreader/categoryreader.module'
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorePageRoutingModule {}
