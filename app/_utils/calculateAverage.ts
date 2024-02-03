export function calculateAverageMark(data:any) {
  let totalMarks = 0;
  let totalCoefficients = 0;

  data.forEach((trimestre:any ) => {
    trimestre.exams.forEach((exam:any) => {
      totalMarks += exam.overTwnetyMark * exam.coefficient;
      totalCoefficients += exam.coefficient;
    });
  });

  return totalCoefficients !== 0 ? (totalMarks / totalCoefficients).toFixed(2) : 0;
}



