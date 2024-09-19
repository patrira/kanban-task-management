import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from './boards.reducer';

// Select the 'boards' feature state
export const selectBoardsState = createFeatureSelector<BoardsState>('boards');

// Selector to get all boards
export const selectAllBoards = createSelector(
  selectBoardsState,
  (state: BoardsState) => state.boards
);

// Selector to get the current board
export const selectCurrentBoard = createSelector(
  selectBoardsState,
  (state: BoardsState) => state.currentBoard
);
