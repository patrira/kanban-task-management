import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Column1, Board1, Boards, Task, Board } from '../../modals/boards.interface';
import data from '../../../assets/data';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardData: Board1[] = data.boards;
  currentBoard: Board1 | undefined;
  currentTask: Task | null = null;
  indexes = { taskIndex: 0, columnIndex: 0, dropColumnIndex: 0, dropTaskIndex: 0 };

  constructor() {
    this.initializeBoards();
  }

  getBoards(): Observable<Board1[]> {
    return of(this.boardData);
  }

  getBoardsFromStorage(): Boards | null {
    const boards = localStorage.getItem('boards');
    return boards ? JSON.parse(boards) : null;
  }

  setBoardsInStorage(boards: Boards) {
    localStorage.setItem('boards', JSON.stringify(boards));
  }

  initializeBoards() {
    const boards = this.getBoardsFromStorage();
    if (boards && boards.boards.length > 0) {
      this.boardData = boards.boards.map((board: Board) => ({
        ...board,
        id: board.id ?? ''  
      }));
      this.currentBoard = this.boardData[0]; 
    } else {
      const defaultBoards: Boards = { boards: [] };
      this.setBoardsInStorage(defaultBoards);
      this.currentBoard = undefined;
    }
  }

  // Add getTasks method
  getTasks(boardId: string): Task[] | undefined {
    const boards = this.getBoardsFromStorage();
    if (boards) {
      const board = boards.boards.find(b => b.id === boardId);
      return board?.columns.flatMap(column => column.tasks);
    }
    return undefined;
  }

  updateTask(boardId: string, updatedTask: Task) {
    const boards = this.getBoardsFromStorage();
    if (boards) {
      const board = boards.boards.find(b => b.id === boardId);
      if (board) {
        board.columns.forEach(column => {
          column.tasks = column.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        });
        this.setBoardsInStorage(boards);  
      }
    }
  }

  
  deleteTask(boardId: string, taskId: string) {
    const boards = this.getBoardsFromStorage();
    if (boards) {
      const board = boards.boards.find(b => b.id === boardId);
      if (board) {
        board.columns.forEach(column => {
          column.tasks = column.tasks.filter(task => task.id !== taskId);
        });
        this.setBoardsInStorage(boards);  
      }
    }
  }

  addTask(boardId: string, task: Task) {
    const boards = this.getBoardsFromStorage();
    if (boards) {
      const board = boards.boards.find(b => b.id === boardId);
      if (board) {
        board.columns[0].tasks.push(task);  
        this.setBoardsInStorage(boards);    
      }
    }
  }

  addBoard(newBoard: Board1) {
    const boards = this.getBoardsFromStorage();
    if (boards) {
      boards.boards.push(newBoard);
      this.setBoardsInStorage(boards);  
    }
  }

  addColumn(boardId: string, newColumn: Column1) {
    const boards = this.getBoardsFromStorage();
    if (boards) {
      const board = boards.boards.find(b => b.id === boardId);
      if (board) {
        board.columns.push(newColumn);  
        this.setBoardsInStorage(boards);  
      }
    }
  }
}
