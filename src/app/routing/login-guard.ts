import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { AuthService } from '../service/auth';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate: CanActivateFn = () => {
    if (this.authService.isAuth()) {
      this.router.navigate([''])
      return of(false)
    }

    return this.authService.restoreSession().pipe(
      switchMap(() => {
        this.router.navigate([''])
        return of(false)
      }),
      catchError(() => of(true))
    )
  }

}