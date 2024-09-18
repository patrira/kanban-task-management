import { createReducer, on } from '@ngrx/store';
import { toggleSidebar, toggleTheme, openModal, closeModal } from './ui.actions';

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';  
  activeModal: string | null;
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: 'dark', 
  activeModal: null
};

export const uiReducer = createReducer(
  initialState,
  
  on(toggleSidebar, state => ({ ...state, sidebarOpen: !state.sidebarOpen })),
  
  on(toggleTheme, state => ({
    ...state,
    theme: state.theme === 'dark' ? 'light' : 'dark' as 'light' | 'dark'  
  })),
  
  on(openModal, (state, { modalType }) => ({ ...state, activeModal: modalType })),
  
  on(closeModal, state => ({ ...state, activeModal: null }))
);
