import { Injectable } from '@angular/core';
import { BoardsService } from '../services/broads.service';
import { Task } from '../modals/boards.interface';
import { Store } from '@ngrx/store';
import { updateTask } from '../state/tasks/tasks.actions';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  public dragging: Task | undefined;

  constructor(public boardsService: BoardsService, private store: Store) {}

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
    const { taskIndex, columnIndex, dropColumnIndex, dropTaskIndex } = this.boardsService.indexes;

    // Remove task from the original position
    this.boardsService.currentBoard.columns[columnIndex].tasks.splice(taskIndex, 1);

    if (this.dragging) {
      this.dragging.status = this.boardsService.currentBoard.columns[dropColumnIndex].name;
      // Insert task into the new position
      this.boardsService.currentBoard.columns[dropColumnIndex].tasks.splice(dropTaskIndex, 0, this.dragging);
      this.store.dispatch(updateTask({ task: this.dragging }));
    }

    this.dragging = undefined;
    this.boardsService.setBoards(this.boardsService.boards);  // Save updated boards
  }
}
