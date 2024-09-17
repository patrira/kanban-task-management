import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BoardsService } from '../../services/boards.service';
import { loadBoards, loadBoardsSuccess } from './boards.actions';

@Injectable()
export class BoardsEffects {
  constructor(private actions$: Actions, private boardsService: BoardsService) {}

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBoards),
      switchMap(() =>
        this.boardsService.getBoards().pipe(
          map(boards => loadBoardsSuccess({ boards })),
          catchError(() => of({ type: '[Boards] Load Boards Failed' }))
        )
      )
    )
  );
}
