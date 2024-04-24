import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit {
  @ViewChild('drawer') sidenav!: MatSidenav;

  public isHandset = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngAfterViewInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
      this.isHandset = result.matches;
      if (result.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
}
