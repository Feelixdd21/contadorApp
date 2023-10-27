import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistroOperacionesComponent } from './registro-operaciones/registro-operaciones.component';
import { ChatComponent } from './chat/chat.component';
import { CargaArchivosComponent } from './carga-archivos/carga-archivos.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'registro-operaciones', component: RegistroOperacionesComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'carga-archivos', component: CargaArchivosComponent },
      { path: 'dashboard', component: HomePageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
