'use client';
import React, { useRef } from 'react';
import { MarkSheetPdfClass } from './components/MarkSheet';
import PDFExport from '@/app/_utils/ExportAsPdf';
import Test from './components/Test';

function page() {
  return (
    <PDFExport pdfName="bulletin">
      <MarkSheetPdfClass />
    </PDFExport>
  );
}

export default page;
