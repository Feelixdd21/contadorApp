import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';


@NgModule({
  declarations: [
    InicioSesionComponent,
    RecuperarContrasenaComponent,
    RegistroUsuariosComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
