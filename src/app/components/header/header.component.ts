import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalShowService } from '../../services/modal-show.service';
import { toggleTheme } from '../../state/ui/ui.actions';
import { ColorThemeService } from '../../services/color-theme.service';
import { SidebarToggleService } from '../../services/sidebar-toggle.service';
import { BoardService } from '../../services/board/board.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public colorTheme: ColorThemeService,
    public sidebarService: SidebarToggleService,
    public boardService: BoardService,
    public modalShowService: ModalShowService,
    private store: Store
  ) {
    this.colorTheme.getTheme();  // Load theme on initialization
  }

  openEditBoardModal() {
    this.modalShowService.openEditBoardModal();
    this.modalShowService.closeEditDeleteContainer();  // Now exists
  }

  handleAddNewTask() {
    if (this.boardService.currentTask) {
      this.boardService.currentTask.status = '';  
    }
    this.modalShowService.openCreateTaskModal();
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme());
    this.colorTheme.switchTheme();
  }

  openDeleteBoardModal() {
    this.modalShowService.openDeleteBoardModal();
    this.modalShowService.closeEditDeleteContainer();  // Now exists
  }
}
