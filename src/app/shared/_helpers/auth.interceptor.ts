import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenStorageService } from '../service/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization'; // Pour Spring Boot: Authorization: Bearer <token>

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenStorage.getToken();

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}

// Fournisseur global
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
