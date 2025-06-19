import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loading } from './components/loading/loading';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Loading],
  template: `
    <app-loading *ngIf="false" />
    <router-outlet />
  `
})
export class App{ }
