import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalShowService } from '../../services/modal-show.service';
import { deleteTask } from '../../state/tasks/tasks.actions';
import { selectCurrentTask, selectTasksByBoard } from '../../state/tasks/tasks.selectors';
import { Task } from '../../modals/boards.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-delete-task',
  templateUrl: './confirm-delete-task.component.html',
  styleUrls: ['./confirm-delete-task.component.scss']
})
export class ConfirmDeleteTaskComponent {
  
  currentTask$!: Observable<Task | undefined>; 
  currentTaskIndex: number = 0; 
boardsService: any;

  constructor(
    private store: Store,
    public modalShowService: ModalShowService
  ) {
   
  }

  deleteTask() {
    this.currentTask$.subscribe((task) => {
      if (task) {
        
        this.store.dispatch(deleteTask({
          taskId: task.id,
          boardId: ''
        }));

        
        this.modalShowService.closeModal();
      }
    });
  }

  cancelDelete() {
    this.modalShowService.closeModal(); 
  }
}
