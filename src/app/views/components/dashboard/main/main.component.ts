import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
declare var anime: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  mensaje = "¡Bienvenido!";
  mostrarImagen: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mostrarImagen = this.deberiaMostrarImagen(event.url);
      }
    });
  }
  ngAfterViewInit(): void {
    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml13');
    textWrapper!.innerHTML = textWrapper!.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
      .add({
        targets: '.ml13 .letter',
        translateY: [100, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el: any, i: number) => 300 + 30 * i
      })
  }

  ngOnInit(): void {
  }

  private deberiaMostrarImagen(url: string): boolean {
    // Lógica para determinar si la imagen debe mostrarse en función de la ruta
    return url === '/dashboard';
  }
}
