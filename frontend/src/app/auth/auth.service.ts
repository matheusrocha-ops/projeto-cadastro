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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  async cadastrarUsuario(novoUsuario: Usuario): Promise<any> {
    return await firstValueFrom(this.http.post(this.apiUrl, novoUsuario));
  }

  async login(email: string, senha: string): Promise<any> {
    const resposta = await firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/login`, { email, senha }),
    );

    if (resposta) {
      localStorage.setItem('usuarioLogado', 'true');
    }

    return resposta;
  }

  async obterUsuarios(): Promise<Usuario[]> {
    return await firstValueFrom(this.http.get<Usuario[]>(this.apiUrl));
  }

  async deletarUsuario(id: string): Promise<any> {
    return await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
  }

  async atualizarUsuario(id: string, dadosAtualizados: Partial<Usuario>): Promise<any> {
    return await firstValueFrom(this.http.patch(`${this.apiUrl}/${id}`, dadosAtualizados));
  }

  usuarioEstaLogado(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('usuarioLogado');
    }
    return false;
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '/';
  }
}
