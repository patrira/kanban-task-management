import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task, Subtask } from '../../modals/boards.interface';
import { updateTask } from '../../state/tasks/tasks.actions';
import { selectCurrentTask } from '../../state/tasks/tasks.selectors';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent {
  currentTask$: Observable<Task | undefined>;
  subtaskCopy: Subtask[] = [];
  boardsService: any;
  taskId!: string;

  constructor(private store: Store) {
    this.currentTask$ = this.store.pipe(
      select(selectCurrentTask, { taskId: this.taskId })
    );
  }

  saveTask(task: Task) {
    this.store.dispatch(updateTask({
      task,
      boardId: this.boardsService.currentBoard.id 
    }));
  }
}
