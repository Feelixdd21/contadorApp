import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Operacion } from 'src/app/views/models/operacion.model';
import { ExportService } from './service/export.service'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-registro-operaciones',
  templateUrl: './registro-operaciones.component.html',
  styleUrls: ['./registro-operaciones.component.css']
})
export class RegistroOperacionesComponent implements OnInit {

  meses = [
    { nombre: 'Enero', numero: 1 },
    { nombre: 'Febrero', numero: 2 },
    { nombre: 'Marzo', numero: 3 },
    { nombre: 'Abril', numero: 4 },
    { nombre: 'Mayo', numero: 5 },
    { nombre: 'Junio', numero: 6 },
    { nombre: 'Julio', numero: 7 },
    { nombre: 'Agosto', numero: 8 },
    { nombre: 'Septiembre', numero: 9 },
    { nombre: 'Octubre', numero: 10 },
    { nombre: 'Noviembre', numero: 11 },
    { nombre: 'Diciembre', numero: 12 }
  ];

  mesSeleccionado: string = '';
  mesNumero: number = 0;
  user: string = localStorage.getItem('user')!;
  formulario: FormGroup;
  operaciones: Array<Operacion> = []
  operacionesFiltrada: Array<Operacion> = []
  operacionModel: Operacion = {
    idOperacion: 0,
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

  constructor(private fb: FormBuilder, private api: ExportService, private datePipe: DatePipe) {
    this.formulario = this.fb.group(this.operacionModel);
  }

  fechaSeleccionada(mes: any) {
    this.operacionesFiltrada = this.filterObjectsByMonth(this.operaciones, mes.numero);
    this.mesSeleccionado = mes.nombre
    this.mesNumero = mes.numero
  }

  filterObjectsByMonth(objects: Operacion[], targetMonth: number): Operacion[] {
    return objects.filter(obj => {
      const date = this.datePipe.transform(obj.fecha, 'MM-dd-yyyy');
      const objDate = new Date(date!);
      const objMonth = objDate.getMonth() + 1; // Suma 1 porque los meses se cuentan de 0 a 11
      return objMonth === targetMonth;
    });
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
    this.nextId = parseInt(localStorage.getItem('lastId')!) || 1;
  }

  nextId = 1;

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
      
      const nuevaOperacion: Operacion = {
        idOperacion: this.nextId, // Asigna el ID
        beneficiario: this.formulario.get('beneficiario')?.value,
        descripcion: this.formulario.get('descripcion')?.value,
        factura: this.formulario.get('factura')?.value,
        fecha: this.formulario.get('fecha')?.value,
        tipoOperacion: this.formulario.get('tipoOperacion')?.value,
        monto: this.formulario.get('monto')?.value
      };
  
      // Incrementar el ID para la próxima operación
      this.nextId++;
  
      // Agregar la nueva operación al arreglo de operaciones
      localStorage.setItem('lastId', this.nextId.toString());
      this.operaciones.push(nuevaOperacion);
      this.mostrarTabla = false
      localStorage.setItem('myData', JSON.stringify(this.operaciones));
      localStorage.setItem('ingresos', JSON.stringify(this.ingresos));
      localStorage.setItem('egresos', JSON.stringify(this.egresos));
      localStorage.setItem('traspasos', JSON.stringify(this.traspasos));
      if(this.operacionesFiltrada.length!=0){
        this.operacionesFiltrada = this.filterObjectsByMonth(this.operaciones, this.mesNumero);
      }
    }

  }

  exportToExcel(): void {
    this.api.exportToExcel(this.operaciones)
  }

  deletedata(idOperacion: number) {
    const index = this.operaciones.findIndex(operacion => operacion.idOperacion === idOperacion);
    if (index !== -1) { // Verifica si se encontró un elemento con ese ID
      const operacionEliminada = this.operaciones.splice(index, 1)[0];
  
      // Actualiza los totales (puedes hacer esto de manera similar a como lo haces en el método onSubmit)
      if (operacionEliminada.tipoOperacion === 'Ingreso') {
        this.ingresos -= operacionEliminada.monto;
      } else if (operacionEliminada.tipoOperacion === 'Egreso') {
        this.egresos -= operacionEliminada.monto;
      } else if (operacionEliminada.tipoOperacion === 'Traspaso') {
        this.traspasos -= operacionEliminada.monto;
      }
  
      // Guarda nuevamente los datos en localStorage
      localStorage.setItem('myData', JSON.stringify(this.operaciones));
      localStorage.setItem('ingresos', JSON.stringify(this.ingresos));
      localStorage.setItem('egresos', JSON.stringify(this.egresos));
      localStorage.setItem('traspasos', JSON.stringify(this.traspasos));
    }
  }

  editOeditperacion(idOperacion: number) {
    const index = this.operaciones.findIndex(operacion => operacion.idOperacion === idOperacion);
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
  
        // Obtén el ID de la operación antes de actualizar
        const idOperacion = operacionAnterior.idOperacion;
  
        // Actualizar la operación en el arreglo 'operaciones' sin cambiar el ID
        this.operaciones[index] = { ...updatedOperacion, idOperacion };
  
        // Sumar el monto actual después de actualizar la operación
        if (updatedOperacion.tipoOperacion === 'Ingreso') {
          this.ingresos += updatedOperacion.monto;
        } else if (updatedOperacion.tipoOperacion === 'Egreso') {
          this.egresos += updatedOperacion.monto;
        } else if (updatedOperacion.tipoOperacion === 'Traspaso') {
          this.traspasos += updatedOperacion.monto;
        }
  
        // Resto del código para guardar en localStorage
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