import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const userGuard: CanActivateFn = (route, state) => {

  const userToken = localStorage.getItem('userToken')
  if (userToken) {
    return true; 
  } else {
    return false; 
  }
  
};
