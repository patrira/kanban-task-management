import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColorThemeService } from '../../services/color-theme.service';
import { SidebarToggleService } from '../../services/sidebar-toggle.service';
import { ModalShowService } from '../../services/modal-show.service';
import { selectAllBoards } from '../../state/boards/boards.selectors';
import { toggleSidebar } from '../../state/ui/ui.actions';
import { BoardsService } from '../../services/broads.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  boards$ = this.store.select(selectAllBoards);

  constructor(
    public colorTheme: ColorThemeService,
    public sidebarService: SidebarToggleService,
    public boardsService: BoardsService,
    public modalShowService: ModalShowService,
    private store: Store
  ) {}

  handleOnBoardClick(index: number) {
    if (window.innerWidth <= 575) {
      this.toggleSidebar();
    }
    this.boardsService.setCurrentBoard(this.boardsService.boards.boards[index]);
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
