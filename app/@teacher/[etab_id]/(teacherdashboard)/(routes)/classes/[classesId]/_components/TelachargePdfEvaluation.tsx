'use client';
import EvaluationPDFExport from '@/app/_utils/CustomExportAsPdf';
import Image from 'next/image';
import React, { use } from 'react';
import Evaluation from './Evaluation';

export default function TelachargePdfEvaluation({
  children,
  userContent,
  user_id,
  userDetails,
}: any) {
  // const
  return (
    <EvaluationPDFExport pdfName="bulletin">
      <Evaluation userContent={userContent} user_id={user_id} userDetails={userDetails} />
    </EvaluationPDFExport>
  );
}
