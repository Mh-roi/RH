import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgentNotaireGuard implements CanActivate {

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          const token = sessionStorage.getItem('auth-user') ?? "";
          const user = JSON.parse(token);
        if ( user.profil !== 'ROLE_AG') {
          return  true;
        }
    
        return false;
      }
}
