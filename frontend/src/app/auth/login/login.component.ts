import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  erroLogin = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
  }

  async entrar() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;

      try {
        // AGORA SIM: Chamamos o servidor para validar a senha com Bcrypt
        const usuarioLogado = await this.authService.login(email, senha);

        if (usuarioLogado) {
          console.log('Login realizado com sucesso!');
          this.router.navigate(['/listagem']);
        } else {
          this.erroLogin = true;
        }
      } catch (erro) {
        console.error('Erro ao fazer login:', erro);
        this.erroLogin = true;
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
