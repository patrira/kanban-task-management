import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../modals/boards.interface';
import { addTask } from '../../state/tasks/tasks.actions';
import { BoardService } from '../../services/board/board.service';

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

  constructor(private store: Store, public boardService: BoardService) {}

  addSubtask() {
    this.newTask.subtasks.push({ title: '', isCompleted: false });
  }

  createTask() {
    if (this.boardService.currentBoard) {  // Ensure currentBoard is defined
      this.newTask.boardId = this.boardService.currentBoard.id; // Set correct boardId
      this.store.dispatch(addTask({
        task: this.newTask,
        boardId: this.boardService.currentBoard.id  // Ensure boardId is defined
      }));
    }
  }
}


