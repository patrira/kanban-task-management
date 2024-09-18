import { createAction, props } from '@ngrx/store';
import { Board, Boards } from '../../modals/boards.interface';


export const loadBoards = createAction('[Boards] Load Boards');
export const loadBoardsSuccess = createAction('[Boards] Load Boards Success', props<{ boards: Boards }>());
export const loadBoardsFailure = createAction('[Boards] Load Boards Failure');


export const createBoard = createAction('[Boards] Create Board', props<{ board: Board }>());
export const updateBoard = createAction('[Boards] Update Board', props<{ board: Board }>());
export const deleteBoard = createAction('[Boards] Delete Board', props<{ boardId: string }>());
export const setCurrentBoard = createAction('[Boards] Set Current Board', props<{ board: Board }>());
