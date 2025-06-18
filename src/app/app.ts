import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Loading } from './components/loading/loading';
import { AuthService } from './service/auth';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Loading],
  template: `
    <app-loading *ngIf="isLoading" />
    <router-outlet *ngIf="!isLoading" />
  `
})
export class App  implements OnInit{ 

  isLoading = true

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
