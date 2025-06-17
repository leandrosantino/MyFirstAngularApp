import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Layout } from './components/layout/layout';
import { AuthService } from './service/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Layout],
  template: `
    <app-layout [isLoading]="isLoading" >
      <router-outlet />
    </app-layout>
  `
})
export class App  implements OnInit{ 

  isLoading = false

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

    ngOnInit(): void {
    this.authService.restoreSession().pipe()
      .subscribe({
        complete: () => {
          this.isLoading = false
          this.router.navigate([''])
        },
        error: () => this.isLoading = false
      })
  }
}
