import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TasksService } from '../../services/tasks.service';
import { loadTasks, addTask, updateTask, deleteTask } from './tasks.actions';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      switchMap(({ boardId }) =>
        this.tasksService.getTasks(boardId).pipe(
          map(tasks => ({ type: '[Tasks] Load Tasks Success', tasks })),
          catchError(() => of({ type: '[Tasks] Load Tasks Failed' }))
        )
      )
    )
  );
}
