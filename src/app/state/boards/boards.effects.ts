import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { loadBoards, loadBoardsSuccess, loadBoardsFailure } from './boards.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Boards } from '../../modals/boards.interface';

@Injectable()
export class BoardsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBoards),
      switchMap(() =>
        this.http.get<Boards>('/assets/data.json').pipe(
          map(boards => loadBoardsSuccess({ boards })),
          catchError(() => of(loadBoardsFailure()))
        )
      )
    )
  );
}
