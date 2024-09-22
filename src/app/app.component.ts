import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBoards } from './state/board/board.actions';
import { SidebarToggleService } from './services/sidebar-toggle.service';
import { ModalShowService } from './services/modal-show.service';
import { BoardService } from './services/board/board.service';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store, 
    public sidebarService: SidebarToggleService,
    public modalShowService: ModalShowService,
    public boardsService: BoardService  
  ) {}

  ngOnInit() {
    this.store.dispatch(loadBoards()); 
  }
}
