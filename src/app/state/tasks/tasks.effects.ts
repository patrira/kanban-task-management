import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BoardService } from '../../services/board/board.service';  
import { loadTasks, addTask, updateTask, deleteTask, loadTasksSuccess, loadTasksFailure } from './tasks.actions';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable()
export class TasksEffects {
  constructor( private boardService: BoardService) {}

  private actions$ = inject(Actions)
  
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      switchMap(({ boardId }) => {
        const tasks = this.boardService.getTasks(boardId);

      
        if (tasks) {
          return of(loadTasksSuccess({ tasks }));
        } else {
         
          return of(loadTasksFailure({ error: 'No tasks found for this board' }));
        }
      }),
      catchError((error) => of(loadTasksFailure({ error: error.message || 'Unknown error' }))) // Handle any unexpected errors
    )
  );
    
  

  
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      switchMap(({ boardId, task }) => {
        try {
          this.boardService.addTask(boardId, task);
          return of({ type: '[Tasks] Add Task Success' });
        } catch (err) {
          return of(loadTasksFailure({ error: (err as Error).message }));
        }
      })
    )
  );

  
  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTask),
      switchMap(({ boardId, task }) => {
        try {
          this.boardService.updateTask(boardId, task);
          return of({ type: '[Tasks] Update Task Success' });
        } catch (err) {
          return of(loadTasksFailure({ error: (err as Error).message }));
        }
      })
    )
  );

  
  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      switchMap(({ boardId, taskId }) => {
        try {
          this.boardService.deleteTask(boardId, taskId);
          return of({ type: '[Tasks] Delete Task Success' });
        } catch (err) {
          return of(loadTasksFailure({ error: (err as Error).message }));
        }
      })
    )
  );
}
