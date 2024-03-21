.container {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.header {
  background-color: #ffffff;
  height: 250px;
  position: relative;
  width: 800px;
}

.title {
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  left: 40px;
  position: absolute;
  top: 30px;
}

.info {
  align-items: flex-start;
  display: flex;
  gap: 150px;
  justify-content: center;
  left: 52px;
  position: absolute;
  top: 155px;
  width: 1000px;
}

.info-item {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: 1;
  gap: 5px;
  position: relative;
}

.heading {
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  gap: 5px;
  height: 50px;
  justify-content: center;
  left: 350px;
  position: absolute;
  top: 130px;
}

.year {
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  left: 650px;
  position: absolute;
  top: 30px;
}

.image {
  height: 60px;
  left: 325px;
  position: absolute;
  top: 35px;
  width: 200px;
}


import PropTypes from 'prop-types';
import React from 'react';
import styles from './PdfHeader.module.css';

function PdfHeader({ type, meta }) {
  const {
    estab,
    fullName,
    average,
    range,
    studentsNum,
    teacherName,
    classe,
    heading,
    subject,
    term,
    session,
  } = meta;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <div>{estab}</div>
          <div>{classe}</div>
        </div>
        <div className={styles.info}>
          {type === 'MSStudent' && (
            <div className={styles.infoItem}>
              <p>
                <span style={{ fontWeight: '600' }}>Nom et prénom : </span>
                <span>{fullName}</span>
              </p>
              <p>
                <span style={{ fontWeight: '600' }}>Moyenne generale : </span>
                <span>{average}</span>
              </p>
              <p>
                <span style={{ fontWeight: '600' }}>rang : </span>
                <span>{range}</span>
              </p>
              <p>
                <span style={{ fontWeight: '600' }}>Professeur : </span>
                <span>{teacherName}</span>
              </p>
            </div>
          )}
          {type !== 'MSStudent' && (
            <div className={styles.infoItem}>
              <p>
                <span style={{ fontWeight: '600' }}>Classe : </span>
                <span>{classe}</span>
              </p>
              <p>
                <span style={{ fontWeight: '600' }}>Nombre d’élèves : </span>
                <span>{studentsNum}</span>
              </p>
            </div>
          )}
        </div>
        <div className={styles.heading}>
          <div className={styles.headingText}>{heading}</div>
          {type === 'MSStudent' && <div>{subject}</div>}
          {type === 'MSTeach' && <div>{term.type} {term.number}</div>}
        </div>
        <div className={styles.year}>
          <div>Année Scolaire</div>
          <div>{session}</div>
        </div>
        <img
          className={styles.image}
          alt="Layer"
          src="/logo.svg"
          width={200}
          height={60}
        />
      </div>
    </div>
  );
}

PdfHeader.propTypes = {
  type: PropTypes.oneOf(['MSTeach', 'MSStudent', 'LOS']).isRequired,
  meta: PropTypes.shape({
    estab: PropTypes.string.isRequired,
    fullName: PropTypes.string,
    average: PropTypes.string,
    range: PropTypes.string,
    studentsNum: PropTypes.string,
    teacherName: PropTypes.string,
    classe: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    subject: PropTypes.string,
    term: PropTypes.shape({
      type: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
    session: PropTypes.string.isRequired,
  }).isRequired,
};

export default PdfHeader;
