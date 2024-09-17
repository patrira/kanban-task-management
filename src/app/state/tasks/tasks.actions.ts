import { createAction, props } from '@ngrx/store';
import { Task } from '../../modals/boards.interface';

export const loadTasks = createAction('[Tasks] Load Tasks', props<{ boardId: string }>());
export const addTask = createAction('[Tasks] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Tasks] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Tasks] Delete Task', props<{ taskId: string }>());
