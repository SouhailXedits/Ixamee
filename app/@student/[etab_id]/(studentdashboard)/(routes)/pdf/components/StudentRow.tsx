import React from 'react';

interface StudentDataable {
  name: string;
  dc1: Data;
  dc2: Data;
  ds1: Data;
}

interface Data {
  note: string;
  rang: string;
}

interface StudentRowProps {
  data: StudentDataable;
}

const StudentRow: React.FC<StudentRowProps> = ({ data }) => {
  return (
    <tr>
      <td className="pb-4 border border-black/50">{data.name}</td>
      <td className="pb-4 border border-black/50">{data.dc1.note}</td>
      <td className="pb-4 border border-black/50">{data.dc1.rang}</td>
      <td className="pb-4 border border-black/50">{data.dc2.note}</td>
      <td className="pb-4 border border-black/50">{data.dc2.rang}</td>
      <td className="pb-4 border border-black/50">{data.ds1.note}</td>
      <td className="pb-4 border border-black/50">{data.ds1.rang}</td>
    </tr>
  );
};

export default StudentRow;
