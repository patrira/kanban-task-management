import { createReducer, on } from '@ngrx/store';
import { loadBoardsSuccess, addBoard, updateBoard, deleteBoard, createBoard } from './boards.actions';
import { Board } from '../../modals/boards.interface';

export interface BoardsState {
  boards: Board[];
}

const initialState: BoardsState = {
  boards: []
};

export const boardsReducer = createReducer(
  initialState,
  on(loadBoardsSuccess, (state, { boards }) => ({ ...state, boards })),
  on(addBoard, (state, { board }) => ({ ...state, boards: [...state.boards, board] })),
  on(updateBoard, (state, { board }) => ({
    ...state,
    boards: state.boards.map(b => b.id === board.id ? board : b)
  })),
  on(deleteBoard, (state, { boardId }) => ({
    ...state,
    boards: state.boards.filter(b => b.id !== boardId)
  })),

  on(createBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board]
  })),
  on(updateBoard, (state, { board }) => ({
    ...state,
    boards: state.boards.map(b => b.id === board.id ? board : b)
  }))
);




  