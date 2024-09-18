import { createReducer, on } from '@ngrx/store';
import { addTask, updateTask, deleteTask } from './tasks.actions';
import { TasksState } from '../../modals/boards.interface'; 

const initialState: TasksState = {
  tasks: []
};

export const tasksReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  on(updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => t.id === task.id ? task : t)
  })),
  on(deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== taskId)
  }))
);

export { TasksState };
