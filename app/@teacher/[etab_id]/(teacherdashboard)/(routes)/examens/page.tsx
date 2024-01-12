'use client';
import {getAllExam } from '@/actions/examens';
import ExamCardsLayout from './_components/ExamCardsLayout';
import Heading from './_components/Heading';
import { db } from '@/lib/db';
import { getUserByEmail, getUserById } from '@/data/user';
import { useQuery } from '@tanstack/react-query';
import { get } from 'http';
// import { getAllExam } from '@/actions/examens';

export default  function Examens() {
  // const data = await db.user.findUnique({
  //   where: {
  //     id: 'clr9c0dq4000442qrnl18g9r3',
  //   },
  // });
  // console.log(data);
  // const data = await db.classe.findMany({});
  // const session = await auth();
  //const session = await getAllExam();
  //console.log(session);
  
   const { data: exams } = useQuery({
     queryKey: ['exams'],
    queryFn: async() => await getAllExam(),
     //initialData:  {}
   });
  // console.log(error);
  console.log(exams);
  return (
    <div className="flex flex-col gap-6 p-10">
      <Heading />
      <ExamCardsLayout />
    </div>
  );
}
