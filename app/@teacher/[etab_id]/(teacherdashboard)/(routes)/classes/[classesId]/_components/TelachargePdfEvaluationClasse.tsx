'use client';

import Image from 'next/image';
import React, { use } from 'react';
import Evaluation from './Evaluation';
import EvaluationPDFExportStudent from '@/app/_utils/CustomExportAsPdfStudent';
import EvaluationPDFExport from '@/app/_utils/CustomExportAsPdf';
import { useQuery } from '@tanstack/react-query';
import { getUserCorrectionBySubject } from '@/actions/exam-correction';

export default function TelachargePdfEvaluationClasse({ userContent, user_id, userDetails }: any) {
  const userUserContent = userContent.filter((item: any) => item.user_id === user_id);

  return (
    userUserContent.length > 0 && (
      <EvaluationPDFExport pdfName="evaluation">
        <Evaluation
          userExamCorectionContent={userUserContent}
          user_id={user_id}
          userDetails={userDetails}
        />
      </EvaluationPDFExport>
    )
  );
}
