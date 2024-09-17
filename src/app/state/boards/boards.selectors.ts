import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from './boards.reducer';

export const selectBoardsState = createFeatureSelector<BoardsState>('boards');

export const selectAllBoards = createSelector(
  selectBoardsState,
  (state: BoardsState) => state.boards
);

export const selectCurrentBoard = createSelector(
  selectBoardsState,
  (state: BoardsState, props: { boardId: string }) => state.boards.find(board => board.id === props.boardId)
);
