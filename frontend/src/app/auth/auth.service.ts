import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Usuario {
  _id?: string;
  nomeCompleto: string;
  email: string;
  senha?: string;
  cpf: string;
  dataNascimento: string;
}

export interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  async cadastrarUsuario(novoUsuario: Usuario): Promise<Usuario> {
    return await firstValueFrom(this.http.post<Usuario>(this.apiUrl, novoUsuario));
  }

  async login(email: string, senha: string): Promise<LoginResponse> {
    const resposta = await firstValueFrom(
      this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, senha }),
    );

    if (resposta?.access_token) {
      localStorage.setItem('meuToken', resposta.access_token);
      localStorage.setItem('usuarioLogado', 'true');
    }

    return resposta;
  }

  async obterUsuarios(): Promise<Usuario[]> {
    console.log('AuthService.obterUsuarios token', localStorage.getItem('meuToken'));
    return await firstValueFrom(this.http.get<Usuario[]>(this.apiUrl));
  }

  async deletarUsuario(id: string): Promise<void> {
    return await firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  async atualizarUsuario(id: string, dadosAtualizados: Partial<Usuario>): Promise<Usuario> {
    return await firstValueFrom(this.http.patch<Usuario>(`${this.apiUrl}/${id}`, dadosAtualizados));
  }

  usuarioEstaLogado(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('usuarioLogado');
    }
    return false;
  }

  logout() {
    localStorage.removeItem('meuToken');
    localStorage.removeItem('usuarioLogado');
    window.location.href = '/';
  }
}
