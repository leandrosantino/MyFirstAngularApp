import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _open = signal(false)

  open = this._open.asReadonly()

  toggle() {
    this._open.set(!this.open())
  }

}
