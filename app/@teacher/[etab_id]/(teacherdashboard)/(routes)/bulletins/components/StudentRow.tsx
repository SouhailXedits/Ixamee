function StudentRow({ data }: any) {
  console.log(data.exams, '🚀');
  console.log(data.exams.length);

  return (
    <tr key={data.id}>
      <td className="pb-4 border border-black/50 ">{data.name}</td>
      {data.exams.map((data: any) => (
        <>
          <td className="pb-4 border border-black/50">{data.average}</td>
          <td className="pb-4 border border-black/50">{data.rank}</td>
          {/* <td className="pb-4 border border-black/50">{data.dc2.note}</td>
      <td className="pb-4 border border-black/50">{data.dc2.rang}</td>
      <td className="pb-4 border border-black/50">{data.ds1.note}</td>
    <td className="pb-4 border border-black/50">{data.ds1.rang}</td> */}
        </>
      ))}
    </tr>
  );

  // data.exams.map((data:any) =>  (
  //       <tr>
  //         <td className="pb-4 border border-black/50 ">{data.name}</td>
  //         <td className="pb-4 border border-black/50">{data.average}</td>
  //         <td className="pb-4 border border-black/50">{data.rank}</td>
  //         {/* <td className="pb-4 border border-black/50">{data.dc2.note}</td>
  //     <td className="pb-4 border border-black/50">{data.dc2.rang}</td>
  //     <td className="pb-4 border border-black/50">{data.ds1.note}</td>
  //     <td className="pb-4 border border-black/50">{data.ds1.rang}</td> */}
  //       </tr>
  //     ))
}

export default StudentRow;
