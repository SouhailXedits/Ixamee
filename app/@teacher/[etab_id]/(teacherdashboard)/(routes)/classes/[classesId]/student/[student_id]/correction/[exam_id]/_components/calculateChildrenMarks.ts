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
    item.mark = null;
    if (item.children) {
      transferAllMarkToNull(item.children);
    }
  }
};

// Call the function passing the fakeData array to get the sum of marks for immediate children

export const hasNullMark = (content: any) => {
  for (const item of content) {
    if (item.mark === null) {
      return true;
    }
    if (item.children && hasNullMark(item.children)) {
      return true;
    }
  }
  return false;
};
export const statusOf = (data: any) => {
  const hasPending = hasNullMark(data);

  const status = hasPending ? 'pending' : 'done';
  return status;
};

export const getNoteOf = (id: string, arr: any[]): any => {
  if (arr === undefined) return 0;
  for (const obj of arr) {
    if (obj.id === id) {
      return obj.mark;
    }
    if (obj.children && obj.children.length > 0) {
      const mark = getNoteOf(id, obj.children);
      if (mark !== null) {
        return mark;
      }
    }
  }
  return 0;
};

export function getMaxDepth(obj: any): number {
  if (!obj || !obj.children || obj.children.length === 0) {
    return 0; // Base case: no children or empty object
  }

  let maxChildDepth = 0;
  for (const child of obj.children) {
    const childDepth = getMaxDepth(child); // Recursively calculate depth of each child
    if (childDepth > maxChildDepth) {
      maxChildDepth = childDepth; // Update maximum depth if child depth is greater
    }
  }

  return maxChildDepth + 1; // Return maximum depth of children + 1 for the current object
}
