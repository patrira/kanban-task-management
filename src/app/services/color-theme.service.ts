import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleTheme } from '../state/ui/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {
  lightMode: boolean = true;

  constructor(private store: Store) {}

  switchTheme() {
    this.lightMode = !this.lightMode;
    this.setTheme(this.lightMode);
    document.documentElement.setAttribute('data-theme', this.lightMode ? 'light' : 'dark');
    this.store.dispatch(toggleTheme()); 
  }

  setTheme(lightMode: boolean) {
    localStorage.setItem('lightMode', JSON.stringify(lightMode));
  }

  getTheme() {
    this.lightMode = JSON.parse(localStorage.getItem('lightMode') || 'true');
    document.documentElement.setAttribute('data-theme', this.lightMode ? 'light' : 'dark');
  }
}
