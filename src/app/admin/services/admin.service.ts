import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }
  adminData() {
    return this._http.get(API_URLS.ADMIN.ADMINDATA)
  }
  Edit(dto:{email:string,username:string,user:string}) {
    return this._http.put(API_URLS.ADMIN.EDIT,dto)
  }
 
}
