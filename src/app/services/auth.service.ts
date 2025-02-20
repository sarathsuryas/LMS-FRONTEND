import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDto } from '../dtos/createuser.dto';
import { API_URLS } from '../constants/api.constants';
import { Observable, of } from 'rxjs';
import { LoginDto } from '../dtos/login.dto';

const All_ARTICLES = [
  { id: 1, title: 'Angular Tutorial', category: 'Angular', writer: 'Mohit' },
  { id: 2, title: 'Angular Material Tutorial', category: 'Angular', writer: 'Krishn' },
  { id: 3, title: 'Spring tutorial', category: 'Spring', writer: 'Mohit' },
  { id: 4, title: 'Hibernate tutorial', category: 'Hibernate', writer: 'Krishn' },
  { id: 5, title: 'Java Tutorial', category: 'Java', writer: 'Sudesh' },
  { id: 6, title: 'JavaScript Tutorial', category: 'JavaScript', writer: 'Shiv' }
];


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  register(dto:CreateUserDto):Observable<HttpErrorResponse | {message:string}> {
    return this._http.post<HttpErrorResponse | {message:string}>(`${API_URLS.AUTH.REGISTER}`,dto)
  }
  login(dto:LoginDto):Observable< {token:string}> {
    return this._http.post<{token:string}>(`${API_URLS.AUTH.LOGIN}`,dto)
  }
  


}
