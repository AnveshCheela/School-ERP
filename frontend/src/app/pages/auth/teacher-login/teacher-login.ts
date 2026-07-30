import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './teacher-login.html',
  styleUrl: './teacher-login.scss',
})
export class TeacherLogin {
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
        this.router.navigate(['/dashboard/teacher']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }
}
