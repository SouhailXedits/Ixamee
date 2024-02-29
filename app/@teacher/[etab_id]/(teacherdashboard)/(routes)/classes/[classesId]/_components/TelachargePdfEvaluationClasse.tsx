'use client';

import Image from 'next/image';
import React, { use } from 'react';
import Evaluation from './Evaluation';
import EvaluationPDFExportStudent from '@/app/_utils/CustomExportAsPdfStudent';
import EvaluationPDFExport from '@/app/_utils/CustomExportAsPdf';
import { useQuery } from '@tanstack/react-query';
import { getUserCorrectionBySubject } from '@/actions/exam-correction';

export default function TelachargePdfEvaluationClasse({
  children,
  userContent,
  user_id,
  userDetails,
}: any) {
  console.log(userContent, 'userContent✨');
  console.log(userDetails);
  const userUSerContent = userContent.filter((item: any) => item.user_id === user_id);
  console.log(userUSerContent);

  return (
    <EvaluationPDFExport pdfName="evaluation">
      <Evaluation
        userExamCorectionContent={userUSerContent}
        user_id={user_id}
        userDetails={userDetails}
      />
    </EvaluationPDFExport>
  );
}
