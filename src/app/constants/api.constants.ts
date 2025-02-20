import { environment } from "../environments/environment.prod";

export const API_URLS = {
    AUTH: {
        BASE: `${environment.api}/auth`,
        REGISTER: `${environment.api}/auth/create`,
        LOGIN: `${environment.api}/auth/login`,
      },
     ADMIN_AUTH: {
      BASE: `${environment.api}/admin/auth`,
      LOGIN: `${environment.api}/admin/auth/login`, 
     },
     BOOK:{
      BASE:`${environment.api}/admin/book`,
      CREATE:`${environment.api}/admin/book/create`,
      READ:`${environment.api}/admin/book/get-books`,
      EDIT:`${environment.api}/admin/book/edit`
     } 
}