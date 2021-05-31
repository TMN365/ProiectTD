import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIurl = "http://localhost:5000/api";
readonly Photourl = "http://localhost:5000/Photo/";
  constructor(private http:HttpClient) { }

  getFacultyList():Observable<any[]>{
    return this.http.get<any>(this.APIurl+'/Faculty');
  }

  addFaculty(val: any){
    return this.http.post(this.APIurl+'/Faculty',val); 
  }

  updateFaculty(val: any){
    return this.http.put(this.APIurl+'/Faculty',val); 
  }

  deleteFaculty(val: any){
    return this.http.delete(this.APIurl+'/Faculty/' + val); 
  }

  getStudentList():Observable<any[]>{
    return this.http.get<any>(this.APIurl+'/Student');
  }

  addStudent(val: any){
    return this.http.post(this.APIurl+'/Student',val); 
  }

  updateStudent(val: any){
    return this.http.put(this.APIurl+'/Student',val); 
  }

  deleteStudent(val: any){
    return this.http.delete(this.APIurl+'/Student/'+val); 
  }

  uploadPhoto(val: any){
    return this.http.post(this.APIurl+'/Student/SaveFile',val);
  }

  getFacultiesName():Observable<any[]>{
    return this.http.get<any[]>(this.APIurl+'/Student/GetAllFacultyNames');
  }



}
