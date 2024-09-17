import { createReducer, on } from '@ngrx/store';
import { addTask, updateTask, deleteTask, updateSubtaskStatus } from './tasks.actions';
import { Task, Subtask } from '../../types/boards.interface';

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: []
};

export const tasksReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? task : t)
  })),
  on(deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== taskId)
  })),
  on(updateSubtaskStatus, (state, { subtask }) => ({
    ...state,
    tasks: state.tasks.map(task => ({
      ...task,
      subtasks: task.subtasks.map(s => s.id === subtask.id ? subtask : s)
    }))
  }))
);
