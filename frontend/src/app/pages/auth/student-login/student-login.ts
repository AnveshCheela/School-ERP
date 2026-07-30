import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './student-login.html',
  styleUrl: './student-login.scss',
})
export class StudentLogin {
  username = '';
  password = '';
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.errorMessage = '';
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard/student']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }
}
