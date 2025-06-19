import { AuthService, UserProfile } from '@/app/service/auth';
import { Component, Signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent
} from '@spartan-ng/helm/menu';
import { ChartColumnBig, ListChecks, LucideAngularModule, PanelLeft, ScanBarcode } from 'lucide-angular';
import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from '../ui/ui-avatar-helm/src';
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
    HlmToggleDirective,

    BrnMenuTriggerDirective,

    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuLabelComponent,
    HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    HlmMenuItemIconDirective,
    HlmMenuGroupComponent,

    HlmAvatarImageDirective, 
    HlmAvatarComponent, 
    HlmAvatarFallbackDirective,

  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  PanelLeftIcon = PanelLeft
  open!: Signal<boolean>

  menuButtons = [
    { isActive: false, title: "Dashboard", url: "/", icon: ChartColumnBig, requiredRoles: ['ADMIN'] },
    { isActive: false, title: "Ordens de Serviço", url: "/service-orders", icon: ListChecks, requiredRoles: ['ADMIN'] },
    { isActive: false, title: "Produtos", url: "/products", icon: ScanBarcode, requiredRoles: ['ADMIN'] },
  ]
  userProfile?: UserProfile
  
  constructor(
    private readonly sidebarSerice: SidebarService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.open = this.sidebarSerice.open
    this.userProfile = this.authService.getUserProfile()
    this.setMenuButtonActive()
  }
  
  async navigate(url: string){
    await this.router.navigate([url])
    this.setMenuButtonActive()
  }

  setMenuButtonActive(){
    this.menuButtons = this.menuButtons.map(item => {
      item.isActive = item.url == this.router.url
      return item
    })
  }

}
