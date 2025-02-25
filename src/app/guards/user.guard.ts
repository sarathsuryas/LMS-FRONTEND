import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const userGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);

  const userToken = cookieService.get('userToken');
  if (userToken) {
    return true; 
  } else {
    return false; 
  }
  
};
