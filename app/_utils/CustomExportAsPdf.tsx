'use client';
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import Image from 'next/image';

const EvaluationPDFExport = ({ children, pdfName }: any) => {
  const contentRef = useRef(null);

  const exportPDF = () => {
    const element = contentRef.current;
    const opt = {
      filename: `${pdfName}.pdf`,
      html2canvas: { scale: 2, useCORS: true },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
      },
      jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait', putTotalPages: true },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      {/* <Image
        src="/evaluationsvg.svg"
        alt="evaluationsvg"
        width={20}
        height={20}
        aria-disabled={true}
        className="w-[20px] h-[20px] "
        onClick={exportPDF}
      /> */}
      <span onClick={exportPDF}>Evaluation</span>

      <div className="fixed -bottom-[999rem]">
        {/* <div className="w-full overflow-auto"> */}
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

export default EvaluationPDFExport;
