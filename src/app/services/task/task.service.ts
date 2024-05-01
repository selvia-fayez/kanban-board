import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {}
  getTasks() {
    return new Promise((resolve, reject) => {
      this.db
        .list<any>('tasks')
        .valueChanges()
        .subscribe((value) => {
          resolve(value);
        });
    });
  }

  addTask(task: any) {
    const taskId = this.db.list('/tasks').push({}).key;
    return new Promise<void>((resolve, reject) => {
      this.db
        .list<any>('tasks')
        .push({ ...task, taskId: taskId })
        .then((obj) => {
          // console.log(obj.key);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateTask(taskId: string, newTask: any) {
    return new Promise<void>((resolve, reject) => {
      this.db
        .list<any>('tasks', (ref) => ref.orderByChild('taskId').equalTo(taskId))
        .snapshotChanges()
        .subscribe((tasks) => {
          tasks.forEach((task) => {
            const docId = task.payload.key;
            this.db
              .object<any>(`/tasks/${docId}`)
              .update(newTask)
              .then(() => {
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          });
        });
    });
  }
  deleteTask(taskId: string) {
    // return this.db.object<any>('tasks').remove();
    return new Promise<void>((resolve, reject) => {
      this.db
        .list<any>('tasks', (ref) => ref.orderByChild('taskId').equalTo(taskId))
        .snapshotChanges()
        .subscribe((tasks) => {
          tasks.forEach((task) => {
            const docId = task.payload.key;
            this.db
              .object<any>(`/tasks/${docId}`)
              .remove()
              .then(() => {
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          });
        });
    });
  }
}
