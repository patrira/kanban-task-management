import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColorThemeService } from '../../services/color-theme.service';
import { SidebarToggleService } from '../../services/sidebar-toggle.service';
import { ModalShowService } from '../../services/modal-show.service';
import { selectAllBoards } from '../../state/boards/boards.selectors';
import { toggleSidebar } from '../../state/ui/ui.actions';
import { BoardsService } from '../../services/broads.service';  
import { Observable } from 'rxjs';
import { Board } from '../../modals/boards.interface';  

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SidebarComponent implements OnInit {
  boards$!: Observable<Board[]>;  

  constructor(
    public colorTheme: ColorThemeService,
    public sidebarService: SidebarToggleService,
    public boardsService: BoardsService,
    public modalShowService: ModalShowService,
    private store: Store
  ) {}

  ngOnInit() {
    
    this.boards$ = this.store.select(selectAllBoards);
  }

  
  handleOnBoardClick(index: number) {
    if (window.innerWidth <= 575) {
      this.toggleSidebar();  
    }

    
    const boardsData = this.boardsService.getBoardsFromStorage();
    
    
    if (boardsData && boardsData.boards) {
      this.boardsService.setCurrentBoard(boardsData.boards[index]);
    }
  }

  
  onCreateBoardClick() {
    if (window.innerWidth <= 575) {
      this.toggleSidebar();  
    }
    this.modalShowService.openCreateBoardModal();  
  }

  
  toggleSidebar() {
    this.store.dispatch(toggleSidebar());
  }
}
