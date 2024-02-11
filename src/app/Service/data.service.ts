import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // postData(data:any){
  //   return this.http.post('http://localhost:3000/student',data);
  // }

  postData(data: any) {
    return this.http.post('http://localhost:8080/api/v1/student/CreatePost', data);
  }


  // getData(){
  //   return this.http.get('http://localhost:3000/student')

  // }

  getData() {
    return this.http.get('http://localhost:8080/api/v1/student/getAllStudent')

  }
  // delete(id: any) {
  //   return this.http.delete(`http://localhost:3000/student/${id}`)
  // }
  delete(id: any) {
    return this.http.delete(`http://localhost:8080/api/v1/student/deleteStudent/${id}`)
  }
  // getDataForSpecificID(id: any) {
  //   return this.http.get(`http://localhost:3000/student/${id}`);
  // }
  // updateData(id: any, data: any) {
  //   return this.http.put(`http://localhost:3000/student/${id}`, data)
  // }

  getDataForSpecificID(id: any) {
    return this.http.get(`http://localhost:8080/api/v1/student/getStudentBySpecificId/${id}`);
  }
  updateData(id: any, data: any) {
    return this.http.put(`http://localhost:8080/api/v1/student/updateStudent${id}`, data)
  }

  private baseUrl = 'http://localhost:3000/users';

  // getUserIdByUsername(email: string): Observable<number> {
  //   return this.http.get<any[]>(`${this.baseUrl}?username=${email}`).pipe(
  //     map(email => {
  //       if (email && email.length > 0) {
  //         return email[0].id; 
  //       } else {
  //         throw new Error('User not found');
  //       }
  //     })
  //   );
  // }

  getUserIdByEmail(email: string): Observable<string> {
    return this.http.get<any[]>(`${this.baseUrl}?email=${email}`).pipe(
      map(users => {
        const user = users.find(user => user.email === email);
        if (user) {
          return user.id;
        } else {
          throw new Error('User not found');
        }
      })
    );
  }

  // changePassword(userId: any, newPassword: any): Observable<any> {
  //   return this.http.patch(`${this.baseUrl}/${userId}`, { pswd: newPassword });
  // }
  // private changePasswordUrl ="http://localhost:8080/api/v1/student/changePassword"
  // changePassword( newPassword: string): Observable<any> {
  //   return this.http.post(`${this.changePasswordUrl}`, { pswd: newPassword });
  // }

  getEmailUserId(email: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/v1/student/getUserIdByEmail?email=${email}`);
  }

  changePassword(id: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/student/changePassword', { id, oldPassword, newPassword });
  }


}
