import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
     path: '', redirectTo: 'slider', pathMatch: 'full' 
  },
  {
     path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'phone',
    loadChildren: () => import('./SignUp/phone/phone.module').then( m => m.PhonePageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./SignUp/otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./SignUp/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'taxi',
    loadChildren: () => import('./taxi/taxi.module').then( m => m.TaxiPageModule)
  },
  {
    path: 'ambulance',
    loadChildren: () => import('./ambulance/ambulance.module').then( m => m.AmbulancePageModule)
  },
  {
    path: 'slider',
    loadChildren: () => import('./slider/slider.module').then( m => m.SliderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then( m => m.DemoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
