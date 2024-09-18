import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectCurrentTask = createSelector(
  selectTasksState,
  (state: TasksState, props: { taskId: string }) => state.tasks.find((task: { id: string; }) => task.id === props.taskId)
);

export const selectTasksByBoard = createSelector(
  selectTasksState,
  (state: TasksState, props: { boardId: string }) => state.tasks.filter((task: { boardId: string; }) => task.boardId === props.boardId)
);
