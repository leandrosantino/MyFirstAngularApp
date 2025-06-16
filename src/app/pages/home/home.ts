import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from '@/app/components/ui/ui-avatar-helm/src';
import { HlmButtonDirective } from '@/app/components/ui/ui-button-helm/src';
import { Component } from '@angular/core';
import { AuthService, UserProfile } from '../../service/auth';

@Component({ 
  selector: 'app-home',
  imports:[
    HlmAvatarImageDirective, 
    HlmAvatarComponent, 
    HlmAvatarFallbackDirective,
    HlmButtonDirective
  ],
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
