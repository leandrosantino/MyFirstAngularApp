import { Component, Signal } from '@angular/core';
import { SidebarService } from '../layout/sidebar-service';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
})
export class Logo {

  sideBarOpen!: Signal<boolean>

  constructor(
    private readonly sidebarSerice: SidebarService,
  ) {
    this.sideBarOpen = this.sidebarSerice.open
  }

}
