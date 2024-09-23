import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalShowService } from '../../services/modal-show.service';
import { deleteTask } from '../../state/tasks/tasks.actions';
import { Task } from '../../modals/boards.interface';
import { Observable, EMPTY } from 'rxjs';
import { BoardService } from '../../services/board/board.service';
import { selectCurrentTask } from '../../state/tasks/tasks.selectors';

@Component({
  selector: 'app-confirm-delete-task',
  templateUrl: './confirm-delete-task.component.html',
  styleUrls: ['./confirm-delete-task.component.scss']
})
export class ConfirmDeleteTaskComponent {
  currentTask$: Observable<Task | undefined> = EMPTY;  // Initialize with an empty observable
  currentTaskIndex: number = 0;

  constructor(
    private store: Store,
    public modalShowService: ModalShowService,
    public boardService: BoardService
  ) {
    if (this.boardService.currentTask?.id) {
      const taskId = this.boardService.currentTask.id;
      // Pass taskId as part of props
      this.currentTask$ = this.store.select(selectCurrentTask, { taskId });
    } else {
      console.warn('No valid taskId found.');
    }
  }

  deleteTask() {
    this.currentTask$.subscribe((task) => {
      if (task) {
        this.store.dispatch(deleteTask({
          taskId: task.id,
          boardId: this.boardService.currentBoard!.id  // Handle boardId correctly
        }));
        this.modalShowService.closeModal();
      }
    });
  }

  cancelDelete() {
    this.modalShowService.closeModal();
  }
}
