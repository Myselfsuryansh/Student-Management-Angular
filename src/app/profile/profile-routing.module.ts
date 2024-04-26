import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {path:'profile', component:ProfileComponent},
  {path:'bankdetails',component:BankDetailsComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
