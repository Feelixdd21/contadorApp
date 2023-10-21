import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';

const routes: Routes = [
  { path: '', component: InicioSesionComponent },
  { path: 'recover-pass', component: RecuperarContrasenaComponent },
  { path: 'register', component: RegistroUsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
