import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
})
export class Layout implements OnInit {
  isLoading = true;

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
