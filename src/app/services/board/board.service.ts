import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Column1, Board1 } from '../../modals/boards.interface';
import data from "../../../assets/data"

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardData:Board1[] = data.boards

  constructor() { }

  getBoards(): Observable<Board1[]> {
    return of(this.boardData);
  }
}
