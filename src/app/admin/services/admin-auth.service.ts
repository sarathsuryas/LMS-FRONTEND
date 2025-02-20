import { Injectable } from '@angular/core';
import { LoginDto } from '../../dtos/login.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private _http:HttpClient) { }
   login(dto:LoginDto):Observable< {token:string}> {
      return this._http.post<{token:string}>(`${API_URLS.ADMIN_AUTH.LOGIN}`,dto)
    }
}
