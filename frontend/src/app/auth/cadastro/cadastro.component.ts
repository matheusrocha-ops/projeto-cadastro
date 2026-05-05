import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nomeCompleto: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],

      senha: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,16}$/),
        ],
      ],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      dataNascimento: ['', [Validators.required]],
    });
  }

  async enviar() {
    if (this.cadastroForm.valid) {
      const novoUsuario = this.cadastroForm.value;

      try {
        await this.authService.cadastrarUsuario(novoUsuario);

        alert('Cadastro realizado com sucesso! Redirecionando para o login...');

        this.cadastroForm.reset();

        this.router.navigate(['/login']);
      } catch (erro: any) {
        console.error('Erro ao salvar usuário no servidor:', erro);

        if (erro.status === 409) {
          alert('Este E-mail ou CPF já está cadastrado.');
        } else {
          alert('Erro ao tentar cadastrar. Verifique se o servidor está rodando.');
        }
      }
    } else {
      this.cadastroForm.markAllAsTouched();
      alert('Por favor, preencha o formulário corretamente antes de enviar.');
    }
  }
}
