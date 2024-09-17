import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Column, Board } from '../../modals/boards.interface';
import { ModalShowService } from '../../services/modal-show.service';
import { SidebarToggleService } from '../../services/sidebar-toggle.service';
import { createBoard, updateBoard } from '../../state/boards/boards.actions';
import { selectCurrentBoard } from '../../state/boards/boards.selectors';
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

  currentBoard$: Observable<Board | undefined>;  // Observing the current board from NgRx

  constructor(
    private store: Store,
    public modalShowService: ModalShowService,
    public sidebarService: SidebarToggleService
  ) {
    this.currentBoard$ = this.store.select(selectCurrentBoard);  // Use NgRx selector
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

        const updatedBoard = {
          ...currentBoard,
          name: this.name.value || currentBoard.name,
          columns: updatedColumns
        };

        this.store.dispatch(updateBoard({ board: updatedBoard }));  // Dispatch action to update board
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

    const newBoard: Board = {
      name: this.name.value || '',
      columns: columnArray.map((col) => ({
        name: col.nativeElement.value,
        tasks: []
      })).filter(column => !!column.name),
      id: undefined
    };

    this.store.dispatch(createBoard({ board: newBoard }));  // Dispatch action to create new board
    this.modalShowService.closeModal();
  }
}
