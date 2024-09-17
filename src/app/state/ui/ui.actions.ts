import { createAction, props } from '@ngrx/store';

export const toggleSidebar = createAction('[UI] Toggle Sidebar');
export const toggleTheme = createAction('[UI] Toggle Theme');
export const openModal = createAction('[UI] Open Modal', props<{ modalType: string }>());
export const closeModal = createAction('[UI] Close Modal');
