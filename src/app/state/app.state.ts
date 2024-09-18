import { ActionReducerMap } from '@ngrx/store';
import { BoardsState, boardsReducer } from '../state/boards/boards.reducer';
import { TasksState, tasksReducer } from '../state/tasks/tasks.reducer';
import { UIState, uiReducer } from '../state/ui/ui.reducer';


export interface AppState {
  boards: BoardsState;
  tasks: TasksState;
  ui: UIState;
}


export const appReducers: ActionReducerMap<AppState> = {
  boards: boardsReducer,
  tasks: tasksReducer,
  ui: uiReducer
};
