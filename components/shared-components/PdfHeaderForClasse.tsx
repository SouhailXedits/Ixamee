import Image from "next/image";
import styles from "./PdfHeader.module.css";

interface PdfHeaderProps {
  type: 'MSTeach' | 'MSStudent' | 'LOS';
  meta: {
    estab: string;
    classe: string;
    NumberOfStudet: number;
    session: string;
  };
}

const PdfHeaderForClasse: React.FC<PdfHeaderProps> = ({ type, meta }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            width={103}
            height={25}
            alt="Layer"
            src="/logo.svg"
          />
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>Établissement</div>
          <div className={styles.subtitle}>{meta.estab}</div>
        </div>
        <div className={styles.sessionContainer}>
          <div className={styles.sessionLabel}>Année Scolaire</div>
          <div className={styles.sessionValue}>{meta.session}</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.column}>
          {type === 'MSStudent' && (
            <>
              <div className={styles.label}>classe</div>
              <div className={styles.value}>{meta.classe}</div>
            </>
          )}
          {type === 'MSStudent' && (
            <>
              <div className={styles.label}>Nombre total des étudiants</div>
              <div className={styles.value}>{meta.NumberOfStudet}</div>
            </>
          )}
        </div>
        <div className={styles.column} />
        <div className={styles.listTitle}>Liste des étudiants</div>
      </div>
    </div>
  );
};

export default PdfHeaderForClasse;


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
  width: 595px;
}

.logoContainer {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 103px;
}

.logo {
  height: 25px;
  width: 103px;
}

.titleContainer {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 40px;
  position: absolute;
  top: 30px;
}

.title {
  align-self: stretch;
  color: var(--x-1);
  font-family: "Poppins", Helvetica;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 18px;
  margin-top: -1px;
  position: relative;
  text-align: center;
}

.subtitle {
  align-self: stretch;
  color: var(--x-1);
  font-family: "Poppins", Helvetica;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 18px;
  position: relative;
  text-align: center;
}

.sessionContainer {
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  left: 464px;
  position: absolute;
  top: 30px;
}

.sessionLabel {
  align-self: stretch;
  color: var(--x-1);
  font-family: "Poppins", Helvetica;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 18px;
  margin-top: -1px;
  position: relative;
  text-align: center;
}

.sessionValue {
  align-self: stretch;
  color: var(--x-1);
  font-family: "Poppins", Helvetica;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 18px;
  position: relative;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
  height: 50px;
}

.label {
  align-self: stretch;
  color: var(--x-1);
  font-family: "Poppins", Helvetica;
