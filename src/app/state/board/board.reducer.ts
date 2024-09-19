import { Action, createReducer, on } from '@ngrx/store';
import { loadBoardsSuccess, loadBoardsFailure } from './board.actions';
import { BoardState, initialState } from './board.state';

const _boardReducer = createReducer(
  initialState,
  on(loadBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards: boards,
    error: null,
  })),
  on(loadBoardsFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
)


export function boardReducer(state: BoardState | undefined, action: Action): BoardState {
    return _boardReducer(state, action);
}