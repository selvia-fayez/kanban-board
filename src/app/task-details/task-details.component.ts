import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task/task.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent {
  tasks: any;
  task: any;
  taskId: any;
  visibleEditDialog: boolean = false;
  taskerr: any;
  statuses = ['Todo', 'Inprogress', 'Done'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
  ) {}
  ngOnInit(): void {
    let { id } = this.activatedRoute.snapshot.params;
    this.taskId = id;
    this.getTask();
  }

  //get task
  getTask() {
    this.taskService.getTasks().then((value) => {
      this.tasks = value;
      this.task = this.tasks.find((task: any) => task.taskId == this.taskId);
      console.log(this.task);
    });
  }

  //update task
  editTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    duedate: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/),
    ]),
  });
  showEditDialog(task: any) {
    this.visibleEditDialog = true;
    this.taskerr = '';
    this.task = task;
    this.editTaskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
      duedate: task.duedate,
    });
  }
  editTask(editTaskForm: FormGroup) {
    this.taskService
      .updateTask(this.task.taskId, editTaskForm.value)
      .then(() => {
        this.getTask();
        this.editTaskForm.reset();
        this.visibleEditDialog = false;
      })
      .catch((error) => {
        this.taskerr = error;
      });
  }
  markAsDone() {
    this.taskService
      .updateTask(this.taskId, { ...this.task, status: 'Done' })
      .then(() => {
        this.getTask();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
