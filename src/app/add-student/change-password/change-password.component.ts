import { Component } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  email: string = "";
  oldPassword: string = "";
  newPassword: string = "";
  constructor(private service: DataService){

  }

//   changePassword(): void {
//     console.log('changePassword');
//     const email = 'Satyam5487@gmail.com'; 
//     this.service.getUserIdByEmail(email).subscribe(userId => {
      
//       this.service.changePassword(userId, this.newPassword).subscribe(() => {
//         console.log('Password changed successfully');
//       }, (error) => {
//         console.error('Error changing password:', error);
//       });
//     }, (error) => {
//       console.error('Error getting user ID:', error);
//     });
// }
changePassword(){
  console.log('CHange Password');
  this.service.getUserIdByEmail(this.email).subscribe((response:any)=>{
    
    const userId = response.id;

    if(!userId){
      console.error('User ID not found');
      return;
    }
    this.service.changePassword(userId, this.oldPassword, this.newPassword).subscribe(()=>{
      console.log('Password Updated Successfully')
    }, error=>{
      console.error('Error while Updating password', error)
    })
  }, error=>{
    console.error('Error while fetching user ID:', error)
  })

}
}
