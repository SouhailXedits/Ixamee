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
  console.log(userContent);
  console.log(user_id);
  console.log(userDetails);
  const handelTelechargePdf = (userContent: any, user_id: any, userDetails: any) => {
    console.log(userContent);
    const exam_id = userContent[0]?.exam_id;
    console.log(exam_id);
    const exam = userDetails.classe.exam_classe.map((item: any) => {
      return item.id === exam_id;
    });

    console.log(user_id);
    const examConten = userDetails?.classe.exam_classe[0]?.content;
    const UserExam = userContent[0]?.correction_exam_content;
    console.log(examConten);
    console.log(UserExam);
  };

  // const
  return (
    
    <EvaluationPDFExport
      pdfName="bulletin"
      onClick={() => {
        handelTelechargePdf(userContent, user_id, userDetails);
      }}
    >
      <Evaluation userContent={userContent}  user_id={user_id} userDetails={userDetails} />
    </EvaluationPDFExport>
  );
}
