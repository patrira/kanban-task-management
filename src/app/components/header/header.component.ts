import { Component,  } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalShowService } from '../../services/modal-show.service';
import { toggleTheme } from '../../state/ui/ui.actions';
import { ColorThemeService } from '../../services/color-theme.service';
import { SidebarToggleService } from '../../services/sidebar-toggle.service';
import { BoardsService } from '../../services/broads.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  constructor(
    public colorTheme: ColorThemeService,
    public sidebarService: SidebarToggleService,
    public boardsService: BoardsService,
    public modalShowService: ModalShowService,
    private store: Store
  ) {
    
  }

  openEditBoardModal() {
    this.modalShowService.openEditBoardModal();
    this.modalShowService.closeEditDeleteContainer();
  }

  openDeleteBoardModal() {
    this.modalShowService.openDeleteBoardModal();
    this.modalShowService.closeEditDeleteContainer();
  }

  handleAddNewTask() {
    this.boardsService.currentTask!.status = '';
    this.modalShowService.openCreateTaskModal();
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }
}
