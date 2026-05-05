import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, Usuario } from './auth.service';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './listagem.html',
  styleUrl: './listagem.css',
})
export class ListagemComponent implements OnInit {
  usuariosNaTela: Usuario[] = [];

  exibirModal = false;
  formEdicao!: FormGroup;
  idUsuarioSendoEditado: string | null = null;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {
    this.formEdicao = this.fb.group({
      nomeCompleto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    });
  }

  async ngOnInit() {
    await this.carregarUsuarios();
  }

  async carregarUsuarios() {
    try {
      const dados = await this.authService.obterUsuarios();
      this.usuariosNaTela = dados;
      this.cdr.detectChanges();
    } catch (erro) {
      console.error('Erro ao buscar:', erro);
    }
  }

  abrirModal(usuario: Usuario) {
    if (!usuario._id) return;

    this.idUsuarioSendoEditado = usuario._id;
    this.exibirModal = true;
    this.formEdicao.patchValue({
      nomeCompleto: usuario.nomeCompleto,
      email: usuario.email,
      cpf: usuario.cpf,
      dataNascimento: usuario.dataNascimento,
    });
  }

  fecharModal() {
    this.exibirModal = false;
    this.idUsuarioSendoEditado = null;
  }

  async salvarEdicao() {
    if (this.formEdicao.valid && this.idUsuarioSendoEditado) {
      try {
        await this.authService.atualizarUsuario(this.idUsuarioSendoEditado, this.formEdicao.value);
        this.fecharModal();
        await this.carregarUsuarios(); // Recarrega a lista
        alert('Usuário atualizado com sucesso!');
      } catch (erro) {
        alert('Erro ao atualizar usuário.');
      }
    }
  }

  async excluir(id: string | undefined) {
    if (!id) return;
    if (confirm('Deseja realmente excluir?')) {
      try {
        await this.authService.deletarUsuario(id);
        this.usuariosNaTela = this.usuariosNaTela.filter((u) => u._id !== id);
        this.cdr.detectChanges();
      } catch (erro) {
        alert('Erro ao excluir.');
      }
    }
  }
}
