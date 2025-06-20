import { Component, Signal } from '@angular/core';
import { HlmSpinnerComponent } from '../ui/ui-spinner-helm/src';
import { LoadingStateService } from './loading-state-service';

@Component({
  selector: 'app-loading',
  imports: [HlmSpinnerComponent],
  templateUrl: './loading.html'
})
export class Loading {

  isLoading!: Signal<boolean>

  constructor (
    private readonly loadingStateService: LoadingStateService
  ) {
    this.isLoading = this.loadingStateService.isLoading
  }

}
