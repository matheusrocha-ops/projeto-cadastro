import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="home-container">
      <h1>Bem-vindo ao Sistema</h1>
      <p>Escolha uma opção abaixo para continuar</p>

      <div class="botoes-container">
        <button routerLink="/login" class="btn-login">Fazer Login</button>
        <button routerLink="/cadastro" class="btn-cadastro">Criar Conta</button>
      </div>
    </div>
  `,
  styles: [
    `
      .home-container {
        max-width: 500px;
        margin: 100px auto;
        text-align: center;
        background-color: #ffffff;
        padding: 50px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        border: 1px solid #eaeaea;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      h1 {
        color: #222;
        margin-top: 0;
        font-size: 28px;
      }
      p {
        color: #666;
        margin-bottom: 40px;
        font-size: 16px;
      }

      .botoes-container {
        display: flex;
        gap: 20px;
        justify-content: center;
      }

      button {
        padding: 14px 28px;
        font-size: 16px;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      button:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      .btn-login {
        background-color: #0056b3;
        color: white;
      }
      .btn-login:hover {
        background-color: #004494;
      }

      .btn-cadastro {
        background-color: #28a745;
        color: white;
      }
      .btn-cadastro:hover {
        background-color: #218838;
      }
    `,
  ],
})
export class HomeComponent {}
