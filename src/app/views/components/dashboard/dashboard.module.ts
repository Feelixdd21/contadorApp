import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ChatComponent } from './chat/chat.component';
import { CargaArchivosComponent } from './carga-archivos/carga-archivos.component';
import { RegistroOperacionesComponent } from './registro-operaciones/registro-operaciones.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ChatComponent,
    CargaArchivosComponent,
    RegistroOperacionesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
