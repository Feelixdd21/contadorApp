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
  mostrarBotonGuardar: boolean= false;
  ingresos: number = 0;
  egresos: number = 0;
  traspasos: number = 0;
  editingIndex?: number = 0;


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
  
    // También puedes guardar el índice del elemento que se está editando para actualizarlo más tarde
    this.editingIndex = index;
  }
  
  update() {
    if (this.formulario.valid) {
      const updatedOperacion = this.formulario.value;
      const index = this.editingIndex;
      this.mostrarBotonGuardar = true;
      this.mostrarTabla= false
      
      if (index !== undefined && index >= 0) {
        this.operaciones[index] = updatedOperacion;
        this.formulario.reset();
        this.editingIndex = undefined;
      }
}
  }
}
