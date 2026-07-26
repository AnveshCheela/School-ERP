import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-management-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './management-login.html',
  styleUrl: './management-login.scss',
})
export class ManagementLogin {
  email: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.email.toLowerCase().includes('account')) {
      this.router.navigate(['/dashboard/accountant']);
    } else {
      // Default to superadmin
      this.router.navigate(['/dashboard/superadmin']);
    }
  }
}
