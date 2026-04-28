import { Injectable } from '@angular/core';

export interface Usuario {
  nomeCompleto: string;
  email: string;
  senha?: string;
  cpf: string;
  dataNascimento: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarios: any[] = [];

  constructor() {}

  cadastrarUsuario(novoUsuario: any) {
    this.usuarios.push(novoUsuario);
    console.log('Cofre: Novo usuário recebido!', this.usuarios);
  }

  obterUsuarios(): any[] {
    return this.usuarios;
  }
}
