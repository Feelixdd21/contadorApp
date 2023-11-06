import { Injectable } from '@angular/core';
import { Operacion } from 'src/app/views/models/operacion.model';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  constructor() { }
  exportToExcel(operaciones: Array<Operacion>) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(operaciones);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    ws['A1'].s = { font: { bold: true } };
    for (const cellAddress in ws) {
      if (cellAddress.startsWith('A2')) {
        ws[cellAddress].s = { font: { bold: true } };
      }
    }
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    // Generar el archivo Excel y descargarlo
    XLSX.writeFile(wb, 'Operaciones.xlsx');
  }
}
