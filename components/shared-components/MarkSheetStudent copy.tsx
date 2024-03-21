import React from 'react';
import data from './fakeMarkSheetsData';
import StudentRow from './StudentRow';
import PdfHeader from '@/components/shared-components/PdfHeader';

export type Term = {
  trimester1: {
    exams: {};
  };
};

export type MarkSheetStudentProps = {
  data: {
    terms: Term[];
  };
};

const MarkSheetStudent: React.FC<MarkSheetStudentProps> = ({ data }) => {
  return (
    <div>
      <PdfHeader
        meta={{
          estab: 'Lycée Privé Élite Nabeul',
          heading: 'Bulletin de notes',
          session: '2023-2024',
          term: {
            type: 'Trimester',
            number: 2,
          },
          classe: 'Bac math 2',
          fullName: 'souhail brahmi',
          teacherName: 'firas latrach',
          range: 1,
          average: 15.57,
        }}
        type="MSStudent"
      />
      {data.terms.map((term, index) => (
        <StudentRow key={index} termData={term} />
      ))}
    </div>
  );
};

export default MarkSheetStudent;


import React from 'react';

export type StudentRowProps = {
  termData: any;
};

const StudentRow: React.FC<StudentRowProps> = ({ termData }) => {
  return (
    <tr>
      {/* Add your row content here */}
    </tr>
  );
};

export default StudentRow;
