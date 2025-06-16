import { HlmButtonDirective } from '@/app/components/ui/ui-button-helm/src';
import { HlmInputDirective } from '@/app/components/ui/ui-input-helm/src';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-login',
  imports: [HlmButtonDirective, HlmInputDirective],
  templateUrl: './login.html',
})
export class Login {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  async login() {
    this.authService.login(
      'johndoe@gmail.com',
      '123456'
    ).subscribe({
      complete: () => this.router.navigate(['']),
      error: (err: Error) => {
        console.log(err.message)
      }
    })
  }

}
