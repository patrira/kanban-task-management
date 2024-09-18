import { Injectable } from '@angular/core';
import { Boards, Board, Task } from '../modals/boards.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
[x: string]: any;
  setCurrentBoard(arg0: Board) {
    throw new Error('Method not implemented.');
  }
  setBoards(boards: any) {
    throw new Error('Method not implemented.');
  }
  boards(boards: any) {
    throw new Error('Method not implemented.');
  }
  currentBoard: Board | null = null;  
  currentTask: Task | null = null; 
  boardsData: Boards | null = null;  // Holds the boards data
     

  indexes!: { taskIndex: number; columnIndex: number; dropColumnIndex: number; dropTaskIndex: number };

  
  getBoardsFromStorage(): Boards | null {
    const boards = localStorage.getItem('boards');
    return boards ? JSON.parse(boards) : null;
  }

  
  setBoardsInStorage(boards: Boards) {
    localStorage.setItem('boards', JSON.stringify(boards));
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
  setCurrentTask(task: Task) {
    this.currentTask = task;
  }
  getBoards() {
    if (!this.boardsData) {
      this.boardsData = this.getBoardsFromStorage();
    }
    return this.boardsData;
  }
}
