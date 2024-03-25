import { getNoteOf } from '@/app/_utils/calculateChildrenMarks';
import { calcSumOfMarks } from '../../../examens/[examenId]/_components/sharedFunction';
import { totalmem } from 'os';

export const getDetailsOfExercice = (
  id: string,
  examCorrection: any,
  userCorrection: any,
  examContent: any
) => {
  console.log(userCorrection, 'userCorrection');
  console.log(examContent, 'examContent');
  if (!userCorrection) {
    return null;
  }
  let resultOfArray = [] as any;

  let realMark = getNoteOf(id, examContent) === null ? 0 : getNoteOf(id, examContent);

  const result = userCorrection.map((item: any) => {
    if (!item.correction_exam_content) {
      return null;
    }

    const mark = getNoteOf(id, item.correction_exam_content);
    console.log(mark);

    if (mark > realMark / 2) {
      resultOfArray.push(mark);
    }
  });
  console.log(resultOfArray);
  const porsentageResult = ((resultOfArray.length / userCorrection.length) * 100).toFixed(2) + '%';
  console.log(porsentageResult);
  return porsentageResult;
};
export const getDetailsOfAllExercice = (
  examCorrection: any,
  userCorrections: any,
  examContent: any,
  exericeNumber: number
) => {
  console.log(examCorrection);
  console.log(examContent);
  console.log(userCorrections);

  let arrayOfResult = [] as any;
  userCorrections?.map((item: any, index: number) => {
    if (!item.correction_exam_content) {
      return null;
    }
    console.log(item.correction_exam_content[exericeNumber]);

    const result = calcSumOfMarks(item?.correction_exam_content[exericeNumber]);
    const realMark = calcSumOfMarks(examContent);
    console.log(result);

    console.log(realMark);

    console.log(result > realMark / 2);
    if (result > realMark / 2) {
      arrayOfResult.push(result);
    }
  });
  console.log(arrayOfResult);
  console.log(userCorrections);

  const porsentageResult =
    ((arrayOfResult.length / userCorrections?.length) * 100).toFixed(2) + '%';
  console.log(arrayOfResult.length);
  console.log(userCorrections?.length);
  return porsentageResult;
};
