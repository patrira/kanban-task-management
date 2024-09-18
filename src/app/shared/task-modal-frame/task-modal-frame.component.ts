import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalShowService } from '../../services/modal-show.service';
import { Column, Subtask, Task } from '../../modals/boards.interface';
import { updateTask, addTask } from '../../state/tasks/tasks.actions';
import { Observable } from 'rxjs';
import { selectCurrentTask } from '../../state/tasks/tasks.selectors';

@Component({
  selector: 'app-task-modal-frame',
  templateUrl: './task-modal-frame.component.html',
  styleUrls: ['./task-modal-frame.component.scss']
})
export class TaskModalFrameComponent implements OnInit {

  @Input() modalName: string = '';
  @Input() titleValue: string = '';
  @Input() descriptionValue: string = '';
  @Input() subtasks: Array<Subtask> = [
    { title: '', isCompleted: false },
    { title: '', isCompleted: false }
  ];
  @Input() statusValues: Array<Column> = [];
  @Input() buttonName: string = '';

  @ViewChildren('templateSubtask') subtasksInputChildren!: QueryList<ElementRef<HTMLInputElement>>;
  
  name = new FormControl('', Validators.required);
  subtaskPlaceholders = ['e.g. Make coffee', 'e.g. Drink coffee & smile'];

  currentTask$: Observable<Task | undefined>; 

  constructor(
    private store: Store,
    public modalShowService: ModalShowService
  ) {
    this.currentTask$ = this.store.select(selectCurrentTask);  
  }

  ngOnInit() {
    this.name.setValue(this.titleValue);
  }

  removeSubtask(subtaskIndex: number, event: Event) {
    event.preventDefault();
    this.subtasks.splice(subtaskIndex, 1);
  }

  addNewSubtask(event: Event) {
    event.preventDefault();
    this.subtasks.push({ title: '', isCompleted: false });
  }

  saveTask(event: Event, title: string, description: string, status: string) {
    event.preventDefault();
    
    const subtasksArray = this.subtasksInputChildren.toArray();
    if (this.name.status === 'INVALID') {
      this.name.markAsDirty();
      return;
    }

    this.currentTask$.subscribe((currentTask) => {
      if (currentTask) {
        const updatedSubtasks = subtasksArray.map((subtaskInput, i) => ({
          title: subtaskInput.nativeElement.value || this.subtasks[i].title,
          isCompleted: this.subtasks[i].isCompleted
        }));

        const updatedTask: Task = {
          ...currentTask,
          title,
          description,
          subtasks: updatedSubtasks.filter(subtask => !!subtask.title),
          status
        };

        this.store.dispatch(updateTask({
          task: updatedTask,
          boardId: ''
        }));  
        this.modalShowService.closeModal();
      }
    });
  }

  createTask(event: Event, title: string, description: string, status: string) {
    event.preventDefault();

    const subtasksArray = this.subtasksInputChildren.toArray();
    if (this.name.status === 'INVALID') {
      this.name.markAsDirty();
      return;
    }

    const newTask: Task = {
      title,
      description,
      subtasks: subtasksArray.map(subtaskInput => ({
        title: subtaskInput.nativeElement.value,
        isCompleted: false
      })).filter(subtask => !!subtask.title),
      status,
      boardId: '',
      id: undefined
    };

    this.store.dispatch(addTask({
      task: newTask,
      boardId: ''
    })); 
    this.modalShowService.closeModal();
  }
}
