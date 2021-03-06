import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiconnectService {

  constructor(private hc:HttpClient) { }

  createUser(userObj):Observable<any>{
    return this.hc.post('/users/createuser',userObj)
  }

  loginUser(userObj):Observable<any>{
    return this.hc.post('/users/login',userObj)
  }
}
