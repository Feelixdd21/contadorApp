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

  user: string = localStorage.getItem('user')!;
  formulario: FormGroup;
  operaciones: Array<Operacion> = []
  operacionModel: Operacion = {
    beneficiario: 'Felix',
    descripcion: 'Valdes',
    factura: '1234XXX',
    fecha: '2023-11-01',
    tipoOperacion: 'Ingreso',
    monto: 1.0000
  }
  mostrarTabla: boolean = false;
  mostrarBotonGuardar: boolean = false;
  ingresos: number = 0;
  egresos: number = 0;
  traspasos: number = 0;
  editingIndex?: number = 0;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group(this.operacionModel);
  }


  ngOnInit(): void {
    if (localStorage.getItem('myData') != null) {
      this.operaciones = JSON.parse(localStorage.getItem('myData')!);

    }
    if (localStorage.getItem('ingresos') != null) {
      this.ingresos = JSON.parse(localStorage.getItem('ingresos')!);

    }
    if (localStorage.getItem('egresos') != null) {
      this.egresos = JSON.parse(localStorage.getItem('egresos')!);

    }
    if (localStorage.getItem('traspasos') != null) {
      this.traspasos = JSON.parse(localStorage.getItem('traspasos')!);

    }
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
      localStorage.setItem('myData', JSON.stringify(this.operaciones));
      localStorage.setItem('ingresos', JSON.stringify(this.ingresos));
      localStorage.setItem('egresos', JSON.stringify(this.egresos));
      localStorage.setItem('traspasos', JSON.stringify(this.traspasos));
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
  deletedata(index: number) {
    const operacion = this.operaciones[index];
    const monto = operacion.monto;

    if (operacion.tipoOperacion === 'Egreso') {
      this.egresos -= monto;
    } else if (operacion.tipoOperacion === 'Traspaso') {
      this.traspasos -= monto;
    } else {
      this.ingresos -= monto;
    }
    this.operaciones.splice(index, 1);
    localStorage.setItem('myData', JSON.stringify(this.operaciones));
    localStorage.setItem('ingresos', JSON.stringify(this.ingresos));
    localStorage.setItem('egresos', JSON.stringify(this.egresos));
    localStorage.setItem('traspasos', JSON.stringify(this.traspasos));

  }

  editOeditperacion(index: number) {
    const operacion = this.operaciones[index];
    this.mostrarTabla = true;
    this.mostrarBotonGuardar = true;

    // Cargar los datos de la operación en el formulario
    this.formulario.patchValue({
      fecha: operacion.fecha,
      tipoOperacion: operacion.tipoOperacion,
      beneficiario: operacion.beneficiario,
      monto: operacion.monto,
      descripcion: operacion.descripcion,
      factura: operacion.factura,
    });
    localStorage.setItem('myData', JSON.stringify(this.operaciones));
    localStorage.setItem('ingresos', JSON.stringify(this.ingresos));
    localStorage.setItem('egresos', JSON.stringify(this.egresos));
    localStorage.setItem('traspasos', JSON.stringify(this.traspasos));
    // También puedes guardar el índice del elemento que se está editando para actualizarlo más tarde
    this.editingIndex = index;
  }

  update() {
    if (this.formulario.valid) {
      const updatedOperacion = this.formulario.value;
      const index = this.editingIndex;
      this.mostrarBotonGuardar = false;
      this.mostrarTabla = false;

      if (index !== undefined && index >= 0) {
        // Restar el monto anterior antes de actualizar la operación
        const operacionAnterior = this.operaciones[index];
        const montoAnterior = operacionAnterior.monto;

        if (operacionAnterior.tipoOperacion === 'Ingreso') {
          this.ingresos -= montoAnterior;
        } else if (operacionAnterior.tipoOperacion === 'Egreso') {
          this.egresos -= montoAnterior;
        } else if (operacionAnterior.tipoOperacion === 'Traspaso') {
          this.traspasos -= montoAnterior;
        }

        // Actualizar la operación en el arreglo 'operaciones'
        this.operaciones[index] = updatedOperacion;

        // Sumar el monto actual después de actualizar la operación
        if (updatedOperacion.tipoOperacion === 'Ingreso') {
          this.ingresos += updatedOperacion.monto;
        } else if (updatedOperacion.tipoOperacion === 'Egreso') {
          this.egresos += updatedOperacion.monto;
        } else if (updatedOperacion.tipoOperacion === 'Traspaso') {
          this.traspasos += updatedOperacion.monto;
        }
        localStorage.setItem('myData', JSON.stringify(this.operaciones));
        localStorage.setItem('ingresos', JSON.stringify(this.ingresos));
        localStorage.setItem('egresos', JSON.stringify(this.egresos));
        localStorage.setItem('traspasos', JSON.stringify(this.traspasos));
        this.formulario.reset();
        this.editingIndex = undefined;
      }
    }
  }
}