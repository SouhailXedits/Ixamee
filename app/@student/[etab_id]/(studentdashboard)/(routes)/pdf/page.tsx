'use client';
import React, { useRef } from 'react';
import { MarkSheetPdfClass } from './components/MarkSheetTeacher';
import PDFExport from '@/app/_utils/ExportAsPdf';
import Test from './components/Test';
import Table from './components/Table';
import DevoirSyntheseN2 from './components/TableBul';

function page() {
  return (
    <>
      <PDFExport pdfName="bulletin">
        {/* <MarkSheetPdfClass /> */}
        {/* <p>souhal</p> */}
    <MarkSheetPdfClass />
      </PDFExport>
    </>
  );
}

export default page;
