interface InputItem {
  status: 'notCorrected' | 'inProgress' | 'corrected';
  userId: string;
}

interface OutputItem {
  status: 'Non corrigées' | 'En cours de corrections' | 'Corrigées';
  studentNumber: number;
  color: string;
}

const statusValues: Record<InputItem['status'], OutputItem['status']> = {
  notCorrected: 'Non corrigées',
  inProgress: 'En cours de corrections',
  corrected: 'Corrigées',
};

const colorCodes: Record<OutputItem['status'], string> = {
  'Non corrigées': '#F04438',
  'En cours de corrections': '#F69D16',
  Corrigées: '#12b76a',
};

export function transformData(
  data: InputItem[],
  allStudentOfClasseCount: number
): OutputItem[] {
  const statusCount: Record<OutputItem['status'], number> = {
    'Non corrigées': 0,
    'En cours de corrections': 0,
    Corrigées: 0,
  };

  data.forEach((item) => {
    const outputStatus = statusValues[item.status];
    if (outputStatus) {
      statusCount[outputStatus]++;
    }
  });

  const remainingCount = allStudentOfClasseCount - statusCount['Non corrigées'] - statusCount['Corrigées'];
  statusCount['En cours de corrections'] = remainingCount;

  return Object.entries(statusCount).map(([status, studentNumber]) => ({
    status,
    studentNumber,
    color: colorCodes[status],
  }));
}
