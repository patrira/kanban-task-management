import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren, HostListener } from '@angular/core'; 
import { FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ModalShowService } from '../../services/modal-show.service';
import { BoardService } from '../../services/board/board.service';  
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
  currentTask$: Observable<Task | undefined>; 
  taskId!: string;

  constructor(
    private store: Store,
    public modalShowService: ModalShowService,
    public boardService: BoardService,  
    private elementRef: ElementRef  
  ) {
    this.currentTask$ = this.store.pipe(
      select(selectCurrentTask, { taskId: this.taskId })
    );  
  }

  ngOnInit() {
    this.name.setValue(this.titleValue);
  }

  // Close modal when clicking outside
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const modalContent = this.elementRef.nativeElement.querySelector('.modal-content');
    if (modalContent && !modalContent.contains(event.target)) {
      this.modalShowService.closeModal();
    }
  }

  closeModal() {
    this.modalShowService.closeModal();
  }

  // Save task method
  saveTask(event: Event, title: string, description: string, status: string) {
    event.preventDefault();
    const subtasksArray = this.subtasksInputChildren.toArray();
    if (this.name.status === 'INVALID') {
      this.name.markAsDirty();
      return;
    }

    this.currentTask$.subscribe((currentTask) => {
      if (currentTask) {
        const updatedTask: Task = {
          ...currentTask,
          title,
          description,
          subtasks: subtasksArray.map((subtaskInput, i) => ({
            title: subtaskInput.nativeElement.value || this.subtasks[i].title,
            isCompleted: this.subtasks[i].isCompleted
          })).filter(subtask => !!subtask.title),
          status
        };

        // Dispatch update task action
        this.store.dispatch(updateTask({
          task: updatedTask, 
          boardId: this.boardService.currentBoard?.id ?? ''  // Ensure boardId is always a string
        }));
        this.closeModal();
      }
    });
  }

  // Create task method
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
      id: ''
    };

    // Dispatch create task action
    this.store.dispatch(addTask({
      task: newTask,
      boardId: this.boardService.currentBoard?.id ?? ''  // Ensure boardId is a string
    }));
    this.closeModal();
  }
}

