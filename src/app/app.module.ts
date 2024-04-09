import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { EditStudentsComponent } from './add-student/edit-students/edit-students.component';
import { ViewStudentsComponent } from './add-student/view-students/view-students.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderInterceptor } from './Service/interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthComponent } from './Login/auth/auth.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AppPipe } from './Pipe/app.pipe';
import { PaginatorModule } from 'primeng/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ChangePasswordComponent } from './add-student/change-password/change-password.component';
import { SignupComponent } from './Login/auth/signup/signup.component';
import { ProfileComponent } from './add-student/profile/profile.component';
import { ResetPasswordComponent } from './Login/auth/reset-password/reset-password.component';
@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentsComponent,
    ViewStudentsComponent,
    AuthComponent,
    AppPipe,
    ChangePasswordComponent,
    SignupComponent,
    ProfileComponent,
    ResetPasswordComponent,
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule ,
    NgxSpinnerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        
      }
    }),
    PaginatorModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    DialogModule,
    DynamicDialogModule
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    DialogService
    
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
