import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColorThemeService } from '../../services/color-theme.service';
import { SidebarToggleService } from '../../services/sidebar-toggle.service';
import { ModalShowService } from '../../services/modal-show.service';
import { toggleSidebar } from '../../state/ui/ui.actions';
import { Observable } from 'rxjs';
import { Board, Board1 } from '../../modals/boards.interface';
import { loadBoards } from '../../state/board/board.actions';
import { BoardState } from '../../state/board/board.state';
import { SelectedBoardService } from '../../services/selected-board-service.service'; 

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SidebarComponent implements OnInit {
  boards$!: Observable<Board1[]>; 
  totalBoards: number = 0;

  constructor(
    public colorTheme: ColorThemeService,
    public sidebarService: SidebarToggleService,
    public modalShowService: ModalShowService,
    private store: Store<{ board: BoardState }>,
    private selectedBoardService: SelectedBoardService 
  ) {}

  ngOnInit() {
    this.boards$ = this.store.select((state) => state.board.boards);

    this.boards$.subscribe((boards) => {
      if (boards.length > 0) {
        this.totalBoards = boards.length;
      }
    });
    this.store.dispatch(loadBoards());
  }

  onCreateBoardClick() {
    if (window.innerWidth <= 575) {
      this.toggleSidebar();  
    }
    this.modalShowService.openCreateBoardModal();  
  }

  handleOnBoardClick(index: number, board: Board) {
    if (window.innerWidth <= 575) {
      this.toggleSidebar();  
    }
    
    // Set the selected board in the shared service
    this.selectedBoardService.setSelectedBoard(board);
    
    // Log the board data to the console
    console.log('Selected Board:', board);
  }

  toggleSidebar() {
    this.store.dispatch(toggleSidebar());
  }
}
