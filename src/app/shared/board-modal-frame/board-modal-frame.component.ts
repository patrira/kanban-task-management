import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Column, Board1 } from '../../modals/boards.interface';  // Ensure this is your Board1 interface
import { ModalShowService } from '../../services/modal-show.service';
import { SidebarToggleService } from '../../services/sidebar-toggle.service';
import { createBoard, updateBoard } from '../../state/board/board.reducer';
import { selectCurrentBoard } from '../../state/board/board.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-modal-frame',
  templateUrl: './board-modal-frame.component.html',
  styleUrls: ['./board-modal-frame.component.scss']
})
export class BoardModalFrameComponent implements OnInit {

  @Input() modalName: string = '';
  @Input() titleValue: string = '';
  @Input() descriptionValue: string = '';
  @Input() columns: Array<Column> = [
    { name: '', tasks: [] },
    { name: '', tasks: [] }
  ];
  @Input() statusValues: string[] = [];
  @Input() buttonName: string = '';

  @ViewChildren('templateColumn') columnChildren!: QueryList<ElementRef<HTMLInputElement>>;

  name = new FormControl('', [Validators.required, Validators.maxLength(21)]);
  columnsCopy!: Array<Column>;
  columnPlaceholders = ['e.g Todo', 'e.g Doing', 'e.g Done'];

  currentBoard$: Observable<Board1 | null>;

  constructor(
    private store: Store,
    public modalShowService: ModalShowService,
    public sidebarService: SidebarToggleService
  ) {
    this.currentBoard$ = this.store.select(selectCurrentBoard);
  }

  ngOnInit() {
    this.name.setValue(this.titleValue);
    this.columnsCopy = [...this.columns];
  }

  removeColumn(columnIndex: number, event: Event) {
    event.preventDefault();
    this.columnsCopy.splice(columnIndex, 1);
  }

  addNewColumn(event: Event) {
    event.preventDefault();
    this.columnsCopy.push({ name: '', tasks: [] });
  }

  saveBoard(event: Event) {
    event.preventDefault();
    const columnArray = this.columnChildren.toArray();

    if (this.name.status === 'INVALID') {
      this.name.markAsDirty();
      return;
    }

    this.currentBoard$.subscribe((currentBoard) => {
      if (currentBoard) {
        const updatedColumns = this.columnsCopy.map((column, index) => {
          column.name = columnArray[index].nativeElement.value || column.name;
          return column;
        }).filter(column => !!column.name);

        const updatedBoard: Board1 = {
          ...currentBoard,
          name: this.name.value || currentBoard.name,
          columns: updatedColumns,
          id: currentBoard.id // Ensure you retain the existing ID
        };

        this.store.dispatch(updateBoard({ board: updatedBoard }));
        this.modalShowService.closeModal();
      }
    });
  }

  createBoard(event: Event) {
    event.preventDefault();
    const columnArray = this.columnChildren.toArray();

    if (this.name.status === 'INVALID') {
      this.name.markAsDirty();
      return;
    }

    const newBoard: Board1 = {
      name: this.name.value || '',
      columns: columnArray.map((col) => ({
        name: col.nativeElement.value,
        tasks: []
      })).filter(column => !!column.name),
      id: this.generateBoardId() 
    };

    this.store.dispatch(createBoard({ board: newBoard }));
    this.modalShowService.closeModal();
  }

  private generateBoardId(): string {
    
    return Math.random().toString(36).substr(2, 9); 
  }
}
