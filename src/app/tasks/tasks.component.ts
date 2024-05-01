import { Component } from '@angular/core';
import { TaskService } from '../services/task/task.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  visibleAddDialog: boolean = false;
  visibleEditDialog: boolean = false;
  visibleDeleteDialog: boolean = false;
  tasks: any;
  taskerr: any;
  statuses = ['Todo', 'Inprogress', 'Done'];
  draggedTask: any;
  selectedTaskId: any;
  DeletedTitle: any;

  constructor(private taskService: TaskService) {}
  ngOnInit() {
    this.getTasks();
  }
  getStatusColor(status: string): string {
    switch (status) {
      case 'Todo':
        return 'rgb(240, 127, 86)';
      case 'Inprogress':
        return 'rgb(67, 67, 243)';
      case 'Done':
        return 'rgb(77, 214, 77)';
      default:
        return 'white';
    }
  }
  //darg and drop
  allowDrop(event: any) {
    event.preventDefault();
  }
  onDragStart(event: any, task: any) {
    this.draggedTask = task;
  }
  onDrop(event: any, status: any) {
    event.preventDefault();
    this.draggedTask.status = status;
    this.taskService
      .updateTask(this.draggedTask.taskId, this.draggedTask)
      .then(() => {
        this.getTasks();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  // onTaskDrop(
  //   event: CdkDragDrop<any[]>,
  //   newStatus: 'Todo' | 'Inprogress' | 'Done'
  // ) {
  //   console.log(event.previousContainer.data);
  //   console.log(event.container.data);
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //     // const taskId = event.container.data[event.currentIndex].taskId;
  //     // await this.taskService.updateTaskStatus(taskId, newStatus);
  //   }
  // }

  //get tasks
  getTasks() {
    this.taskService.getTasks().then((value) => {
      this.tasks = value;
    });
  }

  //add new task
  showAddDialog() {
    this.visibleAddDialog = true;
    this.taskerr = '';
  }
  addTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    duedate: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/),
    ]),
  });
  addTask(taskForm: FormGroup) {
    this.taskService
      .addTask(taskForm.value)
      .then((task) => {
        this.getTasks();
        this.addTaskForm.reset();
        this.visibleAddDialog = false;
      })
      .catch((error) => {
        this.taskerr = error;
      });
  }

  //delete task
  showDeleteDialog(task: any) {
    this.visibleDeleteDialog = true;
    this.selectedTaskId = task.taskId;
    this.DeletedTitle = task.title;
  }
  deleteTask() {
    this.taskService
      .deleteTask(this.selectedTaskId)
      .then(() => {
        this.getTasks();
        this.visibleDeleteDialog = false;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
