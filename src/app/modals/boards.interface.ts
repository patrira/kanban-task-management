
export interface Boards{
    boards: Array<Board>
}

export interface Board{
    id: any
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
    isCompleted: boolean
    title: string
}