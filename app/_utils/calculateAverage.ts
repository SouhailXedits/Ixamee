export function calculateAverageMark(data: any) {
  let totalMarks = 0;
  let totalCoefficients = 0;

  data.forEach((trimestre: any) => {
    trimestre.exams.forEach((exam: any) => {
      totalMarks += exam.overTwnetyMark * exam.coefficient;
      totalCoefficients += exam.coefficient;
    });
  });

  return totalCoefficients !== 0 ? (totalMarks / totalCoefficients).toFixed(2) : 0;
}

export function calculateOverallAverage(data: any) {
  const groupedExams = data.reduce((result: any, exam: any) => {
    const term = exam.exam?.term;
    if (!result[term]) {
      result[term] = [];
    }
    result[term].push({
      id: exam?.id,
      exam_id: exam.exam?.id,
      name: exam.exam?.name,
      marksObtained: exam.mark_obtained,
      coefficient: exam.exam?.coefficient,
      totalScore: exam.exam?.total_mark,
      overTwnetyMark: exam.mark_obtained * (20 / exam.exam?.total_mark),
      range: exam.rank,
    });
    return result;
  }, {});

  const isTrimester = Object.keys(groupedExams).some((key) =>
    key.toLowerCase().includes('trimestre')
  );

  const terms = isTrimester
    ? ['trimestre_1', 'trimestre_2', 'trimestre_3']
    : ['semestre_1', 'semestre_2'];

  const trimesters = terms.map((term) => ({
    name: term.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    exams: groupedExams[term] || [],
  }));

  const averageMark = calculateAverageMark(trimesters);

  return averageMark;
}


