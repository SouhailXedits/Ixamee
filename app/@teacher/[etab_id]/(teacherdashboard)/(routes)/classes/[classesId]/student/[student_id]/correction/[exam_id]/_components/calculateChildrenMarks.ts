export function calculateChildrenMarks(data: any) {
  let totalChildrenMark = 0;

  data.forEach((item: any) => {
    if (item.children) {
      item.children.forEach((child: any) => {
        totalChildrenMark += parseInt(child.mark, 10) || 0; // Convert child's mark to integer and add to totalChildrenMark
      });
    }
  });

  return totalChildrenMark;
}

export const calculerExerciceMark = (data: any) => {
  data.mark = data?.children?.reduce((acc: number, item: any) => {
    return acc + item?.mark;
  }, 0);
  return data.mark;
};
export const calcAllMark = (fakeData: any) => {
  let sum = 0;
  fakeData?.map((item: any) => {
    sum = sum + +item.mark;
  });
  return sum;
};
export const getMarkOfExerciceWithId = (content: any, id: string): number | null => {
  for (const item of content) {
    if (item.id === id) {
      return item.mark;
    }
    if (item.children) {
      const mark = getMarkOfExerciceWithId(item.children, id);
      if (mark !== null) {
        return mark;
      }
    }
  }
  return null;
};

export const transferAllMarkToNull = (content: any) => {
  for (const item of content) {
    item.mark = 0;
    if (item.children) {
      transferAllMarkToNull(item.children);
    }
  }
  console.log(content);
};

// Call the function passing the fakeData array to get the sum of marks for immediate children
