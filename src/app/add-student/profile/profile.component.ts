import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @ViewChild('profileForm', { static: false }) profileForm!: NgForm;
  public data :any
  constructor(){
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
     console.log(userData)
     this.data = userData
    } else {
      console.error('No userData found in local storage');
    }
  }
}
