import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  mensaje = "Bienvenido";
  mostrarImagen: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mostrarImagen = this.deberiaMostrarImagen(event.url);
      }
    });
   }

  ngOnInit(): void {
  }

  private deberiaMostrarImagen(url: string): boolean {
    // Lógica para determinar si la imagen debe mostrarse en función de la ruta
    return url === '/dashboard';
  }
}
