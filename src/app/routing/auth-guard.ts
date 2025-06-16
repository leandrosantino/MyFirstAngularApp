import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate: CanActivateFn = () => {
    if (this.auth.isAuth()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}