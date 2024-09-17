import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/side-bar/side-bar.component';
import { ColumnComponent } from './components/column/column.component';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { BoardModalFrameComponent } from './shared/board-modal-frame/board-modal-frame.component';
import { TaskModalFrameComponent } from './shared/task-modal-frame/task-modal-frame.component';

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
    TaskModalFrameComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
  
    AppRoutingModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
