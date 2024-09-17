import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subtask, Task } from '../types/boards.interface';
import { BoardsService } from '../services/boards.service';
import { ModalShowService } from '../services/modal-show.service';
import { updateTask, updateSubtaskStatus } from '../state/tasks/tasks.actions';
import { selectCurrentTask } from '../state/tasks/tasks.selectors';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  currentTask$: Observable<Task | undefined>;
  showEditDeleteContainer = false;

  constructor(
    private store: Store,
    public modalShowService: ModalShowService,
    public boardsService: BoardsService
  ) {
    // Select the current task from the NgRx store
    this.currentTask$ = this.store.select(selectCurrentTask);
  }

  openEditDeleteContainer() {
    this.showEditDeleteContainer = !this.showEditDeleteContainer;
  }

  handleCheckboxClick(subtask: Subtask, i: number) {
    subtask.isCompleted = !subtask.isCompleted;
    this.store.dispatch(updateSubtaskStatus({ subtask }));  // Dispatch action to update subtask status
  }

  changeStatus(value: string, task: Task) {
    task.status = value;
    this.store.dispatch(updateTask({ task }));  // Dispatch action to update task status
    this.modalShowService.closeModal();
  }

  openDeleteTaskModal() {
    this.modalShowService.openDeleteTaskModal();
  }

  filterCompletedTasks(subtasks: Array<Subtask>): number {
    return subtasks.filter(subtask => subtask.isCompleted).length;
  }
}
