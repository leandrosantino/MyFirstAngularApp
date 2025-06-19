import { Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartColumnBig, ListChecks, LucideAngularModule, PanelLeft, ScanBarcode } from 'lucide-angular';
import { HlmButtonDirective } from '../ui/ui-button-helm/src';
import { HlmToggleDirective } from '../ui/ui-toggle-helm/src';
import { SidebarService } from './sidebar-service';
import { ToggleSidebarDirective } from './toggle-sidebar-directive';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    HlmButtonDirective,
    ToggleSidebarDirective,
    LucideAngularModule,
    HlmToggleDirective
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  PanelLeftIcon = PanelLeft
  open!: Signal<boolean>

  menuButtons = [
    { title: "Dashboard", url: "/dash", icon: ChartColumnBig, requiredRoles: ['ADMIN'] },
    { title: "Ordens de Serviço", url: "/service-orders", icon: ListChecks, requiredRoles: ['ADMIN'] },
    { title: "Produtos", url: "/", icon: ScanBarcode, requiredRoles: ['ADMIN'] },
  ]

  a(e: any) {
    console.log(e)
  }

  constructor(
    private readonly sidebarSerice: SidebarService
  ) {
    this.open = this.sidebarSerice.open
  }

}
