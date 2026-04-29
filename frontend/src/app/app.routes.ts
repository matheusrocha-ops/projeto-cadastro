import { Routes } from '@angular/router';
import { CadastroComponent } from './auth/cadastro/cadastro.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './auth/home.component';
import { ListagemComponent } from './auth/listagem.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'listagem', component: ListagemComponent },
  { path: '**', redirectTo: '' },
];
