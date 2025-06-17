import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmSpinnerComponent } from '../ui/ui-spinner-helm/src';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HlmSpinnerComponent],
  templateUrl: './layout.html',
})
export class Layout {
  @Input() isLoading = true;

}
