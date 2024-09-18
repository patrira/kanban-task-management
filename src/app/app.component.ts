import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBoards } from './state/boards/boards.actions';
import { SidebarToggleService } from './services/sidebar-toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

modalShowService: any;
boardsService: any;
  constructor(private store: Store, public sidebarService: SidebarToggleService) {}

  ngOnInit() {
    
    this.store.dispatch(loadBoards());
  }
}
