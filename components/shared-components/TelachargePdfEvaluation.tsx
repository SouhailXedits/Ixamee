'use client';

import Image from 'next/image';
import React, { use } from 'react';
import Evaluation from './Evaluation';
import EvaluationPDFExportStudent from '@/app/_utils/CustomExportAsPdfStudent';

export default function TelachargePdfEvaluation({
  children,
  userContent,
  user_id,
  userDetails,
}: any) {

  return (
    <EvaluationPDFExportStudent pdfName="evaluation">
      <Evaluation
        userExamCorectionContent={userContent}
        user_id={user_id}
        userDetails={userDetails}
      />
    </EvaluationPDFExportStudent>
  );
}
