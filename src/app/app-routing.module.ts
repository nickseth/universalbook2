import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  
  },
  {
    path: 'bookreader',
    loadChildren: () => import('./bookreader/bookreader.module').then( m => m.BookreaderPageModule)
  },
  {
    path: 'calendarview',
    loadChildren: () => import('./calendarview/calendarview.module').then( m => m.CalendarviewPageModule)
  },
  {
    path: 'categoryreader',
    loadChildren: () => import('./categoryreader/categoryreader.module').then( m => m.CategoryreaderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),

  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then( m => m.WishlistPageModule)
  },
  {
    path: 'readnote',
    loadChildren: () => import('./readnote/readnote.module').then( m => m.ReadnotePageModule)
  },
  {
    path: 'product-view',
    loadChildren: () => import('./product-view/product-view.module').then( m => m.ProductViewPageModule)
  },
  {
    path: 'notes',
    loadChildren: () => import('./notes/notes.module').then( m => m.NotesPageModule)
  },
  {
    path: 'mybooks',
    loadChildren: () => import('./mybooks/mybooks.module').then( m => m.MybooksPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'calculator',
    loadChildren: () => import('./calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'google-search',
    loadChildren: () => import('./search/google-search.module').then( m => m.GoogleSearchPageModule)
  },
 
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'readpdf',
    loadChildren: () => import('./readpdf/readpdf.module').then( m => m.ReadpdfPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
