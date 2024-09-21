import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { openModal, closeModal } from '../state/ui/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class ModalShowService {
  darkBackground = false;
  showEditDeleteContainer = false;
  showTaskModal: boolean = false;
  showEditTaskModal: boolean = false;
  showCreateTaskModal: boolean = false;
  showDeleteBoardModal: boolean = false;
  showDeleteTaskModal: boolean = false;
  showCreatedBoardModal: boolean = false;
  showEditBoardModal: boolean = false;

  constructor(private store: Store) {}

  closeEditDeleteContainer() {
    this.showEditDeleteContainer = false;
  }

  onEditDeleteContainerClick() {
    this.showEditDeleteContainer = !this.showEditDeleteContainer;
  }

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

  closeModal() {
    this.darkBackground = false;
    this.showEditDeleteContainer = false;
    this.store.dispatch(closeModal());
  }
}
