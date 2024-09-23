import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subtask, Task } from '../../modals/boards.interface';
import { BoardService } from '../../services/board/board.service';
import { ModalShowService } from '../../services/modal-show.service';
import { updateTask, updateSubtaskStatus } from '../../state/tasks/tasks.actions';
import { selectCurrentTask } from '../../state/tasks/tasks.selectors';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  currentTask$: Observable<Task | undefined> = new Observable<Task | undefined>();
  showEditDeleteContainer = false;
  taskId!: string;

  constructor(
    private store: Store,
    public modalShowService: ModalShowService,
    public boardService: BoardService
  ) {
    if (this.boardService.currentTask?.id) {  // Ensure taskId is defined
      this.currentTask$ = this.store.select(selectCurrentTask, { taskId: this.boardService.currentTask.id });
    } else {
      console.warn('No valid taskId found');
    }
  }

  isCurrentBoardInitialized(): boolean {
    return !!this.boardService.currentBoard;
  }

  openEditDeleteContainer() {
    this.showEditDeleteContainer = !this.showEditDeleteContainer;
  }

  openEditTaskModal() {
    this.modalShowService.openEditTaskModal();
  }

  handleCheckboxClick(subtask: Subtask, i: number) {
    subtask.isCompleted = !subtask.isCompleted;
    this.store.dispatch(updateSubtaskStatus({ subtask }));
  }

  changeStatus(value: string, task: Task | null) {
    if (task) {
      task.status = value;
      this.store.dispatch(updateTask({
        task,
        boardId: this.boardService.currentBoard?.id || ''
      }));
      this.modalShowService.closeModal();
    }
  }

  openDeleteTaskModal() {
    this.modalShowService.openDeleteTaskModal();
  }

  filterCompletedTasks(subtasks: Subtask[] = []): number {
    return subtasks.filter(subtask => subtask.isCompleted).length;
  }
}
