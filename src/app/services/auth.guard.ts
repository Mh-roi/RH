import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
}