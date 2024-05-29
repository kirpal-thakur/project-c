import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loginData:any;

  constructor(
    private router: Router,
) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      this.loginData = localStorage.getItem('token')
      if (this.loginData) {
          return true;
      } else {
          this.router.navigate(['sign-in'])
          return false;
      }
  }
  
}
