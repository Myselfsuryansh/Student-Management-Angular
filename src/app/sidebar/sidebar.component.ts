import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor( private Authservice: AuthService,private router: Router){

  }

  ngOnInit(): void {

  }
  public onSignOut() {
    this.Authservice.logout();
    this.router.navigate(['/']);
  }


}
