import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BoardsService } from '../../services/broads.service';  
import { loadTasks, addTask, updateTask, deleteTask, loadTasksSuccess, loadTasksFailure } from './tasks.actions';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions, private boardsService: BoardsService) {}

  // Effect for loading tasks
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      switchMap(({ boardId }) =>
        {
          const tasks = this.boardsService.getTasks(boardId);
          if (tasks) {
            return of(loadTasksSuccess({ tasks }));
          } else {
            return of(loadTasksFailure());
          }
        }
      )
    )
  );

  // Effect for adding a task
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      switchMap(({ boardId, task }) => {
        this.boardsService.addTask(boardId, task);
        return of({ type: '[Tasks] Add Task Success' });
      }),
      catchError(() => of({ type: '[Tasks] Add Task Failed' }))
    )
  );

  // Effect for updating a task
  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTask),
      switchMap(({ boardId, task }) => {
        this.boardsService.updateTask(boardId, task);
        return of({ type: '[Tasks] Update Task Success' });
      }),
      catchError(() => of({ type: '[Tasks] Update Task Failed' }))
    )
  );

  // Effect for deleting a task
  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      switchMap(({ boardId, taskId }) => {
        this.boardsService.deleteTask(boardId, taskId);
        return of({ type: '[Tasks] Delete Task Success' });
      }),
      catchError(() => of({ type: '[Tasks] Delete Task Failed' }))
    )
  );
}
