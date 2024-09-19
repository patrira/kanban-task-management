import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalShowService } from '../../services/modal-show.service';
import { deleteBoard, setCurrentBoard } from '../../state/boards/boards.actions';
import { toggleSidebar } from '../../state/ui/ui.actions';
import { selectAllBoards } from '../../state/boards/boards.selectors';
import { Board } from '../../modals/boards.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-delete-board',
  templateUrl: './confirm-delete-board.component.html',
  styleUrls: ['./confirm-delete-board.component.scss']
})
export class ConfirmDeleteBoardComponent {
  boards$: Observable<Board[]>; 
  currentBoardIndex: number = 0; 
boardsService: any;

  constructor(
    private store: Store,
    public modalShowService: ModalShowService
  ) {
    this.boards$ = this.store.select(selectAllBoards); 
  }

  deleteBoard() {
    this.boards$.subscribe((boards) => {
      if (boards.length > 0) {
        const boardToDelete = boards[this.currentBoardIndex];
  
        if (boardToDelete.id) {  // Check if id is defined
          this.store.dispatch(deleteBoard({ boardId: boardToDelete.id }));
  
          const updatedBoards = boards.filter(board => board.id !== boardToDelete.id);
          if (updatedBoards.length > 0) {
            this.store.dispatch(setCurrentBoard({ board: updatedBoards[0] }));
          }
  
          this.store.dispatch(toggleSidebar());
          this.modalShowService.closeModal();
        }
      }
    });
  }
  

  cancelDelete() {
    this.modalShowService.closeModal(); 
  }
}
