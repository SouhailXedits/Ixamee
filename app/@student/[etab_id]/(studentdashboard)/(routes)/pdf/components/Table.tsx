import React from 'react';
import styled from 'styled-components';

const css = styled.css`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #ccc;
`;

const StudentCell = styled.div`
  display: flex;
  width: 125fr;
  height: 46px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0px 0px 0px 5px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
`;

const GradeCell = styled.div`
  display: flex;
  width: 145fr;
  height: 22px;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) => (props.index % 2 === 0 ? '#f9f9f9' : '#fff')};
  border: 1px solid #ccc;
`;

const GradeNoteCell = styled.div`
  flex: 1;
  align-self: stretch;
  margin-top: -0.25px;
  font-family: Poppins-Regular;
  font-weight: 400;
  color: #000;
  font-size: 10px;
  text-align: center;
  letter-spacing: 0;
  line-height: 18px;
`;

const GradeRankCell = styled(GradeNoteCell)``;

const fakeData = [
  {
    student: 'John Doe',
    grades: [
      { assignment: 'Devoir de contrôle N°1', note: 12, rank: 5 },
      { assignment: 'Devoir de contrôle N°2', note: 8.5, rank: 18 },
      { assignment: 'Devoir de synthèse N°1', note: 10.75, rank: 23 },
    ],
  },
  // Add more fake data as needed
];

interface TableProps {
  data: typeof fakeData[0];
}

const Table: React.FC<TableProps> = ({ data }) => (
  <css>
    {data.map((studentData, index) => (
      <StudentCell key={index}>
        <div>{studentData.student}</div>
        {studentData.grades.map((grade, gradeIndex) => (
          <GradeCell key={gradeIndex} index={gradeIndex}>
            <GradeNoteCell>{grade.note}</GradeNoteCell>
            <GradeRankCell>{grade.rank}</GradeRankCell>
          </GradeCell>
        ))}
      </StudentCell>
    ))}
  </css>
);

export default Table;


npm install --save styled-components


import styled from 'styled-components';


const StudentCell = styled.div`
  display: flex;
  width: 125fr;
  height: 46px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0px 0px 0px 5px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
`;


<StudentCell>
  <div>{studentData.student}</div>
</StudentCell>


const GradeCell = styled.div<{index: number}>`
  display: flex;
  width: 145fr;
  height: 22px;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) => (props.index % 2 === 0 ? '#f9f9f9' : '#fff')};
  border: 1px solid #ccc;
`;


<GradeCell key={gradeIndex} index={gradeIndex}>
  <GradeNoteCell>{grade.note}</GradeNoteCell>
  <GradeRankCell>{grade.rank}</GradeRankCell>
</GradeCell>
