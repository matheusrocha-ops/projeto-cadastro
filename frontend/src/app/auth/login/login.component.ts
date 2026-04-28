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

  entrar() {
    if (this.loginForm.valid) {
      const emailDigitado = this.loginForm.value.email;
      const senhaDigitada = this.loginForm.value.senha;

      const listaUsuarios = this.authService.obterUsuarios();

      const usuarioValido = listaUsuarios.find(
        (user: any) => user.email === emailDigitado && user.senha === senhaDigitada,
      );

      if (usuarioValido) {
        alert('Acesso Liberado! Bem-vindo(a) ' + usuarioValido.nomeCompleto);
      } else {
        this.erroLogin = true;
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
