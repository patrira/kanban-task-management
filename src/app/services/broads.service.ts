import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Board, Boards, Task } from '../modals/boards.interface';
import { loadBoardsSuccess } from '../state/boards/boards.actions';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  boards!: Boards;
  currentBoard!: Board;
  currentTask: Task = {
    description: "string",
    status: "string",
    subtasks: [],
    title: "string",
    boardId: '',
    id: undefined
  };

  indexes = {
    boardIndex: 0,
    columnIndex: 0,
    taskIndex: 0,
    subtaskIndex: 0,
    dropColumnIndex: 0,
    dropTaskIndex: 0,
  };

  constructor(private store: Store) {}

  getBoards() {
    this.boards = JSON.parse(localStorage.getItem('boards') || '[]');
    this.store.dispatch(loadBoardsSuccess({ boards: this.boards.boards }));
  }

  setBoards(boards: Boards) {
    localStorage.setItem('boards', JSON.stringify(boards));
  }

  setCurrentBoard(board: Board) {
    this.currentBoard = board;
  }

  setCurrentTask(task: Task) {
    this.currentTask = task;
  }
}
