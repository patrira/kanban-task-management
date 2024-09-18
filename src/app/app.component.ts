import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBoards } from './state/boards/boards.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
sidebarService: any;
modalShowService: any;
boardsService: any;
  constructor(private store: Store) {}

  ngOnInit() {
    
    this.store.dispatch(loadBoards());
  }
}
