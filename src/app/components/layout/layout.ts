import { AuthService, UserProfile } from '@/app/service/auth';
import { Component, Signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChartColumnBig, lucideListChecks, lucidePanelLeft, lucideScanBarcode } from '@ng-icons/lucide';
import { LucideAngularModule } from 'lucide-angular';
import { ProfileMenu } from '../profile-menu/profile-menu';
import { HlmButtonDirective } from '../ui/ui-button-helm/src';
import { HlmIconDirective } from '../ui/ui-icon-helm/src';
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
    
    HlmIconDirective, 
    NgIcon,
    ProfileMenu,
  ],
  providers: [
    provideIcons({
      lucideListChecks,
      lucideChartColumnBig,
      lucideScanBarcode,
      lucidePanelLeft,
    }),
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  
  menuButtons = [
    { isActive: false, title: "Dashboard", url: "/", icon: 'lucideChartColumnBig', requiredRoles: ['ADMIN'] },
    { isActive: false, title: "Ordens de Serviço", url: "/service-orders", icon: 'lucideListChecks', requiredRoles: ['ADMIN'] },
    { isActive: false, title: "Produtos", url: "/products", icon: 'lucideScanBarcode', requiredRoles: ['ADMIN'] },
  ]
  userProfile?: UserProfile
  open!: Signal<boolean>
  
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
