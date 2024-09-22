import { ActionReducerMap } from '@ngrx/store';
import { BoardState, boardReducer } from '../state/board/board.reducer';
import { TasksState, tasksReducer } from '../state/tasks/tasks.reducer';
import { UIState, uiReducer } from '../state/ui/ui.reducer';


export interface AppState {
  boards: BoardState;
  tasks: TasksState;
  ui: UIState;
}


export const appReducers: ActionReducerMap<AppState> = {
  boards: boardReducer,
  tasks: tasksReducer,
  ui: uiReducer
};
