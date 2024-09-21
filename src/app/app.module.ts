import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/side-bar/side-bar.component';
import { ColumnComponent } from './components/column/column.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { BoardModalFrameComponent } from './shared/board-modal-frame/board-modal-frame.component';
import { TaskModalFrameComponent } from './shared/task-modal-frame/task-modal-frame.component';
import { ConfirmDeleteBoardComponent } from './components/confirm-delete-board/confirm-delete-board.component';
import { ConfirmDeleteTaskComponent } from './components/confirm-delete-task/confirm-delete-task.component';

import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './state/tasks/tasks.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { boardReducer } from './state/board/board.reducer';
import { BoardEffects } from './state/board/board.effect';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    ColumnComponent,
    SidebarComponent,
    TaskModalComponent,
    EditTaskModalComponent,
    CreateTaskModalComponent,
    BoardModalFrameComponent,
    TaskModalFrameComponent,
    ConfirmDeleteBoardComponent,
    ConfirmDeleteTaskComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
  FormsModule,
  ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(),
    StoreModule.forFeature('board', boardReducer),
    EffectsModule.forRoot([TasksEffects, BoardEffects]),
    EffectsModule.forFeature(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: !isDevMode(), 
      
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
