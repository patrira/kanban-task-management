import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { openModal, closeModal } from '../state/ui/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class ModalShowService {
closeEditDeleteContainer() {
throw new Error('Method not implemented.');
}
onEditDeleteContainerClick() {
throw new Error('Method not implemented.');
}
  darkBackground = false;
showEditDeleteContainer: any;

  constructor(private store: Store) {}

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
