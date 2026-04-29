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

  // 1. CADASTRAR
  async cadastrarUsuario(novoUsuario: Usuario): Promise<any> {
    return await firstValueFrom(this.http.post(this.apiUrl, novoUsuario));
  }

  // 2. LOGIN (Atualizado para salvar a sessão)
  async login(email: string, senha: string): Promise<any> {
    const resposta = await firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/login`, { email, senha }),
    );

    // Se o login der certo, guardamos uma marca no navegador
    if (resposta) {
      localStorage.setItem('usuarioLogado', 'true');
    }

    return resposta;
  }

  // 3. LISTAR
  async obterUsuarios(): Promise<Usuario[]> {
    return await firstValueFrom(this.http.get<Usuario[]>(this.apiUrl));
  }

  // 4. DELETAR
  async deletarUsuario(id: string): Promise<any> {
    return await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
  }

  // 5. ATUALIZAR
  async atualizarUsuario(id: string, dadosAtualizados: Partial<Usuario>): Promise<any> {
    return await firstValueFrom(this.http.patch(`${this.apiUrl}/${id}`, dadosAtualizados));
  }

  // --- NOVAS FUNÇÕES DE CONTROLE DE SESSÃO ---

  // Verifica se existe a marca de login no navegador
  usuarioEstaLogado(): boolean {
    if (typeof window !== 'undefined') {
      // Garante que o código está rodando no navegador
      return !!localStorage.getItem('usuarioLogado');
    }
    return false;
  }

  // Limpa a sessão e desloga o usuário
  logout() {
    localStorage.removeItem('usuarioLogado');
    // Opcional: Redirecionar para home ou recarregar
    window.location.href = '/';
  }
}
