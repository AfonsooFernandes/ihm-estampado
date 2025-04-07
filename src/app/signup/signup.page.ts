import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/utilizador.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentials: FormGroup;
  passwordError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.credentials = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      morada: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  signup() {
    this.passwordError = null;
    if (this.credentials.valid) {
      const { nome, email, password, morada } = this.credentials.value;
      if (password.length < 6) {
        this.passwordError = 'Senha deve ter pelo menos 6 caracteres. Tente novamente.';
        return;
      }
      this.userService.addUser(nome, email, password, morada).subscribe(() => {
        this.router.navigate(['/login']);
      }, error => {
        console.error('Erro ao criar conta', error);
      });
    } else {
      this.markFormTouched(this.credentials);
    }
  }

  private markFormTouched(group: FormGroup) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      control.markAsTouched();
      control.markAsDirty();
    });
  }
}
