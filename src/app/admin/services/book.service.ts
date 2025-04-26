import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBookDto } from '../dtos/create.dto';
import { API_URLS } from '../../constants/api.constants';
import { Observable } from 'rxjs';
import { EditBookDto } from '../dtos/edit.dto';
import { IBook } from '../interfaces/IBook';
import { IHistory } from '../interfaces/IHistory';

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
     return this._http.put<{message:string}>(`${API_URLS.BOOK.EDIT}`,dto)
  }
  getAllBooks(currentPage:number,limit:number,filter:string):Observable<{data:IBook[],count:number}> {
    return this._http.get<{data:IBook[],count:number}>(`${API_URLS.USERBOOK.ALL}?page=${currentPage}&limit=${limit}&filter=${filter}`)
  }
 Borrow(obj:{adminId:string,bookId:string}) {
  return this._http.patch(`${API_URLS.USERBOOK.BOOKTRANSACTION}`,obj)
 }
 bookHistory():Observable<IHistory[]> {
  return this._http.get<IHistory[]>(`${API_URLS.USERBOOK.BOOKHISTORY}`)
 }
return(bookId:string,historyId:string) {
  return this._http.patch(`${API_URLS.USERBOOK.RETURN}`,{bookId,historyId})
}
bookTransaction() {
  return this._http.get(`${API_URLS.BOOK.TRANSACTIONS}`)
}
}
