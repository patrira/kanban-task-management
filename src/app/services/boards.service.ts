import { Injectable } from '@angular/core'; 
import { Boards, Board, Task } from '../modals/boards.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  currentBoard: Board | undefined;
  currentTask: Task | null = null;
  boardsData: Boards | null = null;
  indexes = { taskIndex: 0, columnIndex: 0, dropColumnIndex: 0, dropTaskIndex: 0 };

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
      this.currentBoard = boards.boards[0]; // Set currentBoard to the first board by default
    } else {
      const defaultBoards: Boards = {
        boards: [] 
      };
      this.setBoardsInStorage(defaultBoards);
      this.currentBoard = undefined; 
    }
  }

  getTasks(boardId: string): Task[] | undefined {
    const boards = this.getBoardsFromStorage();
    if (boards) {
      const board = boards.boards.find(b => b.id === boardId);
      return board?.columns.flatMap(column => column.tasks);
    }
    return undefined;
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

  setCurrentBoard(board: Board) {
    this.currentBoard = board;
  }

  setCurrentTask(task: Task) {
    this.currentTask = task;
  }

  getBoards(): Boards | null {
    if (!this.boardsData) {
      this.boardsData = this.getBoardsFromStorage();
    }
    return this.boardsData;
  }
}
