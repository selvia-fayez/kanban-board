import { Component } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private authServ: AuthService,
    private router: Router
  ) // private messageService: MessageService
  {}

  err: any;
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+@[a-z]+(.com)$/),
    ]),
    password: new FormControl('', [Validators.required]),
    // image: new FormControl('', [Validators.required]),
  });
  register(registerForm: FormGroup) {
    this.authServ
      .register(registerForm.value)
      .then((res: any) => {
        this.isLoading = false;
        this.router.navigate(['/login']);
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

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   this.registerForm.patchValue({ image: file });
  // }

  // register(registerForm: any) {
  //   if (registerForm.valid) {
  //     this.authServ
  //       .register(this.registerForm.value)
  //       .then(() => {
  //         console.log('User signed up successfully!');
  //         this.isLoading = false;
  //         this.router.navigate(['/login']);
  //       })
  //       .catch((error) => {
  //         console.error('Error signing up:', error);
  //         this.isLoading = false;
  //         this.err = error;
  //         // this.showError();
  //       });
  //   }
}
