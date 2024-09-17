import { createAction, props } from '@ngrx/store';
import { Board } from '../../modals/boards.interface';

export const loadBoards = createAction('[Boards] Load Boards');
export const loadBoardsSuccess = createAction('[Boards] Load Boards Success', props<{ boards: Board[] }>());
export const addBoard = createAction('[Boards] Add Board', props<{ board: Board }>());
export const updateBoard = createAction('[Boards] Update Board', props<{ board: Board }>());
export const deleteBoard = createAction('[Boards] Delete Board', props<{ boardId: string }>());
export const createBoard = createAction('[Boards] Create Board', props<{ board: Board }>());

