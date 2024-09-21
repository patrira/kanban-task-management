import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SidebarToggleService } from '../../services/sidebar-toggle.service'; 
import { toggleSidebar } from '../../state/ui/ui.actions'; 
import { BoardState } from '../../state/board/board.state';
import { ModalShowService } from '../../services/modal-show.service';
import { SelectedBoardService } from '../../services/selected-board-service.service';
import { Observable } from 'rxjs';
import { Board1 } from '../../modals/boards.interface';
import { loadBoards } from '../../state/board/board.actions';
import { ColorThemeService } from '../../services/color-theme.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SidebarComponent implements OnInit {
  boards$!: Observable<Board1[]>; 
  totalBoards: number = 0;
  colorThemeService: ColorThemeService;

  constructor(
    private store: Store<{ board: BoardState }>,
    public sidebarService: SidebarToggleService,
    public modalShowService: ModalShowService,
    private selectedBoardService: SelectedBoardService,
    private colorTheme: ColorThemeService
  ) {
    this.colorThemeService = colorTheme;
  }

  ngOnInit() {
    this.boards$ = this.store.select((state) => state.board.boards);
    this.boards$.pipe(take(1)).subscribe((boards) => {
      this.totalBoards = boards.length;
      // Automatically select the first board if it exists
      if (boards.length > 0) {
      }
      console.log("board initiated")
      this.selectedBoardService.setSelectedBoard(boards[0]);
    
    });

    this.colorThemeService.getTheme();
    this.store.dispatch(loadBoards());
  }

  onCreateBoardClick() {
    if (window.innerWidth <= 575) {
      this.toggleSidebar();
    }
    this.modalShowService.openCreateBoardModal();  
  }

  handleOnBoardClick(index: number, board: Board1) {
    if (window.innerWidth <= 575) {
      this.toggleSidebar();
    }
    this.selectedBoardService.setSelectedBoard(board);
  }

  toggleSidebar() {
    this.store.dispatch(toggleSidebar());
  }
}
