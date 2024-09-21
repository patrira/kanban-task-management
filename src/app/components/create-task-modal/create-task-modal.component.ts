import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task, Subtask } from '../../modals/boards.interface';
import { addTask } from '../../state/tasks/tasks.actions';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss']
})
export class CreateTaskModalComponent {
  newTask: Task = {
    description: '',
    status: 'TODO',
    subtasks: [],
    title: '',
    boardId: '',
    id: ''  
  };
  
  
boardService: any;

  constructor(private store: Store) {}

  addSubtask() {
    this.newTask.subtasks.push({ title: '', isCompleted: false });
  }

  createTask() {
    this.store.dispatch(addTask({
      task: this.newTask,
      boardId: ''
    }));
  }
  
}
