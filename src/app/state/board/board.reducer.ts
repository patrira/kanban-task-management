import { Action, createReducer, on } from '@ngrx/store';
import { loadBoardsSuccess, loadBoardsFailure, createBoard,setCurrentBoard, updateBoard,deleteBoard } from './board.actions';
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




export function boardReducer(state: BoardState | undefined, action: Action): BoardState {
    return _boardReducer(state, action);
}

export { BoardState, createBoard, updateBoard };
