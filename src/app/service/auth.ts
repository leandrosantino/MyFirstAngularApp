import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

export type UserProfile = {
  id: string,
  email: string,
  displayName: string,
  role: string,
  profilePictureUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) { }

  private $token = ''

  private userProfile?: UserProfile

  login(email: string, password: string) {
    return this.httpClient.post<{ accessToken: string }>('/auth/login', {
      username: email,
      password
    }).pipe(
      tap(({ accessToken }) => this.$token = accessToken),
      switchMap(() => this.httpClient.get<typeof this.userProfile>("/user/profile")),
      tap(userProfile => { this.userProfile = userProfile })
    )
  }

  getUserProfile() {
    return this.userProfile
  }

  restoreSession() {
    return this.httpClient.get<{ accessToken: string }>('/auth/refresh').pipe(
      tap(({ accessToken }) => this.$token = accessToken),
      tap(a => console.log('sdsd', a)),
      switchMap(() => this.httpClient.get<typeof this.userProfile>("/user/profile")),
      tap(userProfile => { this.userProfile = userProfile }),
    )
  }

  getToken() {
    return this.$token
  }

  logout() {
    this.$token = ''
    this.httpClient.post('/auth/logout', {}).subscribe(() => {
      this.router.navigate(['/auth/login']);
    })
  }

  isAuth() {
    return this.$token != ''
  }

}
