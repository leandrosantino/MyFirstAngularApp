import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loading } from './components/loading/loading';
import { LoadingStateService } from './components/loading/loading-state-service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Loading],
  template: `
    <app-loading *ngIf="isLoading()" />
    <router-outlet *ngIf="!isLoading()" />
  `
})
export class App{ 

  isLoading!: Signal<boolean>

  constructor (
    private readonly loadingStateService: LoadingStateService
  ) {
    this.isLoading = this.loadingStateService.isLoading
  }


}
