
import Rien from './Rien';

import ExamCorrectionList from './ExamCorrections';

const BulletinsDesEtudiants = ({ userCorrections }: any) => {
  return (
    <>
      {!userCorrections ? (
        <div className="flex items-center justify-center w-full p-10 border rounded-xl">
          <Rien
            image="/dashboard/books.svg"
            className="flex flex-col justify-center gap-6"
            message="Pas de bulletins pour le moment"
          />
        </div>
      ) : (
          <div className="w-full rounded-xl">
            <ExamCorrectionList data={userCorrections} />
          </div>
      )}
    </>
  );
};

export default BulletinsDesEtudiants;
