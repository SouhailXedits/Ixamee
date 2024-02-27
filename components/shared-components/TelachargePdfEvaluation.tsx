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
  const handelTelechargePdf = (userContent: any, user_id: any, userDetails: any) => {
    const exam_id = userContent[0]?.exam_id;

    const exam = userDetails.classe.exam_classe.map((item: any) => {
      return item.id === exam_id;
    });

    const examConten = userDetails?.classe.exam_classe[0]?.content;
    const UserExam = userContent[0]?.correction_exam_content;
  };

  // const
  return (
    <EvaluationPDFExportStudent
      pdfName="evaluation"
      onClick={() => {
        handelTelechargePdf(userContent, user_id, userDetails);
      }}
    >
      <Evaluation userContent={userContent} user_id={user_id} userDetails={userDetails} />
    </EvaluationPDFExportStudent>
  );
}
