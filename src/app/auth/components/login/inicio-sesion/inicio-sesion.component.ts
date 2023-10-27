import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  inicioSesion() {
    this.router.navigate(['/dashboard']);
  }

}
