import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNoEncontradaComponent } from './shared/components/pagina-no-encontrada/pagina-no-encontrada.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/components/login/login.module').then(m => m.LoginModule) },
  { path: 'dashboard', loadChildren: () => import('./views/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', component: PaginaNoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
