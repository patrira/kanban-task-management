import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from './board.reducer';

// Select the 'boards' feature state
export const selectBoardsState = createFeatureSelector<BoardState>('boards');

// Selector to get all boards
export const selectAllBoards = createSelector(
  selectBoardsState,
  (state: BoardState) => state.boards
);


export const selectCurrentBoard = createSelector(
  selectBoardsState,
  (state: BoardState) => state.currentBoard
);
