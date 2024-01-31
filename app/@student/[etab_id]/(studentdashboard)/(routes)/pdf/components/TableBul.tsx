import React from 'react';

const DevoirSyntheseN2 = () => {
  const students = [
    {
      name: 'Ahmed Benamor',
      devoir1: { note: 12, rang: 5 },
      devoir2: { note: 12, rang: 5 },
      synthese1: { note: 12, rang: 5 },
    },
    {
      name: 'Mohamed Amine Kacem',
      devoir1: { note: 8.5, rang: 18 },
      devoir2: { note: 8.5, rang: 18 },
      synthese1: { note: 8.5, rang: 18 },
    },
    // ... add more students here
  ];

//   const averageScore = fakeData.reduce((acc, cur) => acc + +cur.note, 0) / fakeData.length;
  return <p className=' bg-red text-white'>souhail</p>
//   return (
//     <div>
//       <h1>Devoir de Synthese N2</h1>
//       <table
//         style={{
//           borderCollapse: 'collapse',
//           width: '100%',
//           fontFamily: 'Arial, sans-serif',
//           fontSize: '14px',
//         }}
//       >
//         <thead>
//           <tr>
//             <th
//               style={{
//                 backgroundColor: '#f5f5f5',
//                 padding: '10px',
//                 border: '1px solid #ddd',
//                 textAlign: 'left',
//               }}
//             >
//               Étudiant
//             </th>
//             <th
//               style={{
//                 backgroundColor: '#f5f5f5',
//                 padding: '10px',
//                 border: '1px solid #ddd',
//                 textAlign: 'left',
//               }}
//             >
//               Devoir de contrôle Nº1
//             </th>
//             <th
//               style={{
//                 backgroundColor: '#f5f5f5',
//                 padding: '10px',
//                 border: '1px solid #ddd',
//                 textAlign: 'left',
//               }}
//             >
//               Devoir de contrôle N°2
//             </th>
//             <th
//               style={{
//                 backgroundColor: '#f5f5f5',
//                 padding: '10px',
//                 border: '1px solid #ddd',
//                 textAlign: 'left',
//               }}
//             >
//               Devoir de synthèse N°I
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr>
//               <td>{student.name}</td>
//               <td>
//                 Note: {student.devoir1.note}, Rang:{' '}
//                 <span style={{ fontWeight: 'bold', color: '#999' }}>{student.devoir1.rang}</span>
//               </td>
//               <td>
//                 Note: {student.devoir2.note}, Rang:{' '}
//                 <span style={{ fontWeight: 'bold', color: '#999' }}>{student.devoir2.rang}</span>
//               </td>
//               <td>
//                 Note: {student.synthese1.note}, Rang:{' '}
//                 <span style={{ fontWeight: 'bold', color: '#999' }}>{student.devoir1.rang}</span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
};

export default DevoirSyntheseN2;
