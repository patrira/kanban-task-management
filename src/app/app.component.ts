import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SidebarToggleService } from './services/sidebar-toggle.service';
import { loadBoards, setCurrentBoard } from './state/boards/boards.actions';
import { openModal } from './state/ui/ui.actions';
import { toggleTheme } from './state/ui/ui.actions';
import { BoardsService } from './services/broads.service';
import { ColorThemeService } from './services/color-theme.service';
import { selectAllBoards } from './state/boards/boards.selectors';
import { Observable } from 'rxjs';
import { Board } from './modals/boards.interface';
import data from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  boards$: Observable<Board[]>; 

  constructor(
    public sidebarService: SidebarToggleService,
    public boardsService: BoardsService,
    public colorThemeService: ColorThemeService,
    private store: Store
  ) {
    
    this.boards$ = this.store.select(selectAllBoards);

   
    if (localStorage.getItem("boards") === null) {
      
      this.store.dispatch(loadBoards());
      this.boardsService.setBoards(data); 
    }

    
    if (localStorage.getItem("lightMode") === null) {
      this.colorThemeService.setTheme("false");
    }
    this.colorThemeService.getTheme(); 
  }

  ngOnInit() {
    
    if (window.innerWidth <= 575) {
      this.sidebarService.sidebarOpened = false;
    }

    
    this.boards$.subscribe((boards) => {
      if (boards && boards.length > 0) {
        this.store.dispatch(setCurrentBoard({ board: boards[0] })); 
      }
    });
  }
}
