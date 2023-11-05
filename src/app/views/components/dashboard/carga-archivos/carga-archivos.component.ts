import { Component, OnInit } from '@angular/core';
import { CargaService } from './services/carga.service';

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './carga-archivos.component.html',
  styleUrls: ['./carga-archivos.component.css']
})
export class CargaArchivosComponent implements OnInit {

  constructor(private api: CargaService) { }

  ngOnInit(): void {
    this.api.obtenerLista().subscribe(data => {
      console.log(data);

    })
  }

}
