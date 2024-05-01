import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authServ: AuthService,
    private router: Router,
    // private messageService: MessageService
  ) {}

  err: any;
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+@[a-z]+(.com)$/),
    ]),
    password: new FormControl('', [Validators.required]),
  });
  login(loginForm: FormGroup) {
    this.authServ
      .login(loginForm.value)
      .then((res: any) => {
        this.isLoading = false;
        this.router.navigate(['/tasks']);
      })
      .catch((error: any) => {
        this.isLoading = false;
        this.err = error;
        // this.showError();
      });
  }

  // showError() {
  //   this.messageService.add({
  //     severity: 'error',
  //     summary: 'Error',
  //     detail: this.err,
  //   });
  // }
}
