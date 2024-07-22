import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const darkModeEnabled = localStorage.getItem('darkMode');
    if (darkModeEnabled) {
      this.darkMode = JSON.parse(darkModeEnabled);
      this.applyDarkMode(this.darkMode);
    }
  }
  title = 'StudentCrud';
  darkMode: boolean = false;
toggleDarkMode() {
  this.darkMode = !this.darkMode;
  // Save the current mode to local storage
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
