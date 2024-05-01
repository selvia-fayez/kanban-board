import { Component } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authServ: AuthService, private router: Router) {}
  Logout() {
    this.authServ
      .logout()
      .then((res: any) => {
        this.router.navigate(['/login']);
      })
      .catch((error: any) => {
        //this.showError();
        console.log(error);
      });
  }
}
