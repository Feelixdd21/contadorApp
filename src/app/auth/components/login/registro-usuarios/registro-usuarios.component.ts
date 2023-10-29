import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  inicioSesion() {
    this.router.navigate(['/']);
  }
}
