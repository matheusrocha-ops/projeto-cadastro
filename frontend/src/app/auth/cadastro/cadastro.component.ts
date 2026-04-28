import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nomeCompleto: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
    });
  }

  enviar() {
    if (this.cadastroForm.valid) {
      const novoUsuario = this.cadastroForm.value;
      this.authService.cadastrarUsuario(novoUsuario);
      this.cadastroForm.reset();
      alert('Cadastro realizado com sucesso!');
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
}
