import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import { ModalShowService } from '../../services/modal-show.service';
import { SelectedBoardService } from '../../services/selected-board-service.service'; 
import { Board, Column } from '../../modals/boards.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  colors = ["#49C4E5", "#8471F2", "#67E2AE", "#d6d45a", "#e09660", "#e0635e", "#de5fc7", "#5d64de"];
  selectedBoard: Board | null = null;

  constructor(
    public boardService: BoardService,
    public modalShowService: ModalShowService,
    private selectedBoardService: SelectedBoardService 
  ) {}

  ngOnInit() {
    
    this.boardService.initializeBoards();

    
    this.selectedBoardService.selectedBoard$.subscribe(board => {
      this.selectedBoard = board;
    });
  }

  onNewColumnClick() {
    this.modalShowService.openEditBoardModal();
  }

  onNewBoardClick() {
    this.modalShowService.openCreateBoardModal();
  }

  get columns(): Column[] {
    return this.selectedBoard?.columns ?? []; 
  }
}
