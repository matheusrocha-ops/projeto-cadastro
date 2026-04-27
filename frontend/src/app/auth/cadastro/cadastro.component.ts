import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: true,
  imports: [FormsModule],
})
export class CadastroComponent {
  nomeCompleto = '';
  email = '';
  senha = '';
  dataNascimento = '';
  cpf = '';

cadastroForm!: FormGroup;
ngOnInit() {
  this.cadastroForm = this.fb.group({
    nomeCompleto: ['', [Validators.required]]
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.senha]],
    cpf: ['', [Validators.required, Validators.cpf]]
    dataNascimento: ['', [Validators.required, Validators.dataNascimento]]
  });
}

  constructor(private fb: FormBuilder) {}

  enviar() {
    console.log('Cadastrando:', this.nomeCompleto, this.senha, this.dataNascimento, this.cpf);
  }
}
