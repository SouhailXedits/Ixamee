interface InputItem {
  status: string;
  user_id: string;
}

interface OutputItem {
  status: string;
  studentNumber: number;
  color: string;
}
export function transformData(data: InputItem[], allStudentOfClasseCount: number): OutputItem[] {
  const statusCount: Record<string, number> = {
    'Non corrigées': 0,
    'En cours de corrections': 0,
    Corrigées: 0,
  };

  data.forEach((item) => {
    switch (item.status) {
      case 'notCorrected':
        statusCount['Non corrigées']++;
        break;
      case 'done':
        statusCount['Corrigées']++;
        break;
      case 'pending':
        statusCount['En cours de corrections']++;
        break;
      default:
        break;
    }
  });

  statusCount['Non corrigées'] = allStudentOfClasseCount -statusCount['Corrigées'];

  const colorCodes: Record<string, string> = {
    'Non corrigées': '#F04438',
    'En cours de corrections': '#F69D16',
    Corrigées: '#12b76a',
  };

  const result: OutputItem[] = Object.keys(statusCount).map((status) => ({
    status,
    studentNumber: statusCount[status],
    color: colorCodes[status],
  }));

  return result;
}
