import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  userData() {
    return this._http.get(API_URLS.USER.USERDATA)
  }
  Edit(dto:{email:string,username:string,user:string}) {
    return this._http.put(API_URLS.USER.EDIT,dto)
  }
}
