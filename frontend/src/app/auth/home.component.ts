import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-wrapper">
      <div class="home-container">
        <h1>Bem-vindo ao Sistema</h1>
        <p>Escolha uma das opções abaixo para gerenciar os usuários.</p>

        <div class="home-acoes">
          <ng-container *ngIf="!logado">
            <a routerLink="/login" class="btn-home login">Fazer Login</a>
            <a routerLink="/cadastro" class="btn-home cadastro">Criar Conta</a>
          </ng-container>

          <ng-container *ngIf="logado">
            <a routerLink="/listagem" class="btn-home listagem">Painel de Usuários</a>
            <button (click)="sair()" class="btn-home logout">Sair do Sistema</button>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .home-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        font-family: sans-serif;
      }
      .home-container {
        background: white;
        padding: 50px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        text-align: center;
        width: 400px;
      }
      .home-acoes {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 30px;
      }
      .btn-home {
        padding: 15px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        border: none;
        cursor: pointer;
        transition: 0.3s;
        font-size: 1rem;
      }
      .login {
        background: #3498db;
        color: white;
      }
      .cadastro {
        background: #2ecc71;
        color: white;
      }
      .listagem {
        background: #f1c40f;
        color: #2c3e50;
      }
      .logout {
        background: #95a5a6;
        color: white;
        margin-top: 10px;
      }
      .btn-home:hover {
        opacity: 0.8;
        transform: scale(1.02);
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  logado: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.logado = this.authService.usuarioEstaLogado();
    console.log('Status do login na Home:', this.logado);
  }

  sair() {
    this.authService.logout();
    this.logado = false;
  }
}
