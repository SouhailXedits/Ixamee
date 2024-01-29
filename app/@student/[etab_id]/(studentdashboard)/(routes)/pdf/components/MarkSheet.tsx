import React from 'react';
import data from './fakeMarkSheetsData';
import StudentRow from './StudentRow';

// const getImageAsBase64 = async (url) => {
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
//     }

//     const blob = await response.blob();
    
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error(error);
//     // You can choose to return a placeholder image or handle the error in a different way
//     return ''; // Empty string for placeholder
//   }
// };

export const MarkSheetPdfClass = () => {

    // const imageUrl = 'https://c.animaapp.com/Esbv7ddh/img/layer-1@2x.png';

    // // Use state to store base64 image data
    // const [base64Image, setBase64Image] = React.useState('');

    // // Fetch and convert image URL to base64 on component mount
    // React.useEffect(() => {
    //   getImageAsBase64(imageUrl).then((data) => setBase64Image(data));
    // }, []);
  return (
    <div>
      <div
        style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            height: '250px',
            position: 'relative',
            width: '595px',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'inline-flex',
              flexDirection: 'column',
              justifyContent: 'center',
              left: '40px',
              position: 'absolute',
              top: '30px',
            }}
          >
            <div
              style={{
                alignSelf: 'stretch',
                color: 'var(--x-1)',
                fontFamily: '"Poppins", Helvetica',
                fontSize: '12px',
                fontWeight: '500',
                letterSpacing: '0',
                lineHeight: '18px',
                marginTop: '-1px',
                position: 'relative',
                textAlign: 'center',
              }}
            >
              Établissement
            </div>
            <div
              style={{
                alignSelf: 'stretch',
                color: 'var(--x-1)',
                fontFamily: '"Poppins", Helvetica',
                fontSize: '11px',
                fontWeight: '400',
                letterSpacing: '0',
                lineHeight: '18px',
                position: 'relative',
                textAlign: 'center',
              }}
            >
              Lycée Privé Élite Nabeul
            </div>
          </div>
          <div
            style={{
              alignItems: 'flex-start',
              display: 'flex',
              gap: '150px',
              justifyContent: 'center',
              left: '52px',
              position: 'absolute',
              top: '155px',
              width: '492px',
            }}
          >
            <div
              style={{
                alignItems: 'flex-start',
                alignSelf: 'stretch',
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                flexGrow: '1',
                gap: '5px',
                position: 'relative',
              }}
            >
              <p
                style={{
                  alignSelf: 'stretch',
                  color: 'var(--x-1)',
                  fontFamily: '"Poppins", Helvetica',
                  fontSize: '12px',
                  fontWeight: '400',
                  letterSpacing: '0',
                  lineHeight: '18px',
                  marginTop: '-1px',
                  position: 'relative',
                }}
              >
                <span style={{ fontWeight: '600' }}>Classe:</span>
                <span
                  style={{
                    color: '#102528',
                    fontFamily: '"Poppins", Helvetica',
                    fontSize: '12px',
                    fontWeight: '400',
                    letterSpacing: '0',
                    lineHeight: '18px',
                  }}
                >
                  Bac Maths_2
                </span>
              </p>
            </div>
            <div
              style={{
                alignItems: 'flex-start',
                alignSelf: 'stretch',
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                flexGrow: '1',
                gap: '5px',
                position: 'relative',
              }}
            >
              <p
                style={{
                  alignSelf: 'stretch',
                  color: 'var(--x-1)',
                  fontFamily: '"Poppins", Helvetica',
                  fontSize: '12px',
                  fontWeight: '400',
                  letterSpacing: '0',
                  lineHeight: '18px',
                  marginTop: '-1px',
                  position: 'relative',
                }}
              >
                <span style={{ fontWeight: '600' }}>Nombre d’élèves:</span>
                <span
                  style={{
                    color: '#102528',
                    fontFamily: '"Poppins", Helvetica',
                    fontSize: '12px',
                    fontWeight: '400',
                    letterSpacing: '0',
                    lineHeight: '18px',
                  }}
                >
                  29
                </span>
              </p>
            </div>
          </div>
          <div
            style={{
              alignItems: 'center',
              display: 'inline-flex',
              flexDirection: 'column',
              gap: '5px',
              height: '50px',
              justifyContent: 'center',
              left: '215px',
              position: 'absolute',
              top: '96px',
            }}
          >
            <div
              style={{
                alignSelf: 'stretch',
                color: 'var(--x-1)',
                fontFamily: '"Poppins", Helvetica',
                fontSize: '20px',
                fontWeight: '500',
                letterSpacing: '0',
                lineHeight: '20px',
                marginTop: '-1px',
                position: 'relative',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              Bulletin de notes
            </div>
            <p
              style={{
                alignSelf: 'stretch',
                color: 'var(--x-1)',
                flex: '1',
                fontFamily: '"Poppins", Helvetica',
                fontSize: '12px',
                fontWeight: '400',
                letterSpacing: '0',
                lineHeight: '20px',
                position: 'relative',
              }}
            >
              <span style={{ fontWeight: '500' }}>Trimestre:</span>
              <span
                style={{
                  color: '#102528',
                  fontFamily: '"Poppins", Helvetica',
                  fontSize: '12px',
                  fontWeight: '400',
                  letterSpacing: '0',
                  lineHeight: '20px',
                }}
              >
                2
              </span>
            </p>
          </div>
          <div
            style={{
              alignItems: 'center',
              display: 'inline-flex',
              flexDirection: 'column',
              justifyContent: 'center',
              left: '464px',
              position: 'absolute',
              top: '30px',
            }}
          >
            <div
              style={{
                alignSelf: 'stretch',
                color: 'var(--x-1)',
                fontFamily: '"Poppins", Helvetica',
                fontSize: '12px',
                fontWeight: '500',
                letterSpacing: '0',
                lineHeight: '18px',
                marginTop: '-1px',
                position: 'relative',
                textAlign: 'center',
              }}
            >
              Année Scolaire
            </div>
            <div
              style={{
                alignSelf: 'stretch',
                color: 'var(--x-1)',
                fontFamily: '"Poppins", Helvetica',
                fontSize: '11px',
                fontWeight: '400',
                letterSpacing: '0',
                lineHeight: '18px',
                position: 'relative',
                textAlign: 'center',
              }}
            >
              2050 - 2051
            </div>
          </div>
          <img
            style={{
              height: '25px',
              left: '246px',
              position: 'absolute',
              top: '40px',
              width: '103px',
            }}
            alt="Layer"
            src="/logo.svg"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <table className=" text-center w-[700px] border border-black/50 ">
          <thead className="text-white">
            <td rowSpan={2} className="bg-[#99C6D3] ">
              Etudiant
            </td>
            <th className="border border-black/50 bg-[#99C6D3]" colSpan={2}>
              DC 1
            </th>
            <th className="border border-black/50 bg-[#99C6D3]" colSpan={2}>
              DC 2
            </th>
            <th className="border bg-[#99C6D3] border-black/50" colSpan={2}>
              DS 1
            </th>
          </thead>
          <tbody>
            <tr className=" text-[#1B8392]">
              <td className="bg-[#99C6D3]"></td>
              <td className="border bg-[#99C6D3]/40 border-black/50">note</td>
              <td className="border bg-[#99C6D3]/40 border-black/50">rang</td>
              <td className="border bg-[#99C6D3]/40 border-black/50">note</td>
              <td className="border bg-[#99C6D3]/40 border-black/50">rang</td>
              <td className="border bg-[#99C6D3]/40 border-black/50">note</td>
              <td className="border bg-[#99C6D3]/40 border-black/50">rang</td>
            </tr>
            {data.map((student, i) => (
              <StudentRow data={student} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
