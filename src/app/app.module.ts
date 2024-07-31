import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { AuthComponent } from './Login/auth/auth.component';
import { ResetPasswordComponent } from './Login/auth/reset-password/reset-password.component';
import { SignupComponent } from './Login/auth/signup/signup.component';
import { AppPipe } from './Pipe/app.pipe';
import { LoaderInterceptors } from './Service/Loader/loader.interceptor';
import { LoaderComponent } from './Service/Loader/loader/loader.component';
import { TokenInterceptor } from './Service/Token/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileModule } from './profile/profile.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StudentManagementModule } from './student-management/student-management.module';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AppPipe,
    SignupComponent,
    ResetPasswordComponent,
    NotFoundComponent,
    LoaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StudentManagementModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    NgxSpinnerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
    PaginatorModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    DialogModule,
    DynamicDialogModule,
    ProfileModule,
    CalendarModule,
    NgxMatSelectSearchModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptors,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DialogService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
