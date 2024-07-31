import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedValue: string='today';
  remoteWork: any = [
    {value: 'today', viewValue: 'Today'},
    {value: 'tommorow', viewValue: 'Tommorow'},
    {value: 'thisWeek', viewValue: 'This Week'},
    {value: 'nextWeek', viewValue: 'Next Week'},
  ];
}
