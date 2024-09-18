import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store) {
    
    this.currentTask$ = this.store.select(selectCurrentTask);

    
    this.currentTask$.subscribe(task => {
      if (task) {
        this.subtaskCopy = task.subtasks.map(subtask => ({ ...subtask }));
      }
    });
  }

  saveTask(task: Task) {
    
    this.store.dispatch(updateTask({
      task,
      boardId: ''
    }));
  }
}
