'use client';
import React, { useRef } from 'react';
import PDFExport from '@/app/_utils/ExportAsPdf';
import MarkSheetStudent from './components/MarkSheetStudent';

function Page() {
  const pdfRef = useRef(null);

  const exportAsPdf = () => {
    if (pdfRef.current) {
      pdfRef.current.exportAsPdf();
    }
  };

  return (
    <div ref={pdfRef}>
      <MarkSheetStudent />
      <button onClick={exportAsPdf}>Export as PDF</button>
    </div>
  );
}

export default Page;

