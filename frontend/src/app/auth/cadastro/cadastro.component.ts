import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  enviar() {
    console.log('Cadastrando:', this.nomeCompleto, this.senha, this.dataNascimento, this.cpf);
  }
}
