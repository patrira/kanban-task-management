import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { ModalShowService } from '../../services/modal-show.service';
import { Board, Column } from '../../modals/boards.interface'; // Import necessary interfaces

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  colors = ["#49C4E5", "#8471F2", "#67E2AE", "#d6d45a", "#e09660", "#e0635e", "#de5fc7", "#5d64de"];

  constructor(public boardsService: BoardsService, public modalShowService: ModalShowService) {}

  ngOnInit() {
    // Initialize currentBoard if needed
    this.boardsService.initializeBoards();
  }

  onNewColumnClick() {
    this.modalShowService.openEditBoardModal();
  }

  onNewBoardClick() {
    this.modalShowService.openCreateBoardModal();
  }

  get columns(): Column[] {
    // Return an empty array if currentBoard is undefined
    return this.boardsService.currentBoard?.columns ?? [];
  }
}
