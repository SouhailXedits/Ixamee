import Image from "next/image";

interface PdfHeaderProps {
  type: 'MSTeach' | 'MSStudent' | 'LOS';
  meta: any;
}

function PdfHeaderForClasse({ type, meta }: PdfHeaderProps) {
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
          width: '595px',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            left: '-30px',
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
            {type === 'MSStudent' && (
              <>
                <p
                  style={{
                    alignSelf: 'stretch',
                    color: 'var(--x-1)',
                    fontFamily: '"Poppins", Helvetica',
                    fontSize: '18px',
                    fontWeight: '400',
                    letterSpacing: '0',
                    lineHeight: '18px',
                    marginTop: '-1px',
                    position: 'relative',
                    left: '-90px',
                    top: '3rem',
                  }}
                >
                  <span style={{ fontWeight: '600' }}>classe : </span>
                  <span
                    style={{
                      color: '#102528',
                      fontFamily: '"Poppins", Helvetica',
                      fontSize: '14px',
                      fontWeight: '400',
                      letterSpacing: '0',
                      lineHeight: '18px',
                    }}
                  >
                    {meta.classe}
                  </span>
                </p>
              </>
            )}
            {type === 'MSStudent' && (
              <>
                <p
                  style={{
                    alignSelf: 'stretch',
                    color: 'var(--x-1)',
                    fontFamily: '"Poppins", Helvetica',
                    fontSize: '18px',
                    fontWeight: '400',
                    letterSpacing: '0',
                    lineHeight: '18px',
                    width: '20rem',
                    marginTop: '-1px',
                    position: 'relative',
                    left: '300px',
                    top: '1.5rem',
                  }}
                >
                  <span style={{ fontWeight: '600' }}>Nombre total des étudiants: </span>
                  <span
                    style={{
                      color: '#102528',
                      fontFamily: '"Poppins", Helvetica',
                      fontSize: '16px',
                      fontWeight: '400',
                      letterSpacing: '0',
                      // lineHeight: '18px',
                    }}
                  >
                    {meta.NumberOfStudet}
                  </span>
                </p>
              </>
            )}
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
          ></div>
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
            Liste des étudiants
          </div>
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            left: '500px',
            position: 'absolute',
            top: '30px',
          }}
        >
          <div
            style={{
              alignSelf: 'stretch',
              color: 'var(--x-1)',
              fontFamily: '"Poppins", Helvetica',
              fontSize: '14px',
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
              fontSize: '12px',
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
            height: '40px',
            left: '246px',
            position: 'absolute',
            top: '40px',
            width: '125px',
          }}
          width={120}
          height={35}
          alt="Layer"
          src="/logo.svg"
        />
      </div>
    </div>
  );
}

export default PdfHeaderForClasse;
