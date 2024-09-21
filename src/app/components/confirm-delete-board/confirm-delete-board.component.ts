import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalShowService } from '../../services/modal-show.service';
import { deleteBoard, setCurrentBoard } from '../../state/board/board.actions';
import { toggleSidebar } from '../../state/ui/ui.actions';
import { selectAllBoards } from '../../state/board/board.selectors';
import { Board1 } from '../../modals/boards.interface'; // Ensure you are importing Board1
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-delete-board',
  templateUrl: './confirm-delete-board.component.html',
  styleUrls: ['./confirm-delete-board.component.scss']
})
export class ConfirmDeleteBoardComponent {
  boards$: Observable<Board1[]>;  // Changed to Board1[]
  currentBoardIndex: number = 0;
boardService: any;

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
