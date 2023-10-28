import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Operacion } from 'src/app/views/models/operacion.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-registro-operaciones',
  templateUrl: './registro-operaciones.component.html',
  styleUrls: ['./registro-operaciones.component.css']
})
export class RegistroOperacionesComponent implements OnInit {

  formulario: FormGroup;
  operaciones: Array<Operacion> = []
  operacionModel: Operacion = {
    beneficiario: 'Felix',
    descripcion: 'asd',
    factura: 'asd',
    fecha: '',
    tipoOperacion: 'Ingreso',
    monto: 0
  }
  mostrarTabla: boolean = false;
  ingresos: number = 0;
  egresos: number = 0;
  traspasos: number = 0;



  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group(this.operacionModel);
  }


  ngOnInit(): void {
  }

  onSubmit() {


    if (this.formulario.valid) {
      switch (this.formulario.get('tipoOperacion')?.value) {
        case 'Ingreso':
          this.ingresos = this.ingresos + this.formulario.get('monto')?.value
          break;

        case 'Egreso':
          this.egresos = this.egresos + this.formulario.get('monto')?.value

          break;

        case 'Traspaso':
          this.traspasos = this.traspasos + this.formulario.get('monto')?.value

          break;
      }
      this.operaciones.push(this.formulario.value)
      this.mostrarTabla = false
    }
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.operaciones);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    ws['A1'].s = { pattern: { fgColor: { rgb: "FFFF0000" } } };
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    // Guarda el archivo Excel en un blob
    const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });


    // Crea un objeto URL para el blob
    const url = window.URL.createObjectURL(new Blob([blob]));

    // Crea un elemento de enlace para descargar el archivo Excel
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datos.xlsx';

    // Simula un clic en el enlace para iniciar la descarga
    a.click();

    // Limpia el objeto URL
    window.URL.revokeObjectURL(url);
  }

}
