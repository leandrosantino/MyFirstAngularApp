import { Component } from '@angular/core';
import { HlmSpinnerComponent } from '../ui/ui-spinner-helm/src';

@Component({
  selector: 'app-loading',
  imports: [HlmSpinnerComponent],
  templateUrl: './loading.html'
})
export class Loading {

}
