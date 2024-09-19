import { Board1 } from "../../modals/boards.interface";

export interface BoardState {
    boards: Board1[];
    error: any;
  }
  
  export const initialState: BoardState = {
    boards: [],
    error: null,
  };