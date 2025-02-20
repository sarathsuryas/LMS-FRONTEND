import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const cookieService =  inject(CookieService)
   let modifiedReq = req
  if(req.url.includes('/admin')) {
     modifiedReq =  modifiedReq.clone({
        setHeaders:{
          Authorization:`Bearer ${cookieService.get('adminToken')}`
        }
      })
      console.log('Authorization Header:', modifiedReq.headers.get('Authorization'));
     return next(modifiedReq)
  } else {
    modifiedReq = modifiedReq.clone({
      setHeaders:{
        Authorization:`Bearer ${cookieService.get('userToken')}`
      }
    })
    return next(modifiedReq)
  }
 
};
