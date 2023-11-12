import { Injectable } from '@angular/core';
import { Operacion } from 'src/app/views/models/operacion.model';
import { Workbook } from 'exceljs'
import * as fs from 'file-saver';

const EXCTYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEXT = '.xlsx'
@Injectable({
  providedIn: 'root'
})
export class ExportService {
  constructor() { }
  exportToExcel(headersArray: any[], excelFilename: string, sheetnName: string, json: any[], ingresos: number, egresos: number, traspasos: number) {
    const header = headersArray;
    const data = json
    const workbook = new Workbook();
    const workShet = workbook.addWorksheet(sheetnName)
    const headerRow = workShet.addRow(header)
    headerRow.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } }
      cell.font = { size: 12, bold: true, color: { argb: 'FFFFFFFF' } }
      cell.alignment = { horizontal: 'center', vertical: 'middle' }
      workShet.getColumn(index).width = header[index - 1].length < 20 ? 25 : header[index - 1].length
    })

    // Añade filas con datos
    for (const rowData of json) {
      const model = {
        fecha: rowData.fecha,
        operacion: rowData.tipoOperacion,
        beneficiario: rowData.beneficiario,
        monto: rowData.monto,
        descripcion: rowData.descripcion,
        factura: rowData.factura
      }
      const dataRow = workShet.addRow(Object.values(model));
      dataRow.eachCell((cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } };
      });
    }

    workShet.spliceRows(workShet.rowCount + 3, 0, ['', '']);
    workShet.mergeCells(`A${workShet.rowCount - 1}:B${workShet.rowCount - 1}`);
    // Combina las celdas C y D en la nueva fila
    workShet.mergeCells(`C${workShet.rowCount - 1}:D${workShet.rowCount - 1}`);
    workShet.mergeCells(`E${workShet.rowCount - 1}:F${workShet.rowCount - 1}`);

    // Asigna un valor a la celda A de las celdas unidas
    const cabeceraIngresos = workShet.getCell(`A${workShet.rowCount - 1}`);
    cabeceraIngresos.value = 'Ingresos';
    cabeceraIngresos.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    cabeceraIngresos.font = { size: 12, bold: true }
    cabeceraIngresos.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D7D7D7' },
    }
    cabeceraIngresos.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } };


    // Asigna un valor a la celda C de las celdas unidas
    const cabeceraEgresos = workShet.getCell(`C${workShet.rowCount - 1}`);
    cabeceraEgresos.value = 'Egresos';
    cabeceraEgresos.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    cabeceraEgresos.font = { size: 12, bold: true }
    cabeceraEgresos.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D7D7D7' },
    }
    cabeceraEgresos.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } };

    const cabeceraTraspasos = workShet.getCell(`E${workShet.rowCount - 1}`);
    cabeceraTraspasos.value = 'Traspasos';
    cabeceraTraspasos.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    cabeceraTraspasos.font = { size: 12, bold: true }
    cabeceraTraspasos.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D7D7D7' },
    }
    cabeceraTraspasos.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } };
    workShet.spliceRows(workShet.rowCount + 1, 0, ['', '']);
    workShet.mergeCells(`A${workShet.rowCount - 1}:B${workShet.rowCount - 1}`);
    // Combina las celdas C y D en la nueva fila
    workShet.mergeCells(`C${workShet.rowCount - 1}:D${workShet.rowCount - 1}`);
    workShet.mergeCells(`E${workShet.rowCount - 1}:F${workShet.rowCount - 1}`);

    // Asigna un valor a la celda A de las celdas unidas
    const valorIngresos = workShet.getCell(`A${workShet.rowCount - 1}`);
    valorIngresos.value = ingresos;
    valorIngresos.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    valorIngresos.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } };


    // Asigna un valor a la celda C de las celdas unidas
    const valorEgresos = workShet.getCell(`C${workShet.rowCount - 1}`);
    valorEgresos.value = egresos;
    valorEgresos.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    valorEgresos.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } };


    const valorTraspasos = workShet.getCell(`E${workShet.rowCount - 1}`);
    valorTraspasos.value = traspasos;
    valorTraspasos.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    valorTraspasos.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } };
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: EXCTYPE });
      fs.saveAs(blob, excelFilename + EXCEXT);
    });
  }

}
