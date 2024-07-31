import { Component, OnInit } from '@angular/core';
import { AuthService } from './Service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(){

  }
  isLoggedIn = false;
  ngOnInit(): void {
 
  }
  title = 'StudentCrud';
  darkMode: boolean = false;
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
    this.applyDarkMode(this.darkMode);
  }

  applyDarkMode(isDarkMode: boolean) {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
