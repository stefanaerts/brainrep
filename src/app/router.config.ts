import { CardPickerComponent } from './card-picker/card-picker.component';
import { HomeComponent } from './home/home.component';
import { DropinComponent } from './dropin/dropin.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
   { path: '',pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'dropin', component: DropinComponent },
  { path: 'cardpicker', component: CardPickerComponent },
  {path: '**',pathMatch: 'full', redirectTo: '/home'}
];
