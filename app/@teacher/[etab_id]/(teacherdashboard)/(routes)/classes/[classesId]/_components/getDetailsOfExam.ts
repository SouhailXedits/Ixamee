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
  examContent: any
) => {
  let arrayOfResult = [] as any;
  userCorrections?.map((item: any, index: number) => {
    if (!item.correction_exam_content) {
      return null;
    }
    const result = calcSumOfMarks(item?.correction_exam_content[0]);
    const realMark = calcSumOfMarks(examContent[0]);

    if (result > realMark / 2) {
      arrayOfResult.push(result);
    }
  });
  const porsentageResult =
    ((arrayOfResult.length / userCorrections?.length) * 100).toFixed(2) + '%';
  console.log(arrayOfResult.length);
  console.log(userCorrections?.length);
  return porsentageResult;
};
