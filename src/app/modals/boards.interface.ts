
export interface Boards{
    boards: Array<Board>
}

export interface Board{
    id?: any
    columns: Array<Column>
    name: string
}

export interface Column{
    name: string
    tasks: Array<Task>
}

export interface Task{
    boardId: string
    id: any
    description: string
    status: string
    subtasks: Array<Subtask>
    title: string
}

export interface Subtask{
    [x: string]: any
    isCompleted: boolean
    title: string
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