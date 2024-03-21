import React from 'react';
import data from './fakeMarkSheetsData';
import StudentRow from './StudentRow';
import PdfHeader from '@/components/shared-components/PdfHeader';

interface Student {
  id: number;
  name: string;
  dciNote: number;
  dciRank: number;
  dci1Note: number;
  dci1Rank: number;
  dci2Note: number;
  dci2Rank: number;
  dsi1Note: number;
  dsi1Rank: number;
  total: number;
  average: number;
  grade: string;
}

const getStudentRank = (students: Student[], subject: 'dci' | 'dci1' | 'dci2' | 'dsi1', score: number) => {
  return students.filter(student => student[`${subject}Note`] <= score).length;
}

const getTotal = (students: Student[]): number => {
  return students.reduce((total, student) => total + student.total, 0);
}

const getAverage = (students: Student[]): number => {
  return getTotal(students) / students.length;
}

const getGrade = (average: number): string => {
  if (average >= 90) return 'A';
  if (average >= 80) return 'B';
  if (average >= 70) return 'C';
  if (average >= 60) return 'D';
  return 'F';
}

const MarkSheetPdfClass: React.FC = () => {
  const students: Student[] = data.map((student: any) => ({
    ...student,
    dciRank: getStudentRank(data, 'dci', student.dciNote),
    dci1Rank: getStudentRank(data, 'dci1', student.dci1Note),
    dci2Rank: getStudentRank(data, 'dci2', student.dci2Note),
    dsi1Rank: getStudentRank(data, 'dsi1', student.dsi1Note),
    total: student.dciNote + student.dci1Note + student.dci2Note + student.dsi1Note,
    average: (student.dciNote + student.dci1Note + student.dci2Note + student.dsi1Note) / 4,
    grade: getGrade((student.dciNote + student.dci
