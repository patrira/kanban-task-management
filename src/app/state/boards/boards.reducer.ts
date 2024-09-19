import { createReducer, on } from '@ngrx/store';
import { loadBoardsSuccess, loadBoardsFailure, createBoard, updateBoard, deleteBoard, setCurrentBoard } from './boards.actions';
import { BoardsState } from '../../modals/boards.interface';  

const initialState: BoardsState = {
  boards: [],
  currentBoard: null
};

export const boardsReducer = createReducer(
  initialState,
  on(loadBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards: boards.boards
  })),
  on(loadBoardsFailure, state => ({
    ...state,
    boards: []
  })),
  on(createBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board]
  })),
  on(updateBoard, (state, { board }) => ({
    ...state,
    boards: state.boards.map((b) => b.id === board.id ? board : b)
  })),
  on(deleteBoard, (state, { boardId }) => ({
    ...state,
    boards: state.boards.filter(board => board.id !== boardId)
  })),
  on(setCurrentBoard, (state, { board }) => ({
    ...state,
    currentBoard: board
  }))
);

export { BoardsState };
