import { createAction, props } from '@ngrx/store';
import { Task } from '../../modals/boards.interface';

export const loadTasks = createAction(
  '[Tasks] Load Tasks',
  props<{ boardId: string }>()  
);

export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction('[Tasks] Load Tasks Failure');


export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ boardId: string; task: Task }>()
);


export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ boardId: string; task: Task }>()
);


export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ boardId: string; taskId: string }>()
);
