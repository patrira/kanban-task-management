import { Injectable } from '@angular/core';
import { BoardService } from './board/board.service';
import { Task } from '../modals/boards.interface';
import { Store } from '@ngrx/store';
import { updateTask } from '../state/tasks/tasks.actions';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  public dragging: Task | undefined;

  constructor(public boardService: BoardService, private store: Store) {}

  dragStart(e: DragEvent, item: Task) {
    this.dragging = item;
  }

  dragEnd(e: DragEvent, item: Task) {
    this.dragging = undefined;
  }

  dragOver(e: DragEvent) {
    if (this.dragging) {
      e.preventDefault();
    }
  }

  drop(e: DragEvent) {
    e.preventDefault();
    const { taskIndex, columnIndex, dropColumnIndex, dropTaskIndex } = this.boardService.indexes;

    // Remove the task from its original column
    this.boardService.currentBoard!.columns[columnIndex].tasks.splice(taskIndex, 1);

    if (this.dragging) {
      // Update the task's status to match the new column
      this.dragging.status = this.boardService.currentBoard!.columns[dropColumnIndex].name;

      // Insert the task into the new column at the correct index
      this.boardService.currentBoard!.columns[dropColumnIndex].tasks.splice(dropTaskIndex, 0, this.dragging);

      // Dispatch updateTask action with the correct boardId
      this.store.dispatch(updateTask({
        task: this.dragging,
        boardId: this.boardService.currentBoard!.id
      }));
    }

    this.dragging = undefined;

    // Re-fetch boards from storage (this is optional but ensures state sync)
    this.boardService.getBoards();
  }
}
