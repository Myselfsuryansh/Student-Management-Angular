import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  postData(data:any){
    return this.http.post('http://localhost:3000/student',data);
  }


  getData(){
    return this.http.get('http://localhost:3000/student')
    
  }
  delete(id:any){
    return this.http.delete(`http://localhost:3000/student/${id}`)
  }
  getDataForSpecificID(id:any){
    return this.http.get(`http://localhost:3000/student/${id}`);
  }
  updateData(id:any, data:any){
    return this.http.put(`http://localhost:3000/student/${id}`,data)
  }
  

}
