import { createReducer, on } from '@ngrx/store';
import { loadTasks, addTask, updateTask, deleteTask } from './tasks.actions';
import { Task } from '../../modals/boards.interface';

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: []
};

export const tasksReducer = createReducer(
  initialState,
  on(loadTasks, (state, { boardId }) => ({ ...state, tasks: state.tasks.filter(task => task.boardId === boardId) })),
  on(addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? task : t)
  })),
  on(deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== taskId)
  }))
);
