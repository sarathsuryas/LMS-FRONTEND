import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBookDto } from '../dtos/create.dto';
import { API_URLS } from '../../constants/api.constants';
import { Observable } from 'rxjs';
import { EditBookDto } from '../dtos/edit.dto';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _http: HttpClient) { }
  create(dto: CreateBookDto):Observable<{message:string}> {
     return this._http.post<{message:string}>(`${API_URLS.BOOK.CREATE}`,dto)
  }
  read(pageIndex:number,pageSize:number):Observable<{message:string,data:any,totalCount:number}> {
    return this._http.get<{message:string,data:any,totalCount:number}>(`${API_URLS.BOOK.READ}?page=${pageIndex }&size=${pageSize}`)
  } 
  update(dto:EditBookDto):Observable<{message:string}> {
    alert(dto._id)
     return this._http.put<{message:string}>(`${API_URLS.BOOK.EDIT}`,dto)
  }

}
