import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { openModal, closeModal } from '../state/ui/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class ModalShowService {
  darkBackground = false;
  showTaskModal = false;
  showEditTaskModal = false;
  showCreateTaskModal = false;
  showDeleteBoardModal = false;
  showDeleteTaskModal = false;
  showCreatedBoardModal = false;
  showEditBoardModal = false;
  showEditDeleteContainer = false;

  constructor(private store: Store) {}

  openTaskModal() {
    this.darkBackground = true;
    this.showTaskModal = true;
    this.store.dispatch(openModal({ modalType: 'TaskModal' }));
  }

  openEditTaskModal() {
    this.darkBackground = true;
    this.showEditTaskModal = true;
    this.store.dispatch(openModal({ modalType: 'EditTaskModal' }));
  }

  openCreateTaskModal() {
    this.darkBackground = true;
    this.showCreateTaskModal = true;
    this.store.dispatch(openModal({ modalType: 'CreateTaskModal' }));
  }

  openDeleteTaskModal() {
    this.darkBackground = true;
    this.showDeleteTaskModal = true;
    this.store.dispatch(openModal({ modalType: 'DeleteTaskModal' }));
  }

  openEditBoardModal() {
    this.darkBackground = true;
    this.showEditBoardModal = true;
    this.store.dispatch(openModal({ modalType: 'EditBoardModal' }));
  }

  openDeleteBoardModal() {
    this.darkBackground = true;
    this.showDeleteBoardModal = true;
    this.store.dispatch(openModal({ modalType: 'DeleteBoardModal' }));
  }

  openCreateBoardModal() {
    this.darkBackground = true;
    this.showCreatedBoardModal = true;
    this.store.dispatch(openModal({ modalType: 'CreateBoardModal' }));
  }

  
  onEditDeleteContainerClick() {
    this.showEditDeleteContainer = !this.showEditDeleteContainer;  
  }

  closeEditDeleteContainer() {
    this.showEditDeleteContainer = false;
  }

  closeModal() {
    this.darkBackground = false;
    this.showTaskModal = false;
    this.showEditTaskModal = false;
    this.showCreateTaskModal = false;
    this.showDeleteBoardModal = false;
    this.showDeleteTaskModal = false;
    this.showCreatedBoardModal = false;
    this.showEditBoardModal = false;
    this.store.dispatch(closeModal());
  }
}
