import { Exam } from './exam.type'; // assuming this type definition exists

interface TermExams {
  id?: string;
  exam_id: string;
  name: string;
  marksObtained: number;
  coefficient: number;
  totalScore: number;
  overTwnetyMark: number;
  range: number;
}

interface GroupedExams {
  [key: string]: TermExams[];
}

export function calculateAverageMark(data: TermExams[]): string {
  let totalMarks = 0;
  let totalCoefficients = 0;

  data.forEach((exam) => {
    totalMarks += exam.marksObtained * exam.coefficient;
    totalCoefficients += exam.coefficient;
  });

  return totalCoefficients !== 0 ? totalMarks / totalCoefficients : 0;
}

export function calculateOverallAverage(data: Exam[]): string {
  const groupedExams: GroupedExams = data.reduce((result, exam) => {
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

  const averageMark = calculateAverageMark(trimesters.flatMap(({ exams }) => exams));

 
