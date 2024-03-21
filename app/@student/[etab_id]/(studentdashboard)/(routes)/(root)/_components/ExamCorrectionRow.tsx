import React from 'react';

interface ExamDataProps {
  id: number;
  markObtained: number;
  rank: number;
  exam: {
    totalMark: number;
    subject: {
      name: string;
      icon: string;
      coefficient: number;
    };
  };
}

const ExamCorrectionRow: React.FC<ExamDataProps> = ({
  exam: { name, totalMark },
  markObtained,
  rank,
}) => {
  const getBackgroundColor = (markObtained: number) => {
    if (markObtained > totalMark / 2) {
      return '#12b76a40';
    }
    if (markObtained > 10 && markObtained < (totalMark * 75) / 100) {
      return '';
    }
    return '#F04438';
  };

  const getColor = (markObtained: number) => {
    if (markObtained > totalMark / 2) {
      return '#12B76A';
    }
    if (markObtained > 10 && markObtained < (totalMark * 75) / 100) {
      return '#F69D16';
    }
    return '#F04438';
  };

  return (
    <div className="flex gap-4 p-2 border-b justify-between">
      <p className="basis-[50%]">{name}</p>
      <p
        className="p-2 rounded-xl"
        style={{ color: getColor(markObtained), backgroundColor: getBackgroundColor(markObtained) }}
      >
        {markObtained} / {totalMark}
      </p>
      <p className="text-2">Rang : {rank} </p>
    </div>
  );
};

export default ExamCorrection
