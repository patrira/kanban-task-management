import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../modals/boards.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) {}

 
  getTasks(boardId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`/api/boards/${boardId}/tasks`);
  }
}
