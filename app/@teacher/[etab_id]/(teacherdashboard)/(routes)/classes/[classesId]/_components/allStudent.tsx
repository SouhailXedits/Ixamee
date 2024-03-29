import React from 'react';
import PdfHeaderForClasse from '@/components/shared-components/PdfHeaderForClasse';

export const AllStudentList = ({
  data: copieData,
  classeName,
  teacherEstabName,
}: {
  data: any;
  classeName: string;
  teacherEstabName: string;
}) => {
  if (!copieData) return null;
  const data = JSON?.parse(JSON?.stringify(copieData));


  // const data = {
  //   terms = [{trimester1: [exams= {}}]
  // }
  // Assuming dataArray is your array of objects
  function translateDateFormat(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  }
  const sortedArray = data?.sort((a: any, b: any) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    // Compare names and return the result
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  let studentCount = 0;

  const header = [
    { name: 'Rang' },
    { name: 'Nom & Prénom' },
    { name: 'E-mail' },
    { name: 'Ajouté(e) le' },
  ];
  
  return (
    <div>
      <PdfHeaderForClasse
        meta={{
          estab: teacherEstabName,
          session: new Date().getFullYear() + ' - ' + (new Date().getFullYear() + 1),

          NumberOfStudet: sortedArray.length,
          classe: classeName,
        }}
        type="MSStudent"
      />

      {/* {data.terms.map(term => ())} */}
      <div className="flex justify-center">
        <table className=" text-center w-[700px] border border-black/50 ">
          <thead className="text-white">
            <tr>
              {header.map((head, i) => (
                <th key={i} className="border border-black/50 bg-[#99C6D3] pb-3 text-sm font-[400]">
                  {head.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {sortedArray?.map((student: any, i: number) => (
              <tr key={i}>
                <td className="pb-4 border border-black/50 ">{i + 1}</td>
                <td className="pb-4 border border-black/50 ">{student.name}</td>
                <td className="pb-4 border border-black/50">{student.email}</td>
                <td className="pb-4 border border-black/50">
                  {translateDateFormat(student.createdAt)}
                </td>
              </tr>
            ))} */}
            {sortedArray?.map((student: any, i: number) => {
              studentCount++;
              return (
                <>
                  <tr key={i}>
                    <td className="pb-4 border border-black/50 ">{i + 1}</td>
                    <td className="pb-4 border border-black/50 ">{student.name}</td>
                    <td className="pb-4 border border-black/50">{student.email}</td>
                    <td className="pb-4 border border-black/50">
                      {translateDateFormat(student.createdAt)}
                    </td>
                  </tr>
                  {studentCount % 18 === 0 && <div className=" h-24" />}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
