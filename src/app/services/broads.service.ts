import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Board, Boards } from '../types/boards.interface';
import { loadBoards, addBoard, updateBoard, deleteBoard } from '../state/boards/boards.actions';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  constructor(private store: Store) {}

  getBoards() {
    // Dispatch the loadBoards action to load the boards
    this.store.dispatch(loadBoards());
  }

  setBoards(boards: Boards) {
    // Dispatch the updateBoard action to update the boards
    this.store.dispatch(updateBoard({ board: boards.boards[0] }));
  }

  createBoard(board: Board) {
    this.store.dispatch(addBoard({ board }));
  }

  deleteBoard(boardId: string) {
    this.store.dispatch(deleteBoard({ boardId }));
  }
}
