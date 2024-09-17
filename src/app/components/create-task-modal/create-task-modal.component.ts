import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task, Subtask } from '../types/boards.interface';
import { addTask } from '../state/tasks/tasks.actions';

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
    title: ''
  };

  constructor(private store: Store) {}

  addSubtask() {
    this.newTask.subtasks.push({ title: '', isCompleted: false });
  }

  createTask() {
    // Dispatch addTask action to create a new task
    this.store.dispatch(addTask({ task: this.newTask }));
  }
}
