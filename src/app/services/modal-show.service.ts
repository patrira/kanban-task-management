import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { openModal, closeModal } from '../state/ui/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class ModalShowService {
  darkBackground = false;
  showEditDeleteContainer = false;  // Ensure this is defined and works as a boolean flag
showTaskModal: any;
showEditTaskModal: any;
showCreateTaskModal: any;
showDeleteBoardModal: any;
showDeleteTaskModal: any;
showCreatedBoardModal: any;
showEditBoardModal: any;

  constructor(private store: Store) {}

  
  closeEditDeleteContainer() {
    this.showEditDeleteContainer = false;
  }

  
  onEditDeleteContainerClick() {
    this.showEditDeleteContainer = !this.showEditDeleteContainer;
  }

  openTaskModal() {
    this.darkBackground = true;
    this.store.dispatch(openModal({ modalType: 'TaskModal' }));
  }

  openEditTaskModal() {
    this.darkBackground = true;
    this.store.dispatch(openModal({ modalType: 'EditTaskModal' }));
  }

  openCreateTaskModal() {
    this.darkBackground = true;
    this.store.dispatch(openModal({ modalType: 'CreateTaskModal' }));
  }

  openDeleteTaskModal() {
    this.darkBackground = true;
    this.store.dispatch(openModal({ modalType: 'DeleteTaskModal' }));
  }

  openEditBoardModal() {
    this.darkBackground = true;
    this.store.dispatch(openModal({ modalType: 'EditBoardModal' }));
  }

  openDeleteBoardModal() {
    this.darkBackground = true;
    this.store.dispatch(openModal({ modalType: 'DeleteBoardModal' }));
  }

  openCreateBoardModal() {
    this.darkBackground = true;
    this.store.dispatch(openModal({ modalType: 'CreateBoardModal' }));
  }

  closeModal() {
    this.darkBackground = false;
    this.store.dispatch(closeModal());
  }
}
