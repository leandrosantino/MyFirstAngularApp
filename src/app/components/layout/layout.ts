import { Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '../ui/ui-button-helm/src';
import { SidebarService } from './sidebar-service';
import { ToggleSidebarDirective } from './toggle-sidebar-directive';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HlmButtonDirective, ToggleSidebarDirective],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  open!: Signal<boolean>
  
  constructor(
    private readonly sidebarSerice: SidebarService
  ){
    this.open = this.sidebarSerice.open
  }

}
