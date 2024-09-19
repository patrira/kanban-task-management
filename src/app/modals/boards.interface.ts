export interface Boards {
  boards: Array<Board>;
}

export interface Board {
  id?: string; // or number, depending on your ID type
  columns: Array<Column>;
  name: string;
}

export interface Column {
  name: string;
  tasks: Array<Task>;
}

export interface Task {
  boardId: string;
  id: string; // or number
  description: string;
  status: string;
  subtasks: Array<Subtask>;
  title: string;
}

export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface BoardsState {
  boards: Board[];
  currentBoard: Board | null;
}

export interface TasksState {
  tasks: Task[];
}

export interface Subtask1 {
  title: string;
  isCompleted: boolean;
}

export interface Task1 {
  id: string; // or number
  boardId: string; // or number
  title: string;
  description: string;
  status: string;
  subtasks: Subtask1[];
}

export interface Column1 {
  name: string;
  tasks: Task1[];
}

export interface Board1 {
  name: string;
  columns: Column1[];
}

export interface Root1 {
  boards: Board1[];
}
