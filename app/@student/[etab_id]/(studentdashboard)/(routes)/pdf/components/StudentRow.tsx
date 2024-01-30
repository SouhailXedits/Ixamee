function StudentRow({data}: any) {

    console.log(data)
    return (
      <tr>
        <td className="border border-black/50 pb-4 ">{data.name}</td>
        <td className="border border-black/50  pb-4">{data.dc1.note}</td>
        <td className="border border-black/50  pb-4">{data.dc1.rang}</td>
        <td className="border border-black/50  pb-4">{data.dc2.note}</td>
        <td className="border border-black/50  pb-4">{data.dc2.rang}</td>
        <td className="border border-black/50  pb-4">{data.ds1.note}</td>
        <td className="border border-black/50  pb-4">{data.ds1.rang}</td>
      </tr>
    );
}

export default StudentRow
