import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ChatComponent } from './chat/chat.component';
import { CargaArchivosComponent } from './carga-archivos/carga-archivos.component';
import { RegistroOperacionesComponent } from './registro-operaciones/registro-operaciones.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NbButtonModule, NbCardModule, NbChatModule, NbLayoutModule, NbThemeModule, NbUserModule } from '@nebular/theme';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    HomePageComponent,
    ChatComponent,
    CargaArchivosComponent,
    RegistroOperacionesComponent,
    NavbarComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbCardModule,
    NbLayoutModule,
    NbUserModule,
    NbChatModule,
    NbThemeModule.forRoot({name:'coporate'}),
    NbButtonModule,
    FormsModule
],providers:[DatePipe]
})
export class DashboardModule { }
