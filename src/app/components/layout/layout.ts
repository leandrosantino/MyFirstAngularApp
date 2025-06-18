import { Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, PanelLeft } from 'lucide-angular';
import { HlmButtonDirective } from '../ui/ui-button-helm/src';
import { SidebarService } from './sidebar-service';
import { ToggleSidebarDirective } from './toggle-sidebar-directive';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet, 
    HlmButtonDirective, 
    ToggleSidebarDirective,
    LucideAngularModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  PanelLeftIcon = PanelLeft
  open!: Signal<boolean>
  
  constructor(
    private readonly sidebarSerice: SidebarService
  ){
    this.open = this.sidebarSerice.open
  }

}
