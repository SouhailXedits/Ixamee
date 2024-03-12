'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

const BulletinsStudentList = ({ data, nameClasse }: any) => {
  const [sortByRank, setSortByRank] = useState(true); // true for descending order

  const studentData = data.map((item: any, index: number) => ({
    id: item.user.id, // Assuming user id is unique and can be used as student id
    name: item.user.name.trim(), // Trim the name to remove extra spaces
    avatarSrc: item.user.image || '/defaultUserAvatr.svg', // Use a default avatar if image is not provided
    className: nameClasse, // Assuming class name is constant for all students
    grade: item.mark_obtained,
    totalMarks: item.exam.total_mark,
    rank: item.rank,
  }));

  const sortData = useCallback(() => {
    const sortedData = [...studentData];
    sortedData.sort((a, b) => (sortByRank ? a.rank - b.rank : b.rank - a.rank));
    return sortedData;
  }, [studentData, sortByRank]);

  useEffect(() => {
    sortData();
  }, [sortData]);

  const handleSortClick = () => {
    setSortByRank(!sortByRank);
  };

  return (
    <div className=' max-h-[500px] overflow-auto'>
      <Table className="rounded-2xl ">
        <TableHeader className="bg-[#F0F6F8] sticky top-0">
          <TableRow>
            <TableHead
              className="flex items-center gap-3  text-2 w-[200px]"
              onClick={handleSortClick}
              style={{ cursor: 'pointer' }}
            >
              <Image
                src="dashboard/bulttin/studenticon.svg"
                alt="studenticon"
                width={21}
                height={21}
              />
              Nom d’étudiant
            </TableHead>
            <TableHead className=" text-2">Classe</TableHead>
            <TableHead className=" text-2">Note</TableHead>
            <TableHead className="flex items-center gap-3">
              <Image
                src="dashboard/bulttin/doubleRow.svg"
                alt="studenticon"
                width={21}
                height={21}
                className="cursor-pointer"
                onClick={handleSortClick}
              />
              <span className="text-right text-2">Rang</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* <div className=" h-[500px] overflow-auto"> */}
          {sortData().map((student: any) => (
            <TableRow key={student.id} className=" items-center">
              <TableCell className="flex items-center justify-start gap-3 font-medium">
                <Image
                  src={student.avatarSrc}
                  alt="user"
                  width={38}
                  height={38}
                  className="h-full rounded-full"
                />
                <div className="text-gray-900 text-xs font-medium  leading-[25px]">
                  {student.name}
                </div>
              </TableCell>
              <TableCell className="text-[#4C4C4D]">{student.className}</TableCell>
              <TableCell>
                <div
                  className="text-sm font-normal leading-[17.78px]"
                  style={
                    student.grade > 10
                      ? { color: '#12B76A' }
                      : student.grade === 10
                      ? { color: '#F69D16' }
                      : { color: '#F04438' }
                  }
                >
                  {student.grade + '/' + student.totalMarks}
                </div>
              </TableCell>
              <TableCell className="  text-left justify-start 	 text-[#1B8392]">
                {student.rank}
              </TableCell>
            </TableRow>
          ))}
          {/* </div> */}
        </TableBody>
      </Table>
    </div>
  );
};

export default BulletinsStudentList;
