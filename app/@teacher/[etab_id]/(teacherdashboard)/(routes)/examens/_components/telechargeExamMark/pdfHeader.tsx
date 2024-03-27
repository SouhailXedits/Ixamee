import Image from 'next/image';

interface PdfHeaderProps {
  type: 'MSTeach' | 'MSStudent' | 'LOS';
  meta: any;
}

function PdfHeader({ type, meta }: PdfHeaderProps) {
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
              fontSize: '16px',
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
            alignItems: 'center',
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            left: '60px',
            position: 'absolute',
            top: '50px',
          }}
        >
          <div
            style={{
              alignSelf: 'stretch',
              color: 'var(--x-1)',
              fontFamily: '"Poppins", Helvetica',
              fontSize: '16px',
              fontWeight: '400',
              letterSpacing: '0',
              lineHeight: '18px',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            {meta.classe}
          </div>
        </div>

        <Image
          style={{
            height: '60px',
            right: '0px',
            position: 'absolute',
            top: '10px',
            width: '200px',
          }}
          alt="Layer"
          src="/logo.svg"
          width={200}
          height={60}
        />
      </div>
    </div>
  );
}

export default PdfHeader;
