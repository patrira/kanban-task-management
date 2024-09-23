import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from './board.reducer';


export const selectBoardsState = createFeatureSelector<BoardState>('boards');


export const selectAllBoards = createSelector(
  selectBoardsState,
  (state: BoardState) => state.boards
);


export const selectCurrentBoard = createSelector(
  selectBoardsState,
  (state: BoardState) => state.currentBoard
);
