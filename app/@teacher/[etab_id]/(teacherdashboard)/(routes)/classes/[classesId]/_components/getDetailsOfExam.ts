import { getNoteOf } from '@/app/_utils/calculateChildrenMarks';
import { calcSumOfMarks } from '../../../examens/[examenId]/_components/sharedFunction';
import { totalmem } from 'os';

export const getDetailsOfExercice = (
  id: string,
  examCorrection: any,
  userCorrection: any,
  examContent: any
) => {
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

    if (mark > realMark / 2) {
      resultOfArray.push(mark);
    }
  });

  const porsentageResult = ((resultOfArray.length / userCorrection.length) * 100).toFixed(2) + '%';

  return porsentageResult;
};
export const getDetailsOfAllExercice = (
  examCorrection: any,
  userCorrections: any,
  examContent: any,
  exericeNumber: number
) => {
  let arrayOfResult = [] as any;
  userCorrections?.map((item: any, index: number) => {
    if (!item.correction_exam_content) {
      return null;
    }

    const result = calcSumOfMarks(item?.correction_exam_content[exericeNumber]);
    const realMark = calcSumOfMarks(examContent);

    if (result > realMark / 2) {
      arrayOfResult.push(result);
    }
  });

  const porsentageResult =
    ((arrayOfResult.length / userCorrections?.length) * 100).toFixed(2) + '%';

  return porsentageResult;
};
