import Image from 'next/image';

interface PdfHeaderProps {
  type: 'MSTeach' | 'MSStudent' | 'LOS';
  meta: any;
}

function PdfHeaderEvatuation({ type, meta }: PdfHeaderProps) {
  console.log(meta);
  return (
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
          width: '800px',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            left: '20px',
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
              fontWeight: '600',
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
            {meta.estab}
            {/* Lycée Privé Élite Nabeul */}
          </div>
        </div>
        <div
          style={{
            alignItems: 'flex-start',
            display: 'flex',
            gap: '150px',
            justifyContent: 'center',
            left: '10px',
            position: 'absolute',
            top: '155px',
            width: '950px',
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
            {type === 'MSStudent' && (
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
                <span style={{ fontWeight: '600' }}>Nom et prénom : </span>
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
                  {meta.fullName}
                </span>
              </p>
            )}
            {type !== 'MSStudent' && (
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
                <span style={{ fontWeight: '600' }}>Classe : </span>
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
                  {meta.classe}
                </span>
              </p>
            )}
            {type === 'MSStudent' && (
              <>
                {meta.average && (
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
                    <span style={{ fontWeight: '600' }}>Moyenne generale : </span>
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
                      {meta.average}
                    </span>
                  </p>
                )}
                {meta.range && (
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
                    <>
                      <span style={{ fontWeight: '600' }}>Rang : </span>
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
                        {meta.range}
                      </span>
                    </>
                  </p>
                )}
              </>
            )}
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
              <span style={{ fontWeight: '600' }}>Note Total : </span>
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
                {meta.noteTotal}
              </span>
            </p>
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
              <span style={{ fontWeight: '600' }}>Observation : </span>
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
                {meta.observation?.feedback[0] ||
                  "Il n 'y a pas d'observation concernant cet étudiant"}
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
            {type !== 'MSStudent' && meta.studentsNum && (
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
                <span style={{ fontWeight: '600' }}>Nombre d’élèves : </span>
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
                  {meta.studentsNum}
                </span>
              </p>
            )}
            {type === 'MSStudent' && meta.teacherName && (
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
                <span style={{ fontWeight: '600' }}>Professeur : </span>
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
                  {meta.teacherName}
                </span>
              </p>
            )}
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
              <span style={{ fontWeight: '600' }}>Moyene de la classe : </span>
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
                {meta.moyendeClasse}
              </span>
            </p>
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
              <span style={{ fontWeight: '600' }}> Min: </span>
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
                {meta.minMoyene}
              </span>
              <span style={{ fontWeight: '600' }}> Max: </span>
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
                {meta.maxMoyene}
              </span>
              <span style={{ fontWeight: '600' }}> Sup 10: </span>
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
                {meta.countSupTen}
              </span>
              <span style={{ fontWeight: '600' }}> inf 10: </span>
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
                {meta.countInfTen}
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
            left: '350px',
            position: 'absolute',
            top: '80px',
          }}
        >
          <div
            style={{
              alignSelf: 'stretch',
              color: 'var(--x-1)',
              fontFamily: '"Poppins", Helvetica',
              fontSize: '16px',
              fontWeight: '500',
              letterSpacing: '0',
              lineHeight: '20px',
              marginTop: '-1px',
              position: 'relative',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {meta.heading}
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
              left: '20px',
              lineHeight: '20px',
              position: 'relative',
            }}
          >
            <span style={{ fontWeight: '600' }}>Classe : </span>
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
              {meta.classe}
            </span>
          </p>
          <p
            style={{
              alignSelf: 'stretch',
              color: 'var(--x-1)',
              flex: '1',
              fontFamily: '"Poppins", Helvetica',
              fontSize: '12px',
              fontWeight: '400',
              letterSpacing: '0',
              left: '20px',
              lineHeight: '20px',
              position: 'relative',
            }}
          >
            <span style={{ fontWeight: '600' }}>Devoir : </span>
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
              {meta.devoir}
            </span>
          </p>
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            left: '650px',
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
              fontWeight: '600',
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
            {meta.session}
          </div>
        </div>
        <Image
          style={{
            height: '50px',
            left: '325px',
            position: 'absolute',
            top: '15px',
            width: '200px',
          }}
          alt="Layer"
          src="/logo.svg"
          width={200}
          height={30}
        />
      </div>
    </div>
  );
}

export default PdfHeaderEvatuation;
