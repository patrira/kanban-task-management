import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSidebar } from '../state/ui/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {
  sidebarOpened = true;
  selectedIndex = 0;

  constructor(private store: Store) {}

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
    this.store.dispatch(toggleSidebar());  // Dispatch the toggleSidebar action
  }
}
