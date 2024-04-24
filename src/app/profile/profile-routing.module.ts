import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';

const routes: Routes = [
  {path:'profile', component:ProfileComponent},
  {path:'bankdetails',component:BankDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
