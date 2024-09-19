import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBoards } from './state/boards/boards.actions';
import { SidebarToggleService } from './services/sidebar-toggle.service';
import { ModalShowService } from './services/modal-show.service';
import { BoardsService } from './services/boards.service';  // Ensure correct import

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
    public boardsService: BoardsService  
  ) {}

  ngOnInit() {
    this.store.dispatch(loadBoards()); 
  }
}
