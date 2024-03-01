'use client';
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const EvaluationPDFExportStudent = ({ children, pdfName }: any) => {
  const contentRef = useRef(null);

  const exportPDF = () => {
    const element = contentRef.current;
    const opt = {
      filename: `${pdfName}.pdf`,
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    // html2pdf(element).set(opt)
    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      <Button
        name="bnt"
        className="flex text-xs underline items-center gap-2  text-[#1B8392] bg-transparent "
        onClick={exportPDF}
      >
        Fiche
        <Image src="/expand-icon-white.svg" alt="expand icon" height={16} width={16} />
      </Button>

      {/* <div className="fixed -bottom-[999rem]"> */}
        <div>
        <div ref={contentRef} style={{ padding: '20px', color: 'black' }}>
          {children}
        </div>
      </div>
      {/* <button onClick={exportPDF} className=""> */}

      {/* </button> */}
      {/* <button>Export as PDF</button> */}
    </>
  );
};

export default EvaluationPDFExportStudent;
