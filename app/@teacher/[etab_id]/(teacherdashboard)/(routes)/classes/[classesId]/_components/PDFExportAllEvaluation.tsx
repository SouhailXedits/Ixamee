'use client';
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const PDFExportAllEvaluation = ({ children, pdfName }: any) => {
  const contentRef = useRef(null);

  const exportPDF = () => {
    const element = contentRef.current;
    const opt = {
      filename: `${pdfName}.pdf`,
      html2canvas: { scale: 2, useCORS: true },

      pagebreak: { mode: 'avoid-all', before: '#nextpage' },

      jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait', putTotalPages: true },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
      <div className="fixed -bottom-[999rem]">
        {/* <div className="w-full z-14"> */}
        <div ref={contentRef} style={{ padding: '20px', color: 'black' }}>
          {children}
        </div>
      </div>
      <Button
        className=" font-[600] justify-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center"
        onClick={exportPDF}
      >
        Télécharger toutes les évaluations
      </Button>
      {/* <button>Export as PDF</button> */}
    </div>
  );
};

export default PDFExportAllEvaluation;
