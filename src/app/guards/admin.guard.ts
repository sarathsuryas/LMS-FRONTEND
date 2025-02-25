import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
 
   const adminToken = cookieService.get('adminToken');
   if (adminToken) {
     return true; 
   } else {
     return false; 
   }
};
