import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@NgModule({
  declarations: [
    ProfileComponent,
    BankDetailsComponent,
    SidebarComponent
    
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
  ]
})
export class ProfileModule { }
