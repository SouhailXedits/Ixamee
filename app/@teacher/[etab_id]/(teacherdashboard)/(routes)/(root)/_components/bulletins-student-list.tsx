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

const BulletinsStudentList = () => {
  const [sortByRank, setSortByRank] = useState(true); // true for descending order

  const studentData = useMemo(
    () => [
      {
        id: 1,
        name: 'Firas Latrach',
        avatarSrc: '/userAvatar/user1.svg',
        className: 'Bac Maths_2',
        grade: 17,
        rank: 1,
      },
      {
        id: 2,
        name: 'Lina Laadhari',
        avatarSrc: '/userAvatar/user2.svg',
        className: 'Bac Maths_2',
        grade: 10,
        rank: 2,
      },
      {
        id: 3,
        name: 'Jawher Souguir',
        avatarSrc: '/userAvatar/user3.svg',
        className: 'Bac Info_1',
        grade: 8,
        rank: 3,
      },
      // Add more student data as needed
    ],
    []
  );

  const sortData = useCallback(() => {
    const sortedData = [...studentData];
    sortedData.sort((a, b) => (sortByRank ? a.rank - b.rank : b.rank - a.rank));
    return sortedData;
  }, [studentData, sortByRank]);

  useEffect(() => {
    // Sort the data when the component mounts
    sortData();
  }, [sortData]);

  const handleSortClick = () => {
    setSortByRank(!sortByRank);
  };

  return (
    <Table className="rounded-2xl">
      <TableHeader className="bg-[#F0F6F8]">
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
        {sortData().map((student :any) => (
          <TableRow key={student.id} className="">
            <TableCell className="flex items-center justify-start gap-3 font-medium">
              <Image src={student.avatarSrc} alt="user" width={38} height={38} className="h-full" />
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
                {student.grade + '/20'}
              </div>
            </TableCell>
            <TableCell className="  text-left justify-start 	 text-[#1B8392]">
              {student.rank}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BulletinsStudentList;
