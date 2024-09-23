import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';
import { Task } from '../../modals/boards.interface';


export const selectTasksState = createFeatureSelector<TasksState>('tasks');


export const selectCurrentTask = createSelector(
  selectTasksState,
  (state: TasksState, props: { taskId: string }) => {
    
    return state.tasks.find((task: Task) => task.id === props.taskId);
  }
);
