import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { loadBoards, loadBoardsSuccess, loadBoardsFailure } from './board.actions';
import { BoardService } from '../../services/board/board.service';

@Injectable()

export class BoardEffects {
    private actions$ = inject(Actions);
    private boardService = inject(BoardService);
  
    loadBoards$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadBoards),
        mergeMap(() =>
          this.boardService.getBoards().pipe(
            map((boards) => loadBoardsSuccess({ boards })),
            catchError((error) => of(loadBoardsFailure({ error }))),
          ),
        ),
      ),
    );
}