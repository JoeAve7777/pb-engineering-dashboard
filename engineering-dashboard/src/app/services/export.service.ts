import { Injectable } from "@angular/core";

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as FileSaver from "file-saver";

@Injectable({
    providedIn: "root",
})
export class ExportService {
    constructor() {}

    ExportToPdf(title: string, fileName: string, data: any[], cols: any[]) {
        const doc = new jsPDF("p", "pt");

        doc.text(title, 40, 30);
        doc["autoTable"](cols, data);
        doc.save(fileName + ".pdf");
    }

    ExportToExcel(title: string, fileName: string, data: any[], cols: any[]) {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(data, {
                skipHeader: true,
            });

            const workbook = {
                Sheets: { MyData: worksheet },
                SheetNames: ["MyData"],
            };

            const excelBuffer: any = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            this.saveAsExcelFile(excelBuffer, fileName);
        });
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });

        FileSaver.saveAs(
            data,
            fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
    }
}

