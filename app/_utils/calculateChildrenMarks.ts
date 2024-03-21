type Item = {
  children?: Item[];
  mark?: number;
};

export const calculateChildrenMarks = (data: Item[]): number => {
  let totalChildrenMark = 0;

  data.forEach((item) => {
    if (item.children) {
      totalChildrenMark += calculateChildrenMarks(item.children);
    }
    totalChildrenMark += item.mark || 0;
  });

  return totalChildrenMark;
};

export const calculateExerciseMark = (data: Item): number => {
  const childrenMarks = data.children?.map((item) => calculateExerciseMark(item)) || [];
  const sumOfChildrenMarks = childrenMarks.reduce((acc, mark) => acc + mark, 0);
  data.mark = sumOfChildrenMarks + (data.mark || 0);
  return data.mark;
};

export const calculateAllMarks = (data: Item[]): number => {
  let sum = 0;
  data.forEach((item) => {
    sum += calculateExerciseMark(item);
  });
  return sum;
};
