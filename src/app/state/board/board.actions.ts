import { createAction, props } from '@ngrx/store';
import { Board1 } from '../../modals/boards.interface';

export const loadBoards = createAction('[Board] Load Boards');

export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ boards: Board1[] }>(),
);

export const loadBoardsFailure = createAction(
  '[Board] Load Boards Failure',
  props<{ error: any }>(),
);