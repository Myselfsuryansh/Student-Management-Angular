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
@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentsComponent,
    ViewStudentsComponent,
    AuthComponent,

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
    NgxSpinnerModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
