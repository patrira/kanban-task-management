import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../modals/boards.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectedBoardService {
  private selectedBoardSubject = new BehaviorSubject<Board | null>(null);
  selectedBoard$ = this.selectedBoardSubject.asObservable();

  setSelectedBoard(board: Board) {
    this.selectedBoardSubject.next(board);
  }
}
