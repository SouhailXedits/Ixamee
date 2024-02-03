import React from 'react';

const fakeData = [
  {
    student: 'John Doe',
    grades: [
      { assignment: 'Devoir de contrôle N°1', note: 12, rank: 5 },
      { assignment: 'Devoir de contrôle N°2', note: 8.5, rank: 18 },
      { assignment: 'Devoir de synthèse N°1', note: 10.75, rank: 23 },
    ],
  },
  // Add more fake data as needed
];

const Table = () => (
  <div
    style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      border: '1px solid #ccc',
    }}
  >
    {fakeData.map((studentData :any, index:number) => (
      <div
        key={index}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '125px',
            height: '46px',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '0px 0px 0px 5px',
            backgroundColor: '#f2f2f2',
            border: '1px solid #ccc',
          }}
        >
          <div
            style={{
              flex: 1,
              alignSelf: 'stretch',
              marginTop: '-0.5px',
              fontFamily: 'Poppins-Regular',
              fontWeight: 400,
              color: '#000',
              fontSize: '12px',
              letterSpacing: 0,
              lineHeight: '18px',
            }}
          >
            {studentData.student}
          </div>
        </div>
        {studentData.grades.map((grade :any, gradeIndex :any) => (
          <div
            key={gradeIndex}
            style={{
              display: 'flex',
              width: '145px',
              height: '22px',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: gradeIndex % 2 === 0 ? '#f9f9f9' : '#fff',
              border: '1px solid #ccc',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                flex: 1,
                alignSelf: 'stretch',
                flexGrow: 1,
                marginTop: '-1px',
                marginBottom: '-1px',
                marginLeft: '-1px',
                border: '0.5px solid #ccc',
              }}
            >
              <div
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  marginTop: '-0.25px',
                  fontFamily: 'Poppins-Regular',
                  fontWeight: 400,
                  color: '#000',
                  fontSize: '10px',
                  textAlign: 'center',
                  letterSpacing: 0,
                  lineHeight: '18px',
                }}
              >
                {grade.note}
              </div>
              <div
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  marginTop: '-0.25px',
                  fontFamily: 'Poppins-Regular',
                  fontWeight: 400,
                  color: '#000',
                  fontSize: '10px',
                  textAlign: 'center',
                  letterSpacing: 0,
                  lineHeight: '18px',
                }}
              >
                {grade.rank}
              </div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>

);

export default Table;
