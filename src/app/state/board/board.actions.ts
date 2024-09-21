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

export const createBoard = createAction('[Boards] Create Board', props<{ board: Board1 }>());
export const updateBoard = createAction('[Boards] Update Board', props<{ board: Board1 }>());
export const deleteBoard = createAction('[Boards] Delete Board', props<{ boardId: string }>());
export const setCurrentBoard = createAction('[Boards] Set Current Board', props<{ board: Board1 }>());