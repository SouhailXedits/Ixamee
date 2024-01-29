'use client';
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import Image from 'next/image';

const PDFExport = ({ children, pdfName }: any) => {
  const contentRef = useRef(null);

  const exportPDF = () => {
    console.log('export');
    
    const element = contentRef.current;
    const opt = {
      margin: 0,
      filename: `${pdfName}.pdf`,
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'p' },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
      <div>
        <div className=" fixed -bottom-96">
          {/* <div ref={contentRef} style={{ padding: '20px', color: 'black' }}> */}
          {children}
        </div>
      </div>
      <button
        onClick={exportPDF}
        className=" justify-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center"
      >
        <Image src="/telechargeIcon.svg" alt="icons" width={20} height={20} />
        <p className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">Télécharger</p>
      </button>
      {/* <button>Export as PDF</button> */}
    </div>
  );
//   return (
//     <div>
//       <div>
//       <div className=" fixed -bottom-96">
//         {/* <div ref={contentRef} style={{ padding: '20px', color: 'black' }}> */}
//           {children}
//         </div>
//       </div>
//       <button
//         onClick={exportPDF}
//         className=" justify-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center"
//       >
//         <Image src="/telechargeIcon.svg" alt="icons" width={20} height={20} />
//         <p className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">Télécharger</p>
//       </button>
//       {/* <button>Export as PDF</button> */}
//     </div>
//   );
};

export default PDFExport;
