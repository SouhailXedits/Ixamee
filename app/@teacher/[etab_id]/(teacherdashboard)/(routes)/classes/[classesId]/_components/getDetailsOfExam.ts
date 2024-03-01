import { getNoteOf } from "@/app/_utils/calculateChildrenMarks";

export const getDetailsOfExercice = (
  id: string,
  examCorrection: any,
  userCorrection: any,
  examContent :any
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
