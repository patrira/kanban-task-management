import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { ModalShowService } from '../../services/modal-show.service';
import { SelectedBoardService } from '../../services/selected-board-service.service'; 
import { Board, Column, Task } from '../../modals/boards.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  colors = ["#49C4E5", "#8471F2", "#67E2AE", "#d6d45a", "#e09660", "#e0635e", "#de5fc7", "#5d64de"];
  selectedBoard: Board | null = null;

  constructor(
    public boardsService: BoardsService,
    public modalShowService: ModalShowService,
    private selectedBoardService: SelectedBoardService
  ) {}

  ngOnInit() {
    this.boardsService.initializeBoards();
    this.selectedBoardService.selectedBoard$.subscribe(board => {
      this.selectedBoard = board;
    });
  }

  openAddTaskModal() {
    this.modalShowService.openCreateTaskModal();
  }

  openAddBoardModal() {
    this.modalShowService.openCreateBoardModal();
  }

  onNewColumnClick() {
    this.modalShowService.openEditBoardModal();
  }

  addTask(task: Task) {
    const boardId = this.boardsService.currentBoard?.id;
    if (boardId) {
      this.boardsService.addTask(boardId, task);
    } else {
      console.error("Board ID is undefined. Cannot add a task.");
    }
  }
  

  get columns(): Column[] {
    return this.selectedBoard?.columns ?? [];
  }
}
