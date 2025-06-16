import { Component } from '@angular/core';
import { AuthService, UserProfile } from '../../service/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
})
export class Home {

  userProfile?: UserProfile

  constructor(
    private readonly authService: AuthService
  ) {
    this.userProfile = this.authService.getUserProfile()
  }

  logout() {
    this.authService.logout()
  }

}
