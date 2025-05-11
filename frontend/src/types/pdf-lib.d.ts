declare module 'pdf-lib' {
  export class PDFDocument {
    static load(pdfBytes: ArrayBuffer): Promise<PDFDocument>;
    getPages(): PDFPage[];
    save(): Promise<Uint8Array>;
  }

  export class PDFPage {
    drawText(text: string, options: { x: number; y: number; size: number }): void;
  }
} 