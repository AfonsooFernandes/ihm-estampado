import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/utilizador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  async login() {
    const emailControl = this.credentials.get('email');
    const passwordControl = this.credentials.get('password');

    if (emailControl && passwordControl) {
      const email = emailControl.value;
      const password = passwordControl.value;

      if (email && password) {
        this.userService.getUserByEmailAndPassword(email, password).subscribe(async user => {
          if (user) {
            this.loginError = false;
            this.router.navigateByUrl('/home', { state: { userId: user.id } });
          } else {
            this.loginError = true;
            const alert = await this.alertController.create({
              header: 'Falha ao iniciar sessão',
              message: 'Email ou palavra-passe incorretos.',
              buttons: ['OK'],
            });
            await alert.present();
          }
        });
      } else {
        this.loginError = true;
        const alert = await this.alertController.create({
          header: 'Falha ao iniciar sessão',
          message: 'Email ou palavra-passe incorretos.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
