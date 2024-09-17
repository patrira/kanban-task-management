import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectTasksByBoard = createSelector(
  selectTasksState,
  (state: TasksState, props: { boardId: string }) => state.tasks.filter(task => task.boardId === props.boardId)
);
