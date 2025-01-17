import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.post('https://student-managementsystem-node-4.onrender.com/api/v1/student/CreatePost', data);
  }


  // getData(){
  //   return this.http.get('http://localhost:3000/student')

  // }

  getData(page:any, limit:any) {
    return this.http.get(`https://student-managementsystem-node-4.onrender.com/api/v1/student/getAllStudent?page=${page}&limit=${limit}`)

  }


  getDepartmentData(page:any, limit:any){
    return this.http.get(`https://student-managementsystem-node-4.onrender.com/api/v1/student/getAllDepartment?page=${page}&limit=${limit}`)
  }


  getEmployeeData(page:any, limit:any){
    return this.http.get(`https://student-managementsystem-node-4.onrender.com/api/v1/student/getAllEmployeeFilter?page=${page}&limit=${limit}`)
  }
 
  delete(id: any) {
    return this.http.delete(`https://student-managementsystem-node-4.onrender.com/api/v1/student/deleteStudent/${id}`)
  }
 

  getDataForSpecificID(id: any) {
    return this.http.get(`https://student-managementsystem-node-4.onrender.com/api/v1/student/getStudentBySpecificId/${id}`);
  }
  updateData(id: any, data: any) {
    return this.http.put(`https://student-managementsystem-node-4.onrender.com/api/v1/student/updateStudent/${id}`, data)
  }


  getEmailUserId(email: string): Observable<any> {
    return this.http.get<any>(`https://student-managementsystem-node-4.onrender.com/api/v1/student/getUserIdByEmail?email=${email}`);
  }

  changePassword(id: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post<any>('https://student-managementsystem-node-4.onrender.com/api/v1/student/changePassword', { id, oldPassword, newPassword });
  }

  resetPassword( newPassword:string, confirmNewPassword:string):Observable<any>{
    return this.http.post<any>('https://student-managementsystem-node-4.onrender.com/api/v1/auth/resetPassword',{ newPassword, confirmNewPassword})
  }

  clockInData(data:any){
    return this.http.post<any>('https://student-managementsystem-node-4.onrender.com/api/v1/student/clockIn',data);
  }

  clockOutData(data:any){
    return this.http.post<any>('https://student-managementsystem-node-4.onrender.com/api/v1/student/clockOut',data);
  }

  postBankDetails(data:any){
    return this.http.post('https://student-managementsystem-node-4.onrender.com/api/v1/Bank/registerBankDetails',data)
  }

  getSpecificBankDetails(){
    return this.http.get('https://student-managementsystem-node-4.onrender.com/api/v1/Bank/getSpecificBankDetails')
  }

  getStateName(){
    return this.http.get('https://student-managementsystem-node-4.onrender.com/api/v1/Bank/getStateName');
  }

  getDistrictName(){
    return this.http.get('https://student-managementsystem-node-4.onrender.com/api/v1/Bank/getDistrictName')
  }

  // getAllProject(){
  //   return this.http.get('https://cors-anywhere.herokuapp.com/http://freeapi.miniprojectideas.com/api/Jira/GetAllProjects')
  // }

  getAllProject(){
    return this.http.get('https://student-managementsystem-node-4.onrender.com/api/v1/Jira/getJiraDetails')
  }

}
