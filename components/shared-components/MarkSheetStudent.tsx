import React from 'react';
import PdfHeader from '@/components/shared-components/PdfHeader';
import { calculateAverageMark } from '@/app/_utils/calculateAverage';

type Term = {
  name: string;
  exams: Array<{
    exam_id: string;
    name: string;
    coefficient: number;
    marksObtained: number;
    totalScore: number;
    range: number;
  }>;
};

type Meta = {
  estab: string;
  heading: string;
  session: string;
  term: {
    type: string;
    number: number;
  };
  subject: string;
  classe: string;
  fullName: string;
  teacherName: string;
  range: number;
  average: number;
};

type Props = {
  data: Array<Term>;
  meta: Meta;
};

export const MarkSheetStudent = ({ data, meta }: Props) => {
  const calculateAverageMark = (terms: Array<Term>) => {
    const totalCoefficient = terms.reduce((acc, term) => {
      return acc + term.exams.reduce((acc, exam) => acc + exam.coefficient, 0);
    }, 0);

    const totalObtainedMarks = terms.reduce((acc, term) => {
      return acc + term.exams.reduce((acc, exam) => acc + exam.marksObtained, 0);
    }, 0);

    const totalPossibleMarks = terms.reduce((acc, term) => {
      return acc + term.exams.reduce((acc, exam) => acc + exam.totalScore, 0);
    }, 0);

    return (totalObtainedMarks / totalPossibleMarks) * totalCoefficient;
  };

  const getRangeColor = (range: number) => {
    if (range <= 3) {
      return 'bg-red-500';
    } else if (range <= 6) {
      return 'bg-orange-500';
    } else {
      return 'bg-green-500';
    }
  };

  return (
    <div>
      <PdfHeader
        meta={{
          ...meta,
          heading: 'Bulletin de notes',
          session: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
        }}
        type="MSStudent"
      />
      <div className="flex justify-center">
        <div className="flex flex-col gap-10 ">
          {data.map((term: Term, index: number) => (
            <div className="flex flex-col gap-5 " key={index}>
              <h2>{term.name}</h2>

              <table className=" text-center w-[700px] border border-black/50 ">
                <thead className="text-white">
                  <td className="bg-[#99C6D3] pb-4">Examen</td>
                  <td className="border border-black/50 bg-[#99C6D3] pb-4">Coefficient</td>
                  <td className="border border-black/50 bg-[#99C6D3] pb-4">Note</td>
                  <td className="border bg-[#99C6D3] border-black/50 pb-4">Rang</td>
                  <td className="border bg-[#99C6D3] border-black/50 pb-4">Progrès</td>
                </thead>
                <tbody>
                  {term.exams?.map((exam: any) => (
                    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} key={exam.exam_id}>
                      <td className="pb-4 border border-black/50">{exam.name}</td>
                      <td className="pb-4 border border-black/50">{exam.coefficient}</td>
                      <td className="pb-4 border border-black/50">
                        {exam.marksObtained} / {exam.totalScore}
                      </td>
                      <td className={`pb-4 border border-black/50 ${getRangeColor(exam.range)}`}>
                        {exam.range}
                      </td>
                      <td className="pb-4 border
